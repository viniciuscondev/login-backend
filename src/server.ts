import 'reflect-metadata';
import { createConnection } from 'typeorm';
import express from 'express';

import router from './routes';

createConnection();

const port = process.env.PORT || 3333;

const app = express();

app.use(express.json());
app.use(router);

// eslint-disable-next-line no-console
app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));
