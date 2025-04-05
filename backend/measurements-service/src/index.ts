import express from "express";
import measurementRoutes from "./routes/measurement.routes";
import swaggerUi from "swagger-ui-express";
import dotenv from 'dotenv';
import swaggerSpec from "../swagger";
import { corsMiddleware } from "./middleware/auth.cors.middleware";

dotenv.config();
const app = express();
app.use(corsMiddleware); 
app.use(express.json());

// Подключаем маршруты
app.use("/api/measurements", measurementRoutes);

// Настраиваем Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(3002, () => console.log("Measurements service running on http://localhost:3002"));