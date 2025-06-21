import { db } from '../../../../config/db';
import { coursesTable } from '../../../../config/schema';
import { auth, currentUser } from '@clerk/nextjs/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import axios from 'axios';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';

const PROMPT = `Generate Learning Course depends on following details. In which Make sure to add Course Name, 
Description, Course Banner Image Prompt Depends on Course Topics in 3d illustration.
Chapter Name, Topic under each chapter, Duration for each chapter etc, in JSON format only.

Schema:
{
  "course": {
    "name": "string",
    "description": "string",
    "category": "string",
    "level": "string",
    "includeVideo": "boolean",
    "noOfChapters": "number",
    "bannerImagePrompt": "string",
    "chapters": [
      {
        "chapterName": "string",
        "duration": "string",
        "topics": ["string"]
      }
    ]
  }
}

User Input:
`;

export const ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(req) {
  try {
    const { courseId, ...formData } = await req.json();
    const user = await currentUser();

    // Your existing logic
    const { has } = await auth();
    const hasPremiumAccess = has({ plan: 'starter' }) || has({ plan: 'premium' });

    const model = ai.getGenerativeModel({ model: 'gemini-1.5-flash' }); // or 1.0-pro or whatever version you're using
    const contents = [
      {
        role: 'user',
        parts: [{ text: PROMPT + JSON.stringify(formData) }],
      },
    ];
    const config = {
      temperature: 0.7,
      topK: 1,
      topP: 1,
      maxOutputTokens: 2048,
    };

    const result = await model.generateContent({
      contents,
      generationConfig: config,
    });

    const rawText = result?.response?.candidates?.[0]?.content?.parts?.[0]?.text;
    const rawJson = rawText.replace('```json', '').replace('```', '');
    const jsonResp = JSON.parse(rawJson);

    const bannerPrompt = jsonResp.course?.bannerImagePrompt;
    const bannerImageUrl = await GenerateImage(bannerPrompt);

    try {
      await db.insert(coursesTable).values({
        cid: courseId,
        name: formData.name,
        description: formData.description,
        category: formData.category,
        level: formData.level,
        includeVideo: formData.includeVideo ?? false,
        noOfChapters: Number(formData.noOfChapters),
        courseJson: jsonResp,
        bannerImageUrl,
        userEmail: user?.primaryEmailAddress?.emailAddress,
      });

      console.log("✅ Course inserted!");
    } catch (err) {
      console.error("❌ Insert failed:", err);
    }


    return NextResponse.json({ courseId });

  } catch (error) {
    console.error('❌ Error in generate-course-layout:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}


const GenerateImage = async (imagePrompt) => {
  const BASE_URL = 'https://aigurulab.tech';
  const result = await axios.post(
    BASE_URL + '/api/generate-image',
    {
      width: 1024,
      height: 1024,
      input: imagePrompt,
      model: 'flux',
      aspectRatio: '16:9',
    },
    {
      headers: {
        'x-api-key': process.env.AI_GURU_LAB_API,
        'Content-Type': 'application/json',
      },
    }
  );
  return result.data.image;
};
