import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Определим тип состояния для токена
interface AuthState {
  token: string | null;
}

const initialState: AuthState = {
  token: null, // Изначально нет токена
};

// Создаем слайс для управления состоянием токена
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Редьюсер для установки токена
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    // Редьюсер для удаления токена (например, при выходе из системы)
    removeToken: (state) => {
      state.token = null;
    },
  },
});

// Экспорты действий
export const { setToken, removeToken } = authSlice.actions;

// Экспорт редьюсера
export default authSlice.reducer;
