"use client";
import React, { useState } from "react";
import { PlayCircle } from "lucide-react";

export default function YouTubePlayer({ videoId, title = "YouTube Video" }) {
  const [showPlayer, setShowPlayer] = useState(false);
  const [hasError, setHasError] = useState(false);

  if (!videoId) {
    return (
      <div className="flex items-center justify-center h-64 bg-black text-white rounded-lg">
        <PlayCircle size={48} />
        <p className="ml-3">No video available</p>
      </div>
    );
  }

  const thumbnail = `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`;

  return (
    <div className="relative w-full max-w-3xl h-64 rounded-lg overflow-hidden shadow-md">
      {showPlayer ? (
        hasError ? (
          <div className="flex items-center justify-center h-full bg-black text-white">
            <p>⚠️ Failed to load video. Please try again later.</p>
          </div>
        ) : (
          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
            title={title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            onError={() => setHasError(true)}
          />
        )
      ) : (
        <div
          className="relative w-full h-full cursor-pointer"
          onClick={() => setShowPlayer(true)}
        >
          <img
            src={thumbnail}
            alt="Video thumbnail"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <PlayCircle size={60} className="text-white opacity-90" />
          </div>
        </div>
      )}
    </div>
  );
}
