import { Router } from "express";
import { syncFromSheet } from "../controllers/syncController.js";
import { protect, adminOnly } from "../middleware/auth.js";

const router = Router();

// Admin triggers sync manually, OR Google Apps Script calls it with the secret key
router.post("/sheets", protect, adminOnly, syncFromSheet);

// Webhook endpoint for Google Apps Script (uses a shared secret instead of JWT)
router.post("/sheets/webhook", syncFromSheet);

export default router;
