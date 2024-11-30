import { YOUTUBE_API_KEY } from "../constant";
import axios from "axios";

// Replace with your YouTube Data API key

// Function to extract the video ID from a YouTube URL
export function extractVideoId(url:string) {
  const regex = /(?:https?:\/\/(?:www\.)?youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|(?:watch\?v=|shorts\/)([^"&?/ ]+)))/;
  const match = url.match(regex);
  return match ? match[1] : null;
}

export function extractTimeStamps(description:string){

      // Extract timestamps using a regular expression
      const timestampRegex = /(\d{1,2}:\d{2}(?::\d{2})?)\s+-\s+(.+)/g;
      const timestamps = [];

      let match;
      while ((match = timestampRegex.exec(description)) !== null) {
        timestamps.push({ time: match[1], title: match[2] });
      }

      return timestamps;
}
// Function to get video details from YouTube using the YouTube Data API
export async function getYouTubeVideoDetails(videoId:string) {
  console.log(videoId);
  if (!videoId) {
    throw new Error('Invalid YouTube URL');
  }

  const apiUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${videoId}&key=${YOUTUBE_API_KEY}`;

  try {
    const response = await axios.get(apiUrl);
    const videoDetails =await response.data.items[0];
    const timestamps = extractTimeStamps(videoDetails.snippet.description);
    if (videoDetails) {
      return {
        title: videoDetails.snippet.title,
        description: videoDetails.snippet.description,
        publishedAt: videoDetails.snippet.publishedAt,
        viewCount: videoDetails.statistics.viewCount,
        likeCount: videoDetails.statistics.likeCount,
        dislikeCount: videoDetails.statistics.dislikeCount,
        duration: videoDetails.contentDetails.duration,
        timestamps
      };
    } else {
      throw new Error('Video not found');
    }
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch video details');
  }
}

