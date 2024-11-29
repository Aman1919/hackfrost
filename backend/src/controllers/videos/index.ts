import { db } from "../../db";
import { getYouTubeVideoDetails } from "../../utils/video";

export const AddVideo = async (req:any,res:any)=>{
try{
    const user= req.user;
    const dailyTime = req.body.dailyTime
    const url = req.body.courseUrl;
    const weeklyTime =req.body.weeklyTime
    const VideoDetails =await getYouTubeVideoDetails(url)
    console.log(VideoDetails);
   return  res.status(200).json({message:"Added video",VideoDetails})
}catch(e){
    console.log(e);
}
}