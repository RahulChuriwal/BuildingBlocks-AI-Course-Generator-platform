import { NextResponse } from "next/server";
import { ai } from "../generate-course-layout/route";
import axios from "axios";
import { db } from "../../../../config/db";
import { coursesTable } from "../../../../config/schema";
import { eq } from "drizzle-orm";

export async function POST(req) {
  try {
    const { courseJson, courseTitle, courseId } = await req.json();
    console.log("🔥 Received courseJson:", courseJson);

    const existing = await db
      .select()
      .from(coursesTable)
      .where(eq(coursesTable.cid, courseId));

    if (existing?.[0]?.courseContent?.length > 0) {
      return NextResponse.json({ msg: "already_exists" });
    }

    const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });
    const chapters = courseJson?.chapters || [];

    const promises = chapters.map(async (chapter) => {
      const prompt = `Depends on Chapter name and Topic Generate content for each topic in HTML and give response in JSON format. Schema:{ chapterName:<>, { topic:<>, content:<> } }: User Input: `;

      const response = await model.generateContent({
        contents: [
          {
            role: "user",
            parts: [{ text: prompt + JSON.stringify(chapter) }],
          },
        ],
        generationConfig: { temperature: 0.7, maxOutputTokens: 2048 },
      });

      const rawText =
        response?.response?.candidates?.[0]?.content?.parts?.[0]?.text;
      const cleaned = rawText
        .replace(/```json|```/g, "")
        .replace(/[\b\f\n\r\t\v]/g, "")
        .trim();

      const parsed = JSON.parse(cleaned);
      const youtubeData = await GetYoutubeVideo(chapter.chapterName);

      return {
        chapterName: chapter.chapterName,
        youtubeVideo: youtubeData,
        courseData: parsed,
      };
    });

    const CourseContent = await Promise.all(promises);
    console.log("📦 Final CourseContent to save:", CourseContent);


    await db
      .update(coursesTable)
      .set({ courseContent: CourseContent })
      .where(eq(coursesTable.cid, courseId));

    return NextResponse.json({
      courseName: courseTitle,
      CourseContent,
    });
  } catch (err) {
    console.error("❌ Error in generate-course-content:", err);
    return NextResponse.json(
      { error: "Failed to generate content" },
      { status: 500 }
    );
  }
}

const YOUTUBE_BASE_URL = "https://www.googleapis.com/youtube/v3/search";
const GetYoutubeVideo = async (topic) => {
  const params = {
    part: "snippet",
    q: topic,
    maxResults: 4,
    type: "video",
    key: process.env.YOUTUBE_API_KEY,
  };
  const resp = await axios.get(YOUTUBE_BASE_URL, { params });
  return resp.data.items.map((item) => ({
    videoId: item.id?.videoId,
    title: item.snippet?.title,
  }));
};
