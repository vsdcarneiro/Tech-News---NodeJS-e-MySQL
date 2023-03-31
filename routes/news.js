import { Router } from "express";
import newsController from "../controllers/news.js";

const router = Router();

router.get("/admin/news/new", newsController.newNews);
router.post("/news/create", newsController.createNews);
router.get("/admin/news", newsController.getNews);
router.get("/admin/news/edit/:id", newsController.editNews);
router.post("/news/update", newsController.updateNews);
router.post("/news/delete", newsController.deleteNews);

export default router;
