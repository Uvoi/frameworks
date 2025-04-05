import express from 'express';
import { createTrainingController, getTrainingByIdController, getUserTrainingsController } from '../controllers/training.controller';

const router = express.Router();

/**
 * @openapi
 * /api/trainings:
 *   post:
 *     summary: Create a new training session
 *     tags:
 *       - Trainings
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - startTime
 *               - duration
 *             properties:
 *               userId:
 *                 type: number
 *               startTime:
 *                 type: string
 *                 format: date-time
 *               duration:
 *                 type: number
 *               calories:
 *                 type: number
 *               pulse:
 *                 type: number
 *               temperature:
 *                 type: number
 *               oxygen:
 *                 type: number
 *     responses:
 *       201:
 *         description: Training created successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 */
router.post('/', createTrainingController);

/**
 * @openapi
 * /api/trainings/{id}:
 *   get:
 *     summary: Get a training by ID with random values for past sessions
 *     tags:
 *       - Trainings
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: number
 *         required: true
 *         description: Training ID
 *     responses:
 *       200:
 *         description: Training details with random values if past
 *       404:
 *         description: Training not found
 *       500:
 *         description: Server error
 */
router.get('/:id', getTrainingByIdController);

/**
 * @openapi
 * /api/trainings/user/{userId}:
 *   get:
 *     summary: Get all trainings for a user with random values for past sessions
 *     tags:
 *       - Trainings
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: number
 *         required: true
 *         description: User ID
 *     responses:
 *       200:
 *         description: List of trainings with random values for past sessions
 *       500:
 *         description: Server error
 */
router.get('/user/:userId', getUserTrainingsController);

export default router;