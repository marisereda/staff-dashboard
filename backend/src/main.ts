import cors from 'cors';
import express, { json } from 'express';
import { config } from './config';
import { employeesRouter } from './employees';
import { employersRouter } from './employers';
import { errorHandler, notFound } from './lib/middlewares';
import { storesRouter } from './stores';

const app = express();

app.use(cors());
app.use(json());

app.use('/employees', employeesRouter);
app.use('/stores', storesRouter);
app.use('/employers', employersRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(config.PORT, () => console.log(`✅ Server is running on port ${config.PORT}`));
