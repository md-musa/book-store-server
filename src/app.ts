import express, { Application } from 'express';
import errorHandler from './app/middlewares/errorHandler';
import notFoundError from './app/middlewares/notFoundError';
import 'express-async-errors';

import authRoute from './app/modules/auth/auth.route';
import cookieParser from 'cookie-parser';
const app: Application = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// routes
app.use('/api/v1/auth', authRoute);
// app.use('/api/v1/cows', cowRoute);
// app.use('/api/v1/orders', orderRoute);
// app.use('/api/v1/admins', adminRoute);

app.get('/', (req, res) => {
  res.send('HELLO WORLD');
});

app.use(errorHandler);
app.use(notFoundError);

export default app;
