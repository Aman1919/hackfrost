import React from "react";

export default function Spinner(){
    return <div className="flex justify-center items-center space-x-2">
    <div className="w-16 h-16 border-4 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
    <span className="text-gray-600">Loading...</span>
  </div>
}