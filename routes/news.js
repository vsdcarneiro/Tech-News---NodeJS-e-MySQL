import { Router } from "express";
import newsController from "../controllers/news.js";

const router = Router();

router.get("/news", newsController.news);

export default router;
