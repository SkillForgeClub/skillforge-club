import express from 'express';
import { getStatus } from '../controllers/index.js';
import { supabase } from '../config/db.js';

const router = express.Router();

// Basic route to check API status
router.get('/status', getStatus);

router.get("/test-db", async (req, res) => {
  try {
    const { data, error } = await supabase.from("users").select("*").limit(1);
    if (error) {
      return res.status(500).json({
        success: false,
        message: "Supabase returned an error object",
        error: {
          message: error.message,
          details: error.details,
          hint: error.hint,
          code: error.code,
        }
      });
    }
    return res.json({
      success: true,
      data
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Caught exception while querying Supabase",
      error: {
        message: err.message,
        stack: err.stack,
        cause: err.cause ? {
          message: err.cause.message,
          code: err.cause.code,
          stack: err.cause.stack
        } : null
      }
    });
  }
});

export default router;
