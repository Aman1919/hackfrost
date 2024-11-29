import { YOUTUBE_API_KEY } from "../constant";
import axios from "axios";

// Replace with your YouTube Data API key

// Function to extract the video ID from a YouTube URL
function extractVideoId(url:string) {
  const regex = /(?:https?:\/\/(?:www\.)?youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|(?:watch\?v=|shorts\/)([^"&?/ ]+)))/;
  const match = url.match(regex);
  return match ? match[1] : null;
}

// Function to get video details from YouTube using the YouTube Data API
export async function getYouTubeVideoDetails(videoUrl:string) {
  const videoId = extractVideoId(videoUrl);
  console.log(videoId);
  if (!videoId) {
    throw new Error('Invalid YouTube URL');
  }

  const apiUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${videoId}&key=${YOUTUBE_API_KEY}`;

  try {
    const response = await axios.get(apiUrl);
    const videoDetails =await response.data.items[0];
    if (videoDetails) {
      return {
        title: videoDetails.snippet.title,
        description: videoDetails.snippet.description,
        publishedAt: videoDetails.snippet.publishedAt,
        viewCount: videoDetails.statistics.viewCount,
        likeCount: videoDetails.statistics.likeCount,
        dislikeCount: videoDetails.statistics.dislikeCount,
        duration: videoDetails.contentDetails.duration, // ISO 8601 format
      };
    } else {
      throw new Error('Video not found');
    }
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch video details');
  }
}

