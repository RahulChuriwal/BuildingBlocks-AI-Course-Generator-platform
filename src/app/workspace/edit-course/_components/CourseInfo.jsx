"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Button } from "../../../../components/ui/button";
import { FlameIcon, BookIcon, ClockIcon } from "lucide-react";
import axios from "axios";
import ChapterTopicList from "./ChapterTopicList";

function CourseInfo({ course }) {
  const courseLayout = course?.courseJson?.course;
  const [loading, setLoading] = useState(false);

  const handleGenerateContent = async () => {
    if (course?.courseContent?.length > 0) {
      alert("✅ Course content already exists.");
      return;
    }

    try {
      setLoading(true);
      const result = await axios.post("/api/generate-course-content", {
        courseJson: course?.courseJson?.course,
        courseTitle: courseLayout?.name,
        courseId: course?.cid,
      });
      alert("✅ Course content generated successfully!");
      window.location.reload(); // Refresh page to see content
    } catch (error) {
      console.error("❌ Failed to generate content:", error);
      alert("Failed to generate course content.");
    } finally {
      setLoading(false);
    }
  };

  if (!courseLayout) {
    return <p className="text-center mt-5 text-orange-600 font-semibold">Course layout not found.</p>;
  }

  return (
    <>
      <div className="bg-white p-6 rounded-2xl shadow-md flex flex-col md:flex-row items-start gap-6 ">
        <div className="flex-1 space-y-4">
          <h2 className="text-3xl font-bold text-orange-600">{courseLayout.name}</h2>
          <p className="text-gray-600 max-w-2xl leading-relaxed">{courseLayout.description}</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm mt-4">
            <div className="flex items-center gap-2">
              <ClockIcon className="text-orange-500" size={18} />
              <span className="font-semibold">Duration:</span> <span>{courseLayout.duration || "8 Weeks"}</span>
            </div>

            <div className="flex items-center gap-2">
              <BookIcon className="text-green-500" size={18} />
              <span className="font-semibold">Chapters:</span>
              <span>{courseLayout.noOfChapters} Chapters</span>
            </div>

            <div className="flex items-center gap-2">
              <FlameIcon className="text-red-500" size={18} />
              <span className="font-semibold">Difficulty:</span>
              <span>{courseLayout.level.charAt(0).toUpperCase() + courseLayout.level.slice(1)}</span>
            </div>
          </div>

          <Button
            onClick={handleGenerateContent}
            className="bg-orange-500 hover:bg-orange-600 text-white mt-4 rounded-lg px-6 py-2"
            disabled={loading}
          >
            {loading ? "Generating..." : "⚙️Generate Content"}
          </Button>
        </div>

        <div className="w-full md:w-[300px]">
          <Image
            src={course?.bannerImageUrl || "/placeholder.png"}
            alt="Course Banner"
            width={400}
            height={300}
            className="rounded-2xl w-full h-[240px] object-cover"
          />
        </div>
      </div>

      <ChapterTopicList courseContent={course?.courseContent} />
    </>
  );
}

export default CourseInfo;
