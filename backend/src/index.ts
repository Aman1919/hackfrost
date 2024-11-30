import express from "express";
import AuthRouter from "./routes/auth/index"
import VideoRouter from "./routes/videos/index";
import NotesRouter from "./routes/notes/index"
import cors from  "cors";
const app = express();

const PORT = process.env.BACKEND_PORT ?? 5000;
export const BACKEND_ROUTE = "api";

app.use(express.json());
app.use(cors());

app.get('/',(res:any,req:any)=>{
    req.send("nlmaks");
})
app.use(`/${BACKEND_ROUTE}/auth/`,AuthRouter);
app.use(`/${BACKEND_ROUTE}/videos/`,VideoRouter);
app.use(`/${BACKEND_ROUTE}/notes/`,NotesRouter);

app.listen(4000,()=>console.log('Listening at 4000'))