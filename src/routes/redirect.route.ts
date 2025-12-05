import express from "express";
import { redirectUls } from "../controllers/redirect.controller";

const router = express.Router();

router.get("/:id", redirectUls);

export default router;