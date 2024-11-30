import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { BACKEND_URL } from "../contants";

export default function Course() {
  const { id } = useParams();
  const [videoDetails, setVideoDetails] = useState<any>(null);
  const playerRef = useRef<any>(null); // Reference for the YouTube player div
  const [player, setPlayer] = useState<any>(null); // State for the YouTube player instance
 const [currentTimeStamp,setCurrentStamp]=useState("");
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
          console.error("Failed to fetch video details");
        }
      } catch (error) {
        console.error("Error fetching video details", error);
      }
    };

    fetchVideoDetails();
  }, [id]);

  // Load the YouTube API script and initialize the player
  useEffect(() => {
    if (!window.YT) {
      const script = document.createElement("script");
      script.src = "https://www.youtube.com/iframe_api";
      script.onload = () => initializePlayer();
      document.head.appendChild(script);
    } else {
      initializePlayer();
    }

    // Cleanup on unmount
    return () => {
      if (player) {
        player.destroy();
      }
    };
  }, []);

  // Initialize YouTube Player
  const initializePlayer = () => {
    if (!player && window.YT && playerRef.current) {
      const newPlayer = new window.YT.Player(playerRef.current, {
        videoId: id,
        playerVars: {
          playsinline: 1,
        },
        events: {
          onReady: handlePlayerReady,
        },
      });
      setPlayer(newPlayer);
    }
  };

  // Handle player ready
  const handlePlayerReady = (event: any) => {
    console.log("Player is ready");
    event.target.playVideo();
  };

  // Handle timestamp clicks
  const handleTimestampClick = (timestamp: string) => {
    if (!timestamp || !player) return;

    // Convert timestamp (e.g., "00:01:30") to seconds
    const [hours, minutes, seconds] = timestamp.split(":").map(Number);
    const startTime = hours * 3600 + minutes * 60 + seconds;

    player.seekTo(startTime, true); // Seek to the specified time
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-md">
        <nav className="container mx-auto flex justify-around items-center py-4">
          <select
            className="bg-gray-100 p-2 rounded-lg max-w-[200px] text-justify text-blue-500 hover:underline cursor-pointer"
            name="timestamps"
            id="youtube-video"
            onChange={(e) => handleTimestampClick(e.target.value)}
          >
            <option value="" className="w-fit">
              Chapters
            </option>
            {videoDetails?.timestamps?.map(
              (timestamp: { time: string; title: string }, index: number) => (
                <option key={index} className="w-fit" value={timestamp.time}>
                  {timestamp.title}
                </option>
              )
            )}
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
          <div
            ref={playerRef} // Reference for the YouTube Player container
            id="player-div"
            className="w-full max-w-4xl h-[70vh] rounded-lg shadow-lg border border-gray-200 mb-6"
          ></div>
        )}
      </main>
    </div>
  );
}
