import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "../swagger";
import authRoutes from "./routes/auth.routes";
import dotenv from 'dotenv';
import { corsMiddleware } from './middleware/auth.cors.middleware';

dotenv.config();

const app = express();

// Middleware
app.use(express.json()); 
app.use(corsMiddleware); 

// Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Роуты
app.use("/api/auth", authRoutes);

const PORT = 3001;
app.listen(PORT, () => console.log("Auth service running on http://localhost:3001"));