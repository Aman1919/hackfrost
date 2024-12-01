import React, { useEffect, useRef, useState } from "react";

interface VideoPlayerProps {
  videoDetails: any
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoDetails}) => {
  const [player, setPlayer] = useState<any>(null);
  const playerRef = useRef(null);

  // Load the YouTube API and initialize the player

  useEffect(() => {
    const loadYouTubeAPI = () => {
      if (!window.YT) {
        const script = document.createElement("script");
        script.src = "https://www.youtube.com/iframe_api";
        script.onload = initializePlayer;
        document.head.appendChild(script);
      } else {
        initializePlayer();
      }
    };

    loadYouTubeAPI();

    return () => {
      if (player) {
        player.destroy();
      }
    };
  }, [player]);
  const initializePlayer = () => {
    if (!player && window.YT && playerRef.current) {
      const newPlayer =  new window.YT.Player("player-div", {
        videoId: videoDetails.videoId,
        width:window.innerWidth*0.9,
        height:Math.min(window.innerWidth*0.7,500),
        playerVars: {
          playsinline: 1,
        },
        rel:0
      });
      setPlayer(newPlayer);
    }
  };

  // Handle timestamp clicks
  const handleTimestampClick = (timestamp: string) => {
    if (!timestamp || !player) return;
    const [hours, minutes, seconds] = timestamp.split(":").map(Number);
    const startTime = hours * 3600 + minutes * 60 + seconds;
    player.seekTo(startTime, true);
  };
if(!videoDetails){
    return <></>
}

  return (
    <div>
        
      {/* Chapters Dropdown */}
      <select
        className="bg-gray-100 p-2 rounded-lg max-w-[200px] my-4 text-justify text-blue-500 hover:underline cursor-pointer"
        onChange={(e) => handleTimestampClick(e.target.value)}
      >
        <option value="">Chapters</option>
        {videoDetails?.timestamps?.map((timestamp, index) => (
          <option key={index} value={timestamp.time}>
            {timestamp.title}
          </option>
        ))}
      </select>
      <div
        ref={playerRef}
        id="player-div"
        className=" rounded-lg shadow-lg border border-gray-200 mb-6"
      ></div>

    </div>
  );
};

export default VideoPlayer;
