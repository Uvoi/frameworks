import express from 'express';
import { addMeasurement, getMeasurements, getTodayMeasurementsController } from "../controllers/measurement.controller";

const router = express.Router();

/**
 * @openapi
 * /api/measurements/measurement:
 *   post:
 *     summary: Создание нового измерения
 *     tags:
 *       - Measurements
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - measurementData
 *             properties:
 *               userId:
 *                 type: number
 *                 description: ID пользователя
 *               measurementData:
 *                 type: object
 *                 properties:
 *                   steps:
 *                     type: number
 *                   distance:
 *                     type: number
 *                   calories:
 *                     type: number
 *                   pulse:
 *                     type: number
 *                   sleep:
 *                     type: number
 *                   temperature:
 *                     type: number
 *                   oxygen:
 *                     type: number
 *                   date:
 *                     type: string
 *                     format: date-time
 *                     description: Опциональная дата измерения (если не указана, используется текущая)
 *                 required:
 *                   - steps
 *                   - distance
 *                   - calories
 *                   - pulse
 *                   - sleep
 *                   - temperature
 *                   - oxygen
 *     responses:
 *       201:
 *         description: Измерение успешно создано
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MeasurementResponse'
 *       400:
 *         description: Ошибка валидации
 *       500:
 *         description: Серверная ошибка
 */

/**
 * @openapi
 * /api/measurements/measurement:
 *   get:
 *     summary: Получение измерений за день
 *     tags:
 *       - Measurements
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: userId
 *         schema:
 *           type: number
 *         required: true
 *         description: ID пользователя
 *       - in: query
 *         name: date
 *         schema:
 *           type: string
 *         required: true
 *         description: Дата в формате YYYY-MM-DD
 *     responses:
 *       200:
 *         description: Список измерений
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/MeasurementResponse'
 *       400:
 *         description: Ошибка валидации
 *       500:
 *         description: Серверная ошибка
 */

/**
 * @openapi
 * /api/measurements/today/{userId}:
 *   get:
 *     summary: Получение всех измерений за сегодняшний день
 *     tags:
 *       - Measurements
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: number
 *         required: true
 *         description: ID пользователя
 *     responses:
 *       200:
 *         description: Список измерений за сегодня
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: number
 *                   userId:
 *                     type: number
 *                   steps:
 *                     type: number
 *                   distance:
 *                     type: number
 *                   calories:
 *                     type: number
 *                   pulse:
 *                     type: number
 *                   sleep:
 *                     type: number
 *                   temperature:
 *                     type: number
 *                   oxygen:
 *                     type: number
 *                   date:
 *                     type: string
 *                     description: Время в формате "1am, 2am, ..., 12pm, ..., 9pm"
 *       400:
 *         description: Ошибка валидации
 *       500:
 *         description: Серверная ошибка
 */

router.post("/measurement", addMeasurement);
router.get("/measurement", getMeasurements);
router.get("/today/:userId", getTodayMeasurementsController);

export default router;