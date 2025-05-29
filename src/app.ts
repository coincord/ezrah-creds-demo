import express, { Express, Request, Response, NextFunction } from "express";
import cors from "cors";
import { AppDataSource } from "./data-source";
import userRoutes from "./routes/user.routes";

// Initialize express app
const app: Express = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/users", userRoutes);

// Root route
app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Welcome to the Ezrah Credentials Demo API" });
});

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    message: "Something went wrong!",
    error: err.message
  });
});

// Initialize the database connection
AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
    
    // Start the server
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });

export default app;

