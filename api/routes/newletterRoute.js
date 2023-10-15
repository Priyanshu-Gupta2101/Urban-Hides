// newsletterRoutes.js
import express from "express";
import { subscribeNewsletter } from "../controllers/newsletterController.js";

const router = express.Router();

// POST route to subscribe to the newsletter
router.post("/subscribe", subscribeNewsletter);

export default router;
