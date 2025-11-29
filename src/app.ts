import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import dotenv from "dotenv";
import routes from "./routes";
import { ApiError } from "./utils/ApiError";
import { ApiResponse } from "./utils/ApiResponse";

dotenv.config();

const app: Application = express();

// Middlewares
app.use(cors());
app.use(express.json());



// Routes
app.use("/api", routes);

app.use((req: Request, res: Response, next: NextFunction) => {
  const error = new ApiError(404, `Not found - ${req.originalUrl}`);
  next(error);
});

app.use(
  (err: any, req: Request, res: Response, next: NextFunction) => {
    const status = err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    if (process.env.NODE_ENV !== "production") {
      console.error(err);
    }

    const response = new ApiResponse(false, message);

    res.status(status).json(response);
  }
);

export default app;
