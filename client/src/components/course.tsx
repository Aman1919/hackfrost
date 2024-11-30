import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BACKEND_URL } from "../contants";

export default function Course() {
  const { id } = useParams();
  const [videoDetails, setVideoDetails] = useState<any>(null);
 const [videoId,setVideoId]=useState(id);
 const [iframeSrc, setIframeSrc] = useState("");

  // Fetch video details
  useEffect(() => {
    const fetchVideoDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${BACKEND_URL}/videos/videoDetails/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setVideoDetails(data.videoDetails);
        } else {
          console.log("Failed to fetch video details");
        }
      } catch (error) {
        console.error("Error fetching video details", error);
      }
    };

    fetchVideoDetails();
  }, [id]);


  

  // Set the initial iframe source without a timestamp
  useEffect(() => {
    setIframeSrc(`https://www.youtube.com/embed/${videoId}`);
  }, [videoId]);

  const handleTimestampClick = (timestamp) => {
    // Convert timestamp (e.g., '00:01:30') to seconds
    if(!timestamp)return;
    const [hours, minutes, seconds] = timestamp.split(':').map(Number);
    const startTime = hours * 3600 + minutes * 60 + seconds;

    // Update the iframe src with the new start time
    setIframeSrc(`https://www.youtube.com/embed/${videoId}?start=${startTime}`);
  };
  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-md">
        <nav className="container mx-auto flex justify-around items-center py-4">
          <select
            className="bg-gray-100 p-2 rounded-lg max-w-[200px] text-justify text-blue-500 hover:underline cursor-pointer"
            name="timestamps"
            onChange={(e) => handleTimestampClick(e.target.value)}
          >
            <option value="" className="w-fit">Chapters</option>
            {videoDetails?.timestamps?.map((timestamp: { time: string; title: string }, index: number) => (
              <option key={index} className="w-fit " value={timestamp.time}>
                {timestamp.title}
              </option>
            ))}
          </select>
          <p className="text-gray-800 hover:text-blue-500 font-medium cursor-pointer transition">
            Take Notes
          </p>
          <p className="text-gray-800 hover:text-blue-500 font-medium cursor-pointer transition">
            Ask AI
          </p>
        </nav>
      </header>

      {/* Video Player */}
      <main className="flex-grow flex flex-col items-center justify-start px-4 py-6">
        {videoDetails && (
          <>
            {/* YouTube Video Player */}
            <div className="w-full max-w-4xl h-[70vh] rounded-lg shadow-lg border border-gray-200 mb-6">
              <iframe
                id="youtube-video"
                className="w-full h-full"
                src={iframeSrc}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={videoDetails.title || "YouTube Video"}
                
              ></iframe>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
