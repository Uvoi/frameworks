# Используем официальный Node.js
FROM node:18

# Создаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем исходники
COPY . .

# Сборка Next.js
RUN npm run build
