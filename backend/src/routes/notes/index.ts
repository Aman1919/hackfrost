import express from "express";
import { authenticateJWT } from "../../middleware/auth";
import { SaveNotes } from "../../controllers/notes";

const router = express.Router();

router.post("/saveNotes/:id",authenticateJWT,SaveNotes);

export default router;