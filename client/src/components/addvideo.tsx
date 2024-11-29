import React, { useState, useCallback } from "react";
import { BACKEND_URL } from "../contants";

export default function AddVideo() {
  const [formData, setFormData] = useState({
    dailyTime: "",
    courseUrl: "",
    weeklyTime:""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Memoizing the handleChange function to avoid unnecessary re-renders
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Allow only valid numbers for specific fields
    if (["duration", "weeklyTime", "dailyTime"].includes(name)) {
      if (value === "" || (Number(value) < 0 && value !== "-")) return; // Reject invalid or negative numbers
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(""); // Clear previous errors

    try {
        const token = localStorage.getItem('token');
      const response = await fetch(`${BACKEND_URL}/videos/addvideo`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
         Authorization: `Bearer ${token}`,

        },
        body: JSON.stringify(formData), // Send formData directly
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.log(errorData);
        setError(errorData.message || "Something went wrong. Please try again.");
      } else {
        const data = await response.json();
        console.log("Video added successfully:", data);
      }
    } catch (err: any) {
      setError("An error occurred while submitting the form.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Weekly Time Commitment */}
      <InputField
        id="weeklyTime"
        name="weeklyTime"
        label="How much time do you want to dedicate each week? (in hours)"
        value={formData.weeklyTime}
        onChange={handleChange}
        placeholder="e.g., 10 hours"
        type="number"
        required
      />

      {/* Daily Time Commitment */}
      <InputField
        id="dailyTime"
        name="dailyTime"
        label="How much time do you want to dedicate each day? (in hours)"
        value={formData.dailyTime}
        onChange={handleChange}
        placeholder="e.g., 2 hours"
        type="number"
        required
      />

      {/* Course URL */}
      <InputField
        id="courseUrl"
        name="courseUrl"
        label="URL of the Course"
        value={formData.courseUrl}
        onChange={handleChange}
        placeholder="Enter the course URL"
        type="url"
        required
      />

      {/* Error Display */}
      {error && <div className="text-red-500 text-sm">{error}</div>}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {loading ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}

// Reusable Input Component for form fields
const InputField = ({
  id,
  name,
  label,
  value,
  onChange,
  placeholder,
  type,
  required,
}: {
  id: string;
  name: string;
  label: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  placeholder: string;
  type: string;
  required: boolean;
}) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium">
      {label}
    </label>
    <input
      type={type}
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="mt-1 block w-full p-2 rounded-md bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      required={required}
    />
  </div>
);
