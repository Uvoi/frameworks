import axios, { AxiosResponse } from 'axios';

const TRAINING_API_URL = 'http://localhost:3003/api/trainings';

// Интерфейсы для данных тренировки
interface TrainingData {
  startTime: string; // Используем string для совместимости с JSON
  duration: number;
  calories?: number | null;
  pulse?: number | null;
  temperature?: number | null;
  oxygen?: number | null;
}

interface TrainingResponse {
  id: number;
  userId: number;
  startTime: string;
  duration: number;
  calories: number | null;
  pulse: number | null;
  temperature: number | null;
  oxygen: number | null;
}

interface TrainingsListResponse {
  trainings: TrainingResponse[];
}

interface CustomErrorResponse {
  status: number;
  message?: string;
}

export type ApiResponse = AxiosResponse<TrainingResponse | TrainingResponse[]> | CustomErrorResponse | { status: number };

// Интерфейс для токена (если требуется аутентификация)
interface TokenPayload {
  id: number;
  email: string;
  username: string;
  exp: number;
  iat: number;
}


// Создание новой тренировки
export const createTraining = async (
  userId: number,
  trainingData: TrainingData,
  token?: string
): Promise<ApiResponse> => {
  try {
    const headers: Record<string, string> = {};
    if (token) {
      headers.Authorization = `Bearer ${token}`; // Добавляем токен, если он есть
    }

    const response = await axios.post<TrainingResponse>(
      `${TRAINING_API_URL}`,
      {
        userId,
        ...trainingData,
      },
      { headers }
    );

    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        return error.response as AxiosResponse<CustomErrorResponse>;
      } else {
        return { status: 500, message: 'Network error' };
      }
    }
    return { status: 469, message: 'Unknown error' };
  }
};

// Получение тренировки по ID
export const getTrainingById = async (id: number, token?: string): Promise<ApiResponse> => {
  try {
    const headers: Record<string, string> = {};
    if (token) {
      headers.Authorization = `Bearer ${token}`; // Добавляем токен, если он есть
    }

    const response = await axios.get<TrainingResponse>(`${TRAINING_API_URL}/${id}`, {
      headers,
    });

    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        return error.response as AxiosResponse<CustomErrorResponse>;
      } else {
        return { status: 500, message: 'Network error' };
      }
    }
    return { status: 469, message: 'Unknown error' };
  }
};

// Получение всех тренировок пользователя
export const getUserTrainings = async (userId: number, token?: string): Promise<ApiResponse> => {
  try {
    const headers: Record<string, string> = {};
    if (token) {
      headers.Authorization = `Bearer ${token}`; // Добавляем токен, если он есть
    }

    const response = await axios.get<TrainingResponse[]>(`${TRAINING_API_URL}/user/${userId}`, {
      headers,
    });

    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        return error.response as AxiosResponse<CustomErrorResponse>;
      } else {
        return { status: 500, message: 'Network error' };
      }
    }
    return { status: 469, message: 'Unknown error' };
  }
};