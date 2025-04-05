import cors, { CorsOptions } from 'cors';

const corsOptions: CorsOptions = {
  // origin: 'http://localhost:3000', // Точно совпадает с фронтендом
  // methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Добавь OPTIONS
  credentials: true,
  // allowedHeaders: ['Authorization', 'Content-Type', 'Accept'],
  optionsSuccessStatus: 200,
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['*'],
};

export const corsMiddleware = cors(corsOptions);