import { Router } from "express";
import newsController from "../controllers/news.js";

const router = Router();

router.get("/admin/news/new", newsController.newNews);
router.post("/news/create", newsController.createNews);

export default router;
