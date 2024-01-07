import cors from 'cors';
import express from 'express';
import { config } from './config';
import { errorHandler, notFound } from './middlewares';
import { employeesRouter } from './routes';

const app = express();

app.use(cors());

app.use('/employees', employeesRouter);

app.use(notFound);

app.use(errorHandler);

app.listen(config.PORT, () => console.log(`✅ Server is running on port ${config.PORT}`));
