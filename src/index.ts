import "reflect-metadata";
import dotenv from "dotenv";
dotenv.config();

import express, { Express, Request, Response, NextFunction } from "express";
import cors from "cors";
import { AppDataSource } from "./data-source";
import didRoutes from "./routes/did.routes";

// Initialize express app
const app: Express = express();
const PORT = process.env.PORT || 3000;

// Create new user instance
let corsOptions = {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: false,
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/did", didRoutes);

// Root route
app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Welcome to the Ezrah Credentials Demo API" });
});

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    message: "Something went wrong!",
    error: err.message,
  });
});

// Initialize the database connection

// AppDataSource.initialize()
//   .then(() => {
//     console.log("Data Source has been initialized!");
//
//     // Start the server
//     app.listen(PORT, () => {
//       console.log(`Server is running on port ${PORT}`);
//     });
//   })
//   .catch((err) => {
//     console.error("Error during Data Source initialization:", err);
//   });

const startServer = async () => {
  try {
    await AppDataSource.initialize();
    console.log("Data Source has been initialized!");

    app.listen(PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Error during Data Source initialization:", err);
    process.exit(1);
  }
};

startServer();

// The main entry point is handled in app.ts
// This file simply imports the app to ensure all initialization happens
