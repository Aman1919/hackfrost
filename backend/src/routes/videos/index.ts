import express from "express";
import { authenticateJWT } from "../../middleware/auth";
import { AddVideo, GetVideo } from "../../controllers/videos";

const router = express.Router();

router.post("/addvideo",authenticateJWT,AddVideo);
router.get("/videoDetails/:id",authenticateJWT,GetVideo);
export default router;