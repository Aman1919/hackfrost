import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BACKEND_URL } from "../../contants";
import VideoPlayer from "./videoPlayer";
import AIAsk from "./AIAsk";
import Notes from "./Notes";
import Spinner from "../spinner";
// import Chapters from "./Chapters";

export default function Course() {
  const { id } = useParams<{ id: string }>();
  const [videoDetails, setVideoDetails] = useState(null);
  const [activeTab, setActiveTab] = useState<string>("video");
  const [loading, setLoading] = useState<boolean>(false); // State to track loading
 
  
  useEffect(() => {
    const fetchVideoDetails = async () => {
      setLoading(true); // Set loading to true before fetching data
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
          setVideoDetails(data);
        } else {
          console.error("Failed to fetch video details");
        }
      } catch (error) {
        console.error("Error fetching video details", error);
      } finally {
        setLoading(false); // Set loading to false after the fetch is done
      }
    };

    if (id) {
      fetchVideoDetails();
    }
  }, [id]);

  if (!id) return <></>;

  return (
    <div className="h-screen flex flex-col">
      {/* Header with Tab Navigation */}
      <header className="bg-white shadow-md">
        <nav className="container mx-auto flex justify-around items-center py-4">
          <div className="flex space-x-6">
            <button
              onClick={() => setActiveTab("video")}
              className={`text-gray-800 hover:text-blue-500 font-medium cursor-pointer transition ${
                activeTab === "video" ? "font-bold" : ""
              }`}
            >
              Video
            </button>
            <button
              onClick={() => setActiveTab("notes")}
              className={`text-gray-800 hover:text-blue-500 font-medium cursor-pointer transition ${
                activeTab === "notes" ? "font-bold" : ""
              }`}
            >
              Notes
            </button>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-start px-4 py-6">
        {/* Show spinner if loading */}
        {loading && (
          <Spinner/>
        )}

        {/* Show video, AI, or notes content based on active tab */}
        {!loading && videoDetails && activeTab === "video" && (
          <VideoPlayer videoDetails={videoDetails}/>
        )}
        {!loading && activeTab === "ai" && <AIAsk />}
        {!loading && activeTab === "notes" && <Notes videoData={videoDetails}/>}
      </main>
    </div>
  );
}
