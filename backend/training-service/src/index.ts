import express from 'express';
import dotenv from 'dotenv';
import trainingRoutes from './routes/training.routes';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from '../swagger';
import { corsMiddleware } from './middleware/auth.cors.middleware';

dotenv.config();

const app = express();

app.use(corsMiddleware); 
app.use(express.json());

app.use('/api/trainings', trainingRoutes);

// Swagger setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
  console.log(`Training service running on http://localhost:${PORT}`);
});