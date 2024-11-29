import React, { useState } from "react";

export default function Home() {
  const [formData, setFormData] = useState({
    duration: "",
    weeklyTime: "",
    dailyTime: "",
    courseUrl: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
  
    // Prevent the value from being set if it is a negative number for specific fields
    if (name === "duration" || name === "weeklyTime" || name === "dailyTime") {
      // Check if the value is not a valid number or if it's a negative number
      if (value === "" || (Number(value) < 0 && value !== "-")) {
        return; // Prevent setting the value
      }
    }
  
    // Update the form data with the new value
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    // Add your logic for form submission
  };

  return (
    <div className="text-white min-h-screen flex items-center justify-center bg-gray-600">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">Enter Course Details</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
        
          {/* Course Duration */}
          <div>
            <label htmlFor="duration" className="block text-sm font-medium">
              How long do you want to finish this course? (in weeks)
            </label>
            <input
              type="number"
              id="duration"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              placeholder="e.g., 6 weeks"
              className="mt-1 block w-full p-2 rounded-md bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Weekly Time Commitment */}
          <div>
            <label htmlFor="weeklyTime" className="block text-sm font-medium">
              How much time do you want to dedicate each week? (in hours)
            </label>
            <input
              type="number"
              id="weeklyTime"
              name="weeklyTime"
              value={formData.weeklyTime}
              onChange={handleChange}
              placeholder="e.g., 10 hours"
              className="mt-1 block w-full p-2 rounded-md bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Daily Time Commitment */}
          <div>
            <label htmlFor="dailyTime" className="block text-sm font-medium">
              How much time do you want to dedicate each day? (in hours)
            </label>
            <input
              type="number"
              id="dailyTime"
              name="dailyTime"
              value={formData.dailyTime}
              onChange={handleChange}
              placeholder="e.g., 2 hours"
              className="mt-1 block w-full p-2 rounded-md bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Course URL */}
          <div>
            <label htmlFor="courseUrl" className="block text-sm font-medium">
              URL of the Course
            </label>
            <input
              type="url"
              id="courseUrl"
              name="courseUrl"
              value={formData.courseUrl}
              onChange={handleChange}
              placeholder="Enter the course URL"
              className="mt-1 block w-full p-2 rounded-md bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
