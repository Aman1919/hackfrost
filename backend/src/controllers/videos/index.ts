import { db } from "../../db";
import { getYouTubeVideoDetails ,extractVideoId} from "../../utils/video";

export const AddVideo = async (req: any, res: any) => {
  try {
    const { user } = req;
    const { dailyTime, courseUrl: url, weeklyTime } = req.body;

    // Fetch video details from YouTube

    

    const VideoId = extractVideoId(url);
    if(!VideoId){
        return res.status(404).json({message:"Error fetching the Video Try entering the link again"})
    }
    const videoDetails = await getYouTubeVideoDetails(VideoId);
    console.log(videoDetails);

    // Create a new video record in the database
    const video = await db.video.create({
      data: {
        userid: user.user.id,
        dailyTime,
        weeklyTime,
        videoId:VideoId,
      },
    });

    return res.status(200).json({
      message: "Video added successfully",
      videoDetails,
      video,
    });
  } catch (error:any) {
    console.error("Error adding video:", error);
    return res.status(500).json({
      message: "An error occurred while adding the video",
      error: error.message || error,
    });
  }
};
export const GetVideo = async (req: any, res: any) => {
    try {
      const { id } = req.params;
  
      // Validate the video ID
      if (!id) {
        return res.status(400).json({ message: "Video ID is required" });
      }
  
      // Fetch video details
      const videoDetails = await getYouTubeVideoDetails(id);
  
      // Check if video details are found
      if (!videoDetails) {
        return res.status(404).json({ message: "Video not found" });
      }
  
      // Return the video details in the response
      return res.status(200).json({ videoDetails });
    } catch (error) {
      // Log the error for debugging purposes
      console.error("Error fetching video details:", error);
  
      // Return a 500 Internal Server Error if something goes wrong
      return res.status(500).json({ message: "Internal server error" });
    }
  };
  