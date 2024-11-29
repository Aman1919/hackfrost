import React, { useState } from "react";
import AddVideo from "../components/addvideo";

export default function Home() {

  return (
    <div className="text-white min-h-screen flex items-center justify-center bg-gray-600">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">Enter Course Details</h1>
        <AddVideo/>
      </div>
    </div>
  );
}
