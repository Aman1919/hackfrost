import React, { useState } from "react";
import { BACKEND_URL } from "../../contants";

interface NotesProps {
  videoData: any; // You can define a more specific type if needed
}

const Notes: React.FC<NotesProps> = ({ videoData }) => {
  const [notes, setNotes] = useState<string>(videoData.Notes);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNotes(e.target.value);
  };

  const handleSaveNotes = async () => {
    setLoading(true);
    setError(""); // Clear previous errors before starting a new save attempt

    const url = `${BACKEND_URL}/notes/saveNotes/${videoData.id}`;
    
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("You must be logged in to save notes.");
        setLoading(false);
        return;
      }

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ notes }), // Send the notes as part of the request body
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || "Something went wrong. Please try again.");
      } else {
        const data = await response.json();
        console.log("Notes saved successfully:", data);
        alert("Notes saved!");
      }
    } catch (err: any) {
      console.error(err);
      setError("An error occurred while submitting the form.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-[90%] w-[700px] mx-auto bg-gray-500 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Your Notes</h2>

      {/* Notes Textarea */}
      <textarea
        className="w-full h-64 p-2 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
        value={notes}
        onChange={handleNoteChange}
        placeholder="Write your notes here..."
      />

      {/* Error message */}
      {error && <p className="text-red-500 mt-2">{error}</p>}

      {/* Save Notes Button */}
      <div className="flex justify-end mt-4">
        <button
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-300"
          onClick={handleSaveNotes}
          disabled={loading} // Disable the button while loading
        >
          {loading ? "Saving..." : "Save Notes"}
        </button>
      </div>
    </div>
  );
};

export default Notes;
