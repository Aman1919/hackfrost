import express from "express";
import { authenticateJWT } from "../../middleware/auth";
import { AddVideo } from "../../controllers/videos";

const router = express.Router();

router.post("/addvideo",authenticateJWT,AddVideo);

export default router;