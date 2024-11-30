import React from "react";
import { useAuthStore } from "../store";
import VideoCard from "../components/videocard";

export default function AllCourses(){
    const {user}= useAuthStore();
    console.log(user)
    return <div className="flex flex-wrap justify-center align-center gap-3 "> 

{
user&&user.user&&user.user.videos&&user.user.videos.map((video,key)=>{
return <VideoCard video={video} key={key}/>
})

}
    </div>
}