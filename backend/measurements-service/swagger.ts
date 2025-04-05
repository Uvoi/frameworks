import swaggerJSDoc from "swagger-jsdoc";

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Measurements Service API",
      version: "1.0.0",
      description: "Документация для микросервиса с показателями",
    },
    servers: [
      {
        url: "http://localhost:3002/api",
      },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        MeasurementResponse: {
          type: "object",
          properties: {
            id: { type: "number" },
            userId: { type: "number" },
            steps: { type: "number" },
            distance: { type: "number" },
            calories: { type: "number" },
            pulse: { type: "number" },
            sleep: { type: "number" },
            temperature: { type: "number" },
            oxygen: { type: "number" },
            date: { type: "string" },
          },
          required: ["id", "userId", "steps", "distance", "calories", "pulse", "sleep", "temperature", "oxygen", "date"],
        },
      },
    },
  },
  apis: ["./src/routes/*.ts", "./src/controllers/*.ts"],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;