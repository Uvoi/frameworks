import axios, { AxiosResponse } from "axios";
import { jwtDecode } from "jwt-decode";

const MEASUREMENTS_API_URL = "http://localhost:3002/api/measurements";

// Интерфейсы для данных измерений
interface MeasurementData {
  steps: number;
  distance: number;
  calories: number;
  pulse: number;
  sleep: number;
  temperature: number;
  oxygen: number;
  date: string;
}

interface MeasurementResponse {
  id: number;
  userId: number;
  steps: number;
  distance: number;
  calories: number;
  pulse: number;
  sleep: number;
  temperature: number;
  oxygen: number;
  date: string; // Теперь это строка в формате "1am", "2am", и т.д.
}

interface MeasurementsListResponse {
  measurements: MeasurementResponse[];
}

interface CustomErrorResponse {
  status: number;
  message?: string;
}

type ApiResponse = AxiosResponse<MeasurementResponse | MeasurementsListResponse> | CustomErrorResponse | { status: number };

// Интерфейс для токена (если требуется аутентификация)
interface TokenPayload {
  id: number;
  email: string;
  username: string;
  exp: number;
  iat: number;
}

// Функция для декодирования токена
export const getUserFromToken = (token: string): TokenPayload | null => {
  try {
    return jwtDecode<TokenPayload>(token);
  } catch {
    return null;
  }
};

// Создание нового измерения
export const createMeasurement = async (userId: number, measurementData: MeasurementData, token?: string): Promise<ApiResponse> => {
  try {
    const headers: Record<string, string> = {};
    if (token) {
      headers.Authorization = `Bearer ${token}`; // Добавляем токен, если он есть
    }

    const response = await axios.post<MeasurementResponse>(`${MEASUREMENTS_API_URL}/measurement`, {
      userId,
      measurementData,
    }, { headers });

    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        return error.response as AxiosResponse<CustomErrorResponse>;
      } else {
        return { status: 500, message: "Network error" };
      }
    }
    return { status: 469, message: "Unknown error" };
  }
};

// Получение измерений за день
export const getMeasurementsByDate = async (userId: number, date: string, token?: string): Promise<ApiResponse> => {
  try {
    const headers: Record<string, string> = {};
    if (token) {
      headers.Authorization = `Bearer ${token}`; // Добавляем токен, если он есть
    }

    const response = await axios.get<MeasurementsListResponse>(`${MEASUREMENTS_API_URL}/measurement`, {
      params: { userId, date },
      headers,
    });

    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        return error.response as AxiosResponse<CustomErrorResponse>;
      } else {
        return { status: 500, message: "Network error" };
      }
    }
    return { status: 469, message: "Unknown error" };
  }
};

// Новая функция: получение всех измерений за сегодняшний день
// Определим типы для ответов API
interface Measurement {
  id: number;
  userId: number;
  steps: number;
  distance: number;
  calories: number;
  pulse: number;
  sleep: number;
  temperature: number;
  oxygen: number;
  date: string;
}

interface MeasurementsListResponse {
  data: Measurement[];
  status: number;
  message?: string;
}

export const getTodayMeasurements = async (
  userId: number, 
  token?: string
): Promise<Measurement[]> => {
  try {
    const headers: Record<string, string> = {};
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await axios.get<Measurement[]>( // <- Изменили тип на Measurement[]
      `${MEASUREMENTS_API_URL}/today/${userId}`,
      { headers }
    );

    console.log("API Response Data:", response.data); // Проверим данные
    return response.data; // Возвращаем напрямую массив, а не response.data.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data?.message || "Network error";
      throw new Error(errorMessage);
    }
    throw new Error("Unknown error");
  }
};


// types.ts (если используете TypeScript)
export interface CounterData {
  icon: any; // Замените на конкретный тип иконки
  number: number;
  title: string;
  suffix?: string;
  color?: string;
}

interface ChartData {
  xKey: string;
  yKey: string;
  data: Record<string, string[] | number[]>;
  title: string;
  color?: string;
}

export interface ParsedData {
  counters: {
      icon: string;
      number: number;
      title: string;
      suffix?: string;
      color?: string;
  }[];
  charts: {
      xKey: string;
      yKey: string;
      data: Record<string, string[] | number[]>;
      title: string;
      color?: string;
  }[];
}

// parser.ts
export const parseHealthData = (data: any[]): ParsedData => {
  // Для счетчиков берем последние данные (предполагая, что они самые актуальные)
  const lastEntry = data[data.length - 1] || {};
  
  const counters: CounterData[] = [
      {
        icon: 'Footprints',
        number: lastEntry.steps || 0,
        title: 'Шаги'
      },
      {
          icon: 'Map',
          number: lastEntry.distance || 0,
          title: 'Расстояние',
          suffix: 'км',
          color: 'secondary'
      },
      {
          icon: 'Flame',
          number: lastEntry.calories || 0,
          title: 'Калории',
          color: 'secondary'
      },
      {
          icon: 'HeartPulse',
          number: lastEntry.pulse || 0,
          title: 'Пульс'
      },
      {
          icon: 'Moon',
          number: lastEntry.sleep || 0,
          title: 'Сон',
          suffix: 'ч',
          color: 'secondary'
      },
      {
          icon: 'Thermometer',
          number: lastEntry.temperature || 0,
          title: 'Температура',
          suffix: '°'
      },
      {
          icon: 'Droplet',
          number: lastEntry.oxygen || 0,
          title: 'Кислород',
          suffix: '%'
      }
  ];

  // Для графиков собираем все данные
  const timeData = data.map(item => item.date);
  
  const charts: ChartData[] = [
    {
      xKey: 'Время',
      yKey: 'Шаги',
      data: {
        'Время': timeData,
        'Шаги': data.map(item => Number(item.steps))
      },
      title: 'Шаги'
    },
    {
      xKey: 'Время',
      yKey: 'Расстояние',
      data: {
        'Время': timeData,
        'Расстояние': data.map(item => Number(item.distance))
      },
      title: 'Расстояние'
    },
    {
      xKey: 'Время',
      yKey: 'Калории',
      data: {
        'Время': timeData,
        'Калории': data.map(item => Number(item.calories))
      },
      title: 'Калории',
      color: 'secondary'
    },
    {
      xKey: 'Время',
      yKey: 'Пульс',
      data: {
        'Время': timeData,
        'Пульс': data.map(item => Number(item.pulse))
      },
      title: 'Пульс'
    }
  ];

  return { counters, charts };
};