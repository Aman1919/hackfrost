import React from "react";
import { useNavigate } from "react-router-dom";

function VideoCard({ video }:any) {
  const {
    id,
    videoId,
    title,
    dailyTime,
    weeklyTime,
    currentTime,
    completed,
    createdAt,
  } = video;
  const navigate = useNavigate();
 
  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
      {/* Video Thumbnail */}
      <div className="relative">
        <iframe
          className="w-full h-48"
          src={`https://www.youtube.com/embed/${videoId}`}
          title={title || "YouTube Video"}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>

      {/* Card Content */}
      <div className="p-4">
        {/* Title */}
        <h2 className="text-lg font-semibold text-gray-800 mb-2">
          {title || "No Title Provided"}
        </h2>

        

        {/* Actions */}
        <div className="flex justify-between items-center">
          <button onClick={()=>navigate(`/course/${videoId}`)} className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-4 py-2 rounded-md">
            Watch Now
          </button>
          <button className="text-blue-500 hover:underline text-sm">
            More Info
          </button>
        </div>
      </div>
    </div>
  );
}

export default VideoCard;
