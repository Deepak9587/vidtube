import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config({ path: "src/.env" });
const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
console.log(`CORS ORIGING IS:  ${process.env.CORS_ORIGIN}`);

// common middleware
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));

// import routes
import healthcheckRouter from "./routes/healthcheck.routes.js";

// all of our routes
app.use("/api/v1/healthcheck", healthcheckRouter);
export { app };
