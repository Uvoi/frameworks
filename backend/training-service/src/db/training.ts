import { prisma } from '../../../database/prisma/client';

// Тип для данных тренировки
interface TrainingData {
  startTime: Date;
  duration: number;
  calories?: number | null;
  pulse?: number | null;
  temperature?: number | null;
  oxygen?: number | null;
}

// Функция для создания тренировки
export const createTraining = async (userId: number, trainingData: TrainingData) => {
  return prisma.training.create({
    data: {
      userId,
      startTime: trainingData.startTime,
      duration: trainingData.duration,
      calories: trainingData.calories ?? -1, // Если undefined или null, записываем 0
      pulse: trainingData.pulse ?? -1, // Если undefined или null, записываем 0
      temperature: trainingData.temperature ?? -1, // Если undefined или null, записываем 0
      oxygen: trainingData.oxygen ?? -1, // Если undefined или null, записываем 0
    },
  });
};

// Функция для получения тренировки по ID
export const getTrainingById = async (id: number) => {
  return prisma.training.findUnique({
    where: { id },
  });
};

// Функция для получения всех тренировок пользователя
export const getTrainingsByUserId = async (userId: number) => {
  return prisma.training.findMany({
    where: { userId },
    orderBy: { startTime: 'asc' },
  });
};

// Генерация случайных значений для прошедших тренировок
const generateRandomValue = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Экспортируем fillRandomValues
export const fillRandomValues = async (training: any) => {
  const now = new Date();
  const endTime = new Date(training.startTime);
  endTime.setHours(endTime.getHours() + training.duration);

  if (endTime < now) {
    const updates: any = {};
    if (training.calories === null || training.calories === -1) updates.calories = generateRandomValue(0, 1000);
    if (training.pulse === null || training.pulse === -1) updates.pulse = generateRandomValue(60, 200);
    if (training.temperature === null || training.temperature === -1) updates.temperature = generateRandomValue(35, 40);
    if (training.oxygen === null || training.oxygen === -1) updates.oxygen = generateRandomValue(90, 100);

    if (Object.keys(updates).length > 0) {
      return await prisma.training.update({
        where: { id: training.id },
        data: updates,
      });
    }
  }
  return training;
};

// Функция для получения тренировок с заполнением случайных значений
export const getTrainingsWithRandomValues = async (userId: number) => {
  const trainings = await getTrainingsByUserId(userId);
  return Promise.all(trainings.map(training => fillRandomValues(training)));
};