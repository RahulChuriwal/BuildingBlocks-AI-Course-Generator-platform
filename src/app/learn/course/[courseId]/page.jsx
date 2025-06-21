"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { PlayCircle, CheckCircle } from "lucide-react";
import YouTubePlayer from "../../../../components/ui/YouTubePlayer";

export default function CoursePlayerPage() {
  const { courseId } = useParams();
  const [chapters, setChapters] = useState([]);
  const [activeChapterIndex, setActiveChapterIndex] = useState(null);
  const [activeTopicIndex, setActiveTopicIndex] = useState(null);
  const [courseName, setCourseName] = useState("Course");
  const [showPlayer, setShowPlayer] = useState(false);

  useEffect(() => {
    axios
      .get(`/api/course-content?courseId=${courseId}`)
      .then((res) => {
        const content = res.data.courseContent || [];
        console.log("📦 Raw course content:", content);
        setChapters(content); // ✅ Don't strip youtubeVideo!
        const name = res.data?.courseJson?.course?.name;
        if (name) setCourseName(name);
      })
      .catch(console.error);
  }, [courseId]);

  const activeChapter = chapters?.[activeChapterIndex];
  const activeTopic = activeChapter?.courseData?.topics?.[activeTopicIndex];

  // Get the video corresponding to the active topic
  const getActiveVideo = () => {
    if (!activeChapter || activeTopicIndex === null) return null;

    const videos = activeChapter.youtubeVideo;
    if (!videos || !Array.isArray(videos)) return null;

    // Match topic index with video index
    return videos[activeTopicIndex] || null;
  };

  const activeVideo = getActiveVideo();

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 border-r bg-gradient-to-b from-white to-orange-50 p-4 overflow-y-auto shadow-md">
        <h2 className="text-lg font-bold text-orange-600 mb-6 pl-2">📘 {courseName}</h2>
        <ul className="space-y-3">
          {chapters.map((ch, ci) => (
            <li key={ci} className="space-y-1">
              <button
                className={`w-full text-left px-3 py-2 rounded-lg transition-all duration-200 ${ci === activeChapterIndex
                    ? "bg-orange-100 text-orange-700 font-semibold shadow"
                    : "hover:bg-orange-100 text-gray-700"
                  }`}
                onClick={() => {
                  setActiveChapterIndex(ci);
                  setActiveTopicIndex(null);
                  setShowPlayer(false);
                }}
              >
                <span className="block truncate">
                  {ci + 1}. {ch.courseData.chapterName}
                </span>
              </button>

              {ci === activeChapterIndex && ch.courseData.topics?.length > 0 && (
                <ul className="pl-4 border-l-2 border-orange-200 ml-2 mt-1 space-y-1">
                  {ch.courseData.topics.map((t, ti) => (
                    <li key={ti}>
                      <button
                        className={`text-sm px-3 py-1 w-full text-left rounded-md transition ${ti === activeTopicIndex
                            ? "bg-orange-200 text-orange-800 font-medium"
                            : "hover:bg-orange-50 text-gray-600"
                          }`}
                        onClick={() => {
                          setActiveTopicIndex(ti);
                          setShowPlayer(false);
                        }}
                      >
                        ▸ {t.topic}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">
        {!activeChapter ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-500">
            <PlayCircle className="w-12 h-12 mb-4 text-orange-400" />
            <p className="text-lg">Select a chapter to get started</p>
          </div>
        ) : !activeTopic ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-500">
            <PlayCircle className="w-12 h-12 mb-4 text-orange-400" />
            <p className="text-lg">Select a topic in "{activeChapter.courseData.chapterName}"</p>
          </div>
        ) : (
          <section className="space-y-6">
            <div className="flex justify-between items-start">
              <h1 className="text-2xl font-bold text-orange-600">{activeTopic.topic}</h1>
              <label className="inline-flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="form-checkbox h-5 w-5 text-green-500" />
                <span className="text-sm text-gray-700">Mark as Completed</span>
              </label>
            </div>

            {/* 🎬 YouTube Section - Now shows topic-specific video */}
            <div>
              <h2 className="text-lg font-semibold text-gray-700 mb-3">🎬 Video Preview</h2>
              {activeVideo ? (
                <div className="w-full max-w-[640px] mx-auto aspect-video">
                  <YouTubePlayer
                    videoId={activeVideo.videoId}
                    title={activeVideo.title}
                  />
                  <div className="mt-2 px-3 py-2 bg-orange-50 rounded-b-lg border border-t-0 border-gray-200">
                    <h3 className="font-medium text-gray-700 text-sm truncate">
                      📹 {activeVideo.title}
                    </h3>
                  </div>
                </div>
              ) : (
                <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center max-w-md">
                  <PlayCircle className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                  <p className="text-gray-500 text-sm">No video available for this topic</p>
                </div>
              )}
            </div>

            {/* 📚 Topic Content */}
            <div className="text-gray-700 space-y-4 text-base leading-relaxed">
              {activeTopic.content?.startsWith("<") ? (
                <div
                  className="prose max-w-3xl"
                  dangerouslySetInnerHTML={{ __html: activeTopic.content }}
                />
              ) : (
                <p>{activeTopic.content}</p>
              )}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}