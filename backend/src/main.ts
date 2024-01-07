import cors from 'cors';
import express from 'express';
import { config } from './config';
import { employeesRouter } from './employees';
import { errorHandler, notFound } from './lib/middlewares';
import { storesRouter } from './stores';

const app = express();

app.use(cors());

app.use('/employees', employeesRouter);

app.use('/stores', storesRouter);

app.use(notFound);

app.use(errorHandler);

app.listen(config.PORT, () => console.log(`✅ Server is running on port ${config.PORT}`));
