import axios, { AxiosResponse } from "axios";
import {jwtDecode} from "jwt-decode";

const API_URL = "http://localhost:3001/api/auth";


interface AuthResponse {
  token: string;
  user?: any;
}

interface CustomErrorResponse {
  status: number;
  message?: string;
}

type ApiResponse = AxiosResponse<AuthResponse> | CustomErrorResponse | { status: number };

export const registerUser = async (username: string, email: string, password: string): Promise<ApiResponse> => {
  try {
    console.log(username, "-", email, "-", password);
    const response = await axios.post<AuthResponse>(`${API_URL}/register`, {
      username,
      email,
      password,
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

export const loginUser = async (email: string, password: string): Promise<ApiResponse> => {
  try {
    const response = await axios.post<AuthResponse>(`${API_URL}/login`, {
      email,
      password,
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


export interface TokenPayload {
  id: number;
  email: string;
  username: string;
  exp: number;
  iat: number;
}

export const getUserFromToken = (token: string): TokenPayload | null => {
  try {
    return jwtDecode<TokenPayload>(token);
  } catch {
    return null;
  }
};
