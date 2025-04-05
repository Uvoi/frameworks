// src/services/measurement.service.ts
import { prisma } from "../../../database/prisma/client";

export const getMeasurementsForToday = async (userId: number) => {
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0); // начало сегодняшнего дня

  const todayEnd = new Date();
  todayEnd.setHours(23, 59, 59, 999); // конец сегодняшнего дня

  return prisma.measurement.findMany({
    where: {
      userId,
      date: {
        gte: todayStart,
        lte: todayEnd,
      },
    },
    orderBy: {
      date: 'asc', // Сортировка по возрастанию времени
    },
  });
};

export const createMeasurement = async (
  userId: number,
  steps: number,
  distance: number,
  calories: number,
  pulse: number,
  sleep: number,
  temperature: number,
  oxygen: number,
  date?: Date // Опциональная дата
) => {
  return prisma.measurement.create({
    data: {
      userId,
      steps,
      distance,
      calories,
      pulse,
      sleep,
      temperature,
      oxygen,
      date: date || new Date(), // Если дата не указана, используем текущую
    },
  });
};

// Импортируем новую функцию из db/measurement.ts
import { getTodayMeasurements } from "../db/measurement";

export { getTodayMeasurements };