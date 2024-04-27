import cors from 'cors';
import express, { json } from 'express';
import morgan from 'morgan';
import { errorHandler, notFound } from './common/middlewares';
import { config } from './config';
import { employeesRouter } from './employees/employees.router';
import { employersRouter } from './employers/employers.router';
import { notesRouter } from './notes/notes.router';
import { reportRouter } from './report/report.router';
import { storesRouter } from './stores/stores.router';
import { updateRouter } from './update/update.router';

const app = express();

app.use(cors());
app.use(json());
app.use(morgan('dev'));

app.use('/employees', employeesRouter);
app.use('/stores', storesRouter);
app.use('/employers', employersRouter);
app.use('/notes', notesRouter);
app.use('/update', updateRouter);
app.use('/report', reportRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(config.PORT, () => console.log(`✅ Server is running on port ${config.PORT}`));
