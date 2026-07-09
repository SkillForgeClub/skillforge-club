import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, ".env") });

import dns from "dns";
dns.setDefaultResultOrder("ipv4first");
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";

import authRoutes from "./routes/auth.js";
import eventRoutes from "./routes/events.js";
import memberRoutes from "./routes/members.js";
import projectRoutes from "./routes/projects.js";
import contactRoutes from "./routes/contact.js";
import announcementRoutes from "./routes/announcements.js";
import registrationRoutes from "./routes/registrations.js";
import teamRoutes from "./routes/team.js";
import studentRoutes from "./routes/student.js";
import mentorRoutes from "./routes/mentor.js";
import assignmentRoutes from "./routes/assignments-updated.js";
import messageRoutes from "./routes/messages.js";
import indexRoutes from "./routes/index.js";

import { sanitizeInput } from "./middleware/sanitize.js";
import { AppError, ValidationError } from "./utils/errors.js";

const app = express();
const PORT = process.env.PORT || 5000;
const SELF_URL = process.env.RENDER_EXTERNAL_URL || "https://skillforge-backend-o793.onrender.com";

// ─── Swagger Documentation ────────────────────────────────────────────────────
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'SkillForge Club API',
      version: '1.0.0',
      description: 'Complete REST API for SkillForge Club management system',
      contact: {
        name: 'SkillForge Team',
        email: 'support@skillforge.club',
      },
    },
    servers: [
      {
        url: `http://localhost:${PORT}/api`,
        description: 'Development server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// ─── Security & Middleware ────────────────────────────────────────────────────
app.use(helmet());
app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (mobile apps, curl, server-to-server)
    if (!origin) return callback(null, true);
    // Allow all localhost variants for development
    if (/^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin)) return callback(null, true);
    // Allow all Vercel deployments
    if (/\.vercel\.app$/.test(origin)) return callback(null, true);
    // Allow custom domains set via env
    const allowed = (process.env.ALLOWED_ORIGINS || "").split(",").map(s => s.trim()).filter(Boolean);
    if (allowed.includes(origin)) return callback(null, true);
    return callback(null, true); // permissive fallback — restrict if needed
  },
  credentials: true,
}));
app.use(morgan("dev"));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(sanitizeInput);

// Rate limiting
const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 1000,
  message: { error: "Too many requests, please try again later." },
});
app.use("/api/", limiter);

// Stricter limiter for auth routes
const authLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 1000,
  message: { error: "Too many auth attempts, please try again later." },
});
app.use("/api/auth/", authLimiter);

// ─── Static Files (uploads) ───────────────────────────────────────────────────
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ─── Routes ───────────────────────────────────────────────────────────────────
app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/members", memberRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/announcements", announcementRoutes);
app.use("/api/registrations", registrationRoutes);
app.use("/api/team", teamRoutes);
app.use("/api/student", studentRoutes);
app.use("/api/mentor", mentorRoutes);
app.use("/api/assignments", assignmentRoutes);
app.use("/api/messages",    messageRoutes);
app.use("/api",             indexRoutes);


// ─── Health Check ─────────────────────────────────────────────────────────────
/**
 * @swagger
 * /health:
 *   get:
 *     summary: Health check endpoint
 *     tags: [System]
 *     responses:
 *       200:
 *         description: Service is healthy
 */
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    service: "SkillForge API",
    timestamp: new Date().toISOString(),
    version: "1.0.0",
  });
});

// ─── 404 Handler ─────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ error: `Route ${req.originalUrl} not found.` });
});

// ─── Global Error Handler ─────────────────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error("❌ Error:", err.stack);
  if (err.cause) {
    console.error("🔍 Error Cause:", err.cause);
  }
  
  if (err instanceof ValidationError) {
    return res.status(err.statusCode).json({
      error: err.message,
      status: err.status,
      statusCode: err.statusCode,
      details: err.errors,
    });
  }
  
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      error: err.message,
      status: err.status,
      statusCode: err.statusCode,
    });
  }

  const statusCode = err.statusCode || err.status || 500;
  res.status(statusCode).json({
    error: err.message || "Internal Server Error",
    status: `${statusCode}`.startsWith('4') ? 'fail' : 'error',
    statusCode,
    ...(process.env.NODE_ENV === "development" && { 
      stack: err.stack,
      cause: err.cause ? (err.cause.message || err.cause.toString()) : undefined
    }),
  });
});

// ─── Start ────────────────────────────────────────────────────────────────────
process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
});

process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection:", err);
});

app.listen(PORT, () => {
  console.log(`\n🚀 SkillForge API running on http://localhost:${PORT}`);
  console.log(`📚 API Docs: http://localhost:${PORT}/api-docs`);
  console.log(`📦 Environment: ${process.env.NODE_ENV || "development"}\n`);


  // ─── Keep-Alive Ping (prevents Render free tier spin-down) ────────────────
  // Render spins down free services after 15 minutes of inactivity.
  // We self-ping every 5 minutes to keep the server warm.
  if (process.env.NODE_ENV !== "development") {
    const PING_INTERVAL = 5 * 60 * 1000; // 5 minutes
    setInterval(async () => {
      try {
        const pingUrl = `${SELF_URL}/api/health`;
        const https = await import('https');
        https.get(pingUrl, (res) => {
          console.log(`[Keep-Alive] Pinged ${pingUrl} → ${res.statusCode}`);
        }).on('error', (err) => {
          console.warn(`[Keep-Alive] Ping failed:`, err.message);
        });
      } catch (err) {
        console.warn(`[Keep-Alive] Error:`, err.message);
      }
    }, PING_INTERVAL);
    console.log(`💓 Keep-alive ping enabled every 5 minutes → ${SELF_URL}/api/health`);
  }
});

export default app;






