"use client";

import React from "react";

function ChapterTopicList({ courseContent }) {
  if (!Array.isArray(courseContent) || courseContent.length === 0) {
    return (
      <div className="text-center text-gray-500 mt-10">
        📚 No course content available.
      </div>
    );
  }

  return (
    <div className="mt-8 px-4 md:px-6">
      <h2 className="text-2xl font-bold text-orange-600 mb-6">
        📖 Chapters & Topics
      </h2>

      <div className="relative ml-6 before:absolute before:top-0 before:left-[16px] before:bottom-0 before:w-0.5 before:bg-orange-300 space-y-10">
        {courseContent.map((chapterData, index) => (
          <div key={index} className="relative flex items-start gap-4">
            {/* Number in center of the vertical line */}
            <div className="relative z-10">
              <div className="w-8 h-8 bg-orange-500 text-white text-sm font-semibold rounded-full flex items-center justify-center shadow">
                {index + 1}
              </div>
            </div>

            {/* Connected Chapter & Topics Block */}
            <div className="flex-1">
              <div className="bg-orange-100 px-4 py-2 rounded-t-md">
                <h3 className="text-xl font-semibold text-orange-800">
                  {chapterData.courseData?.chapterName || `Chapter ${index + 1}`}
                </h3>
              </div>

              <div className="bg-white border border-t-0 border-gray-200 rounded-b-md p-4">
                {chapterData.courseData?.topics?.length > 0 ? (
                  <ul className="space-y-2">
                    {chapterData.courseData.topics.map((topicObj, tIndex) => (
                      <li
                        key={tIndex}
                        className="flex items-start gap-2 text-sm text-gray-800"
                      >
                        <span className="w-5 h-5 text-xs bg-gray-400 text-white rounded-full flex items-center justify-center">
                          {tIndex + 1}
                        </span>
                        <span>{topicObj.topic}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-400 italic">No topics available.</p>
                )}

                {chapterData.youtubeVideo?.length > 0 && (
                  <p className="mt-3 text-xs text-gray-500 italic">
                    🎥 Includes {chapterData.youtubeVideo.length} YouTube video
                    {chapterData.youtubeVideo.length > 1 ? "s" : ""}.
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ChapterTopicList;
