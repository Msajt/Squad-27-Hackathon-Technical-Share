//! Importando express
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import cors from 'cors';
//! Importando routers da API
import api from './routes/api';
import swaggerFile from './swagger.json';
//! Definindo app
const app = express();

//? Análise dos JSONs vindos
app.use(express.json());
app.use(cors());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

//? Routers
app.use('/', api);

//! Exportando app.ts
export = app;