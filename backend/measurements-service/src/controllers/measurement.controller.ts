import { Request, Response } from "express";
import { createMeasurement, getMeasurementByDate, getTodayMeasurements } from "../db/measurement";

// Контроллер для создания показателя
export const addMeasurement = async (req: Request, res: Response) => {
  const { userId, measurementData } = req.body;

  try {
    if (!userId || !measurementData) {
      res.status(400).json({ message: "Параметры userId и measurementData обязательны" });
      return;
    }

    // Извлекаем опциональную дату из measurementData
    const measurementWithDate: any = { ...measurementData };
    if (measurementWithDate.date) {
      measurementWithDate.date = new Date(measurementWithDate.date);
    }

    const newMeasurement = await createMeasurement(userId, measurementWithDate);
    res.status(201).json(newMeasurement);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Ошибка создания показателя" });
  }
};

// Контроллер для получения показателей по дате
export const getMeasurements = async (req: Request, res: Response) => {
  const { userId, date } = req.query;

  if (!userId || !date) {
    res.status(400).json({ message: "Параметры userId и date обязательны" });
    return;
  }

  try {
    const measurements = await getMeasurementByDate(Number(userId), String(date));
    res.status(200).json(measurements);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Ошибка получения показателей" });
  }
};

// Новый контроллер: получение всех измерений за сегодня
export const getTodayMeasurementsController = async (req: Request, res: Response) => {
  const { userId } = req.params; // Предполагаем, что userId передаётся в параметрах маршрута

  if (!userId) {
    res.status(400).json({ message: "Параметр userId обязателен" });
    return;
  }

  try {
    const measurements = await getTodayMeasurements(Number(userId));
    res.status(200).json(measurements);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Ошибка получения измерений за сегодня" });
  }
};