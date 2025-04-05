import { prisma } from "../../../database/prisma/client";

// Тип для данных измерений
interface MeasurementData {
  steps: number;
  distance: number;
  calories: number;
  pulse: number;
  sleep: number;
  temperature: number;
  oxygen: number;
  date?: Date; // Сделали дату опциональной
}

// Функция для создания показателя с опциональной датой
export const createMeasurement = async (userId: number, measurementData: MeasurementData) => {
  const today = new Date();
  today.setHours(today.getHours());
  return prisma.measurement.create({
    data: {
      userId: userId,
      ...measurementData,
      date: measurementData.date || today, // Если дата не указана, используем текущую
    },
  });
};

// Функция для получения показателей по userId и дате
export const getMeasurementByDate = async (userId: number, date: string) => {
  return prisma.measurement.findMany({
    where: {
      userId: userId,
      date: {
        gte: new Date(`${date}T00:00:00Z`),
        lt: new Date(`${date}T23:59:59Z`),
      },
    },
  });
};

// Новая функция: получение всех измерений за сегодняшний день, отсортированных по времени
export const getTodayMeasurements = async (userId: number) => {
  const today = new Date();
  today.setHours(today.getHours() + 3); // Корректируем на UTC+3
  today.setUTCHours(0, 0, 0, 0); // Устанавливаем начало дня в UTC
  // console.log(today)
  
  const tomorrow = new Date(today);
  tomorrow.setHours(tomorrow.getHours() + 3); // Корректируем на UTC+3
  tomorrow.setDate(today.getDate() + 1);
  // console.log(tomorrow)

  const measurements = await prisma.measurement.findMany({
    where: {
      userId: userId,
      date: {
        gte: today,
        lt: tomorrow,
      },
    },
    orderBy: {
      date: 'asc', // Сортировка по возрастанию времени
    },
  });

  const formattedMeasurements = measurements.map(measurement => ({
    ...measurement,
    date: formatTime(measurement.date), // Функция форматирования времени
  }));

  return formattedMeasurements;
};

// Вспомогательная функция для форматирования времени
function formatTime(date: Date): string {
  // console.log(date, ' --');
  const hours = date.getUTCHours(); // Используем UTC-часы
  // console.log(hours);
  const period = hours >= 12 ? 'pm' : 'am';
  const hour12 = hours % 12 || 12; // Конвертируем в 12-часовой формат
  // console.log(`${hour12}${period}`.toLowerCase());
  return `${hour12}${period}`.toLowerCase();
}