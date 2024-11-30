import { db } from "../../db";

// Get Notes for a specific video
export async function GetNotes(req: any, res: any) {
  try {
    const { id } = req.params; // Correct usage of req.params
    const video = await db.video.findUnique({
      where: {
        id,
      },
      select: {
        Notes: true, // Select the Notes field to return
      },
    });

    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    return res.status(200).json({ notes: video.Notes });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

// Save Notes for a specific video
export async function SaveNotes(req: any, res: any) {
  try {
    const { id } = req.params; // Correct usage of req.params
    const { notes } = req.body;
    const user = req.user;

    // Ensure the notes are provided
    if (!notes) {
      return res.status(400).json({ message: "No notes provided" });
    }

    // Check if the video exists
    const video = await db.video.findUnique({
      where: {
        id,
      },
      select: {
        videoId: true,
      },
    });

    if (!video) {
      return res.status(404).json({ message: "Video doesn't exist" });
    }

    // Update the video notes
    await db.video.update({
      where: {
        id,
      },
      data: {
        Notes: notes,
      },
    });

    return res.status(200).json({ message: "Notes saved successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
