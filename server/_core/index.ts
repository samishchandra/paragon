import "dotenv/config";
import express from "express";
import { createServer } from "http";
import net from "net";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { registerOAuthRoutes } from "./oauth";
import { appRouter } from "../routers";
import dataRouter from "../dataRouter";
import aiRouter from "../aiRouter";
import { createContext } from "./context";
import { serveStatic, setupVite } from "./vite";

function isPortAvailable(port: number): Promise<boolean> {
  return new Promise(resolve => {
    const server = net.createServer();
    server.listen(port, () => {
      server.close(() => resolve(true));
    });
    server.on("error", () => resolve(false));
  });
}

async function findAvailablePort(startPort: number = 3000): Promise<number> {
  for (let port = startPort; port < startPort + 20; port++) {
    if (await isPortAvailable(port)) {
      return port;
    }
  }
  throw new Error(`No available port found starting from ${startPort}`);
}

async function startServer() {
  const app = express();
  const server = createServer(app);
  // Configure body parser with larger size limit for file uploads
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));
  // OAuth callback under /api/oauth/callback
  registerOAuthRoutes(app);
  // Data REST API
  app.use('/api/data', dataRouter);
  // AI API (streaming + completions)
  app.use('/api/ai', aiRouter);
  // Image upload endpoint (multipart form data → S3)
  const multer = (await import('multer')).default;
  const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 10 * 1024 * 1024 } });
  app.post('/api/images/upload', upload.single('file'), async (req, res) => {
    try {
      const file = (req as any).file;
      if (!file) { res.status(400).json({ error: 'No file provided' }); return; }
      const { storagePut } = await import('../storage');
      const date = new Date().toISOString().slice(0, 10);
      const random = Math.random().toString(36).substring(2, 10);
      const ext = (file.originalname || 'image.png').split('.').pop()?.toLowerCase() || 'png';
      const key = `images/${date}_${random}.${ext}`;
      const { url } = await storagePut(key, file.buffer, file.mimetype);
      res.json({ url, key });
    } catch (err: any) {
      console.error('Image upload error:', err);
      res.status(500).json({ error: err.message || 'Upload failed' });
    }
  });
  // tRPC API
  app.use(
    "/api/trpc",
    createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  );
  // development mode uses Vite, production mode uses static files
  if (process.env.NODE_ENV === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  const preferredPort = parseInt(process.env.PORT || "3000");
  const port = await findAvailablePort(preferredPort);

  if (port !== preferredPort) {
    console.log(`Port ${preferredPort} is busy, using port ${port} instead`);
  }

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
