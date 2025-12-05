
import express from "express";
import { generateRedirection, getAllUrls } from "../controllers/urls.controller";

const router = express.Router();

router.get("/urls", getAllUrls);
router.post("/urls", generateRedirection);

export default router;