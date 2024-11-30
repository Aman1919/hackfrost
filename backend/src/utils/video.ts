import { YOUTUBE_API_KEY } from "../constant";
import axios from "axios";
import {YoutubeTranscript} from "youtube-transcript"
// Replace with your YouTube Data API key

/**
 * Extracts the YouTube video ID from a given URL.
 * @param {string} url - The YouTube URL.
 * @returns {string | null} The extracted video ID, or null if no valid ID is found.
 */
export function extractVideoId(url: string): string | null {
  const regex =
    /(?:https?:\/\/(?:www\.)?youtube\.com\/(?:.*?v=|.*?\/v\/|.*?embed\/|.*?shorts\/)|https?:\/\/youtu\.be\/)([^"&?/ ]+)/;
  
  const match = url.match(regex);
  return match && match[1] ? match[1] : null;
}


function extractChaptersFromDescription(description: string) {
  const timestampRegex = /(\d{1,2}:\d{2}(?::\d{2})?)\s*-\s*(.*)/g;
  const chapters = [];
  let match;

  while ((match = timestampRegex.exec(description)) !== null) {
    chapters.push({
      timestamp: match[1],
      title: match[2],
    });
  }
  return chapters;
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
    const timestamps = extractChaptersFromDescription(videoDetails.snippet.description);
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

export async function getYoutubeVideoTranscribe(videoId: string): Promise<string | null> {
  try {
    const transcript = await YoutubeTranscript.fetchTranscript(videoId);

    if (!transcript || transcript.length === 0) {
      console.warn("Transcript not available for this video.");
      return null;
    }

    // Combine transcript parts into a single string
    const transcriptText = transcript.map((entry) => entry.text).join(" ");
    return transcriptText;
  } catch (error) {
    console.error("Failed to fetch YouTube transcript:", error);
    return null;
  }
}