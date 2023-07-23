import 'express-async-errors';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import express, { Application } from 'express';

import errorHandler from './app/middlewares/errorHandler';
import notFoundError from './app/middlewares/notFoundError';
import authRoute from './app/modules/auth/auth.route';
import bookRoute from './app/modules/book/book.route';
import wishListRoute from './app/modules/wishlist/wishlist.route';
import readingListRoute from './app/modules/readingList/readingList.route';

const app: Application = express();

// var corsOptions = {
//   origin: 'http://localhost:5173',
//   optionsSuccessStatus: 200,
// };

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  console.log(req.url);
  next();
});

// routes
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/books', bookRoute);
app.use('/api/v1/wishlists', wishListRoute);
app.use('/api/v1/readingLists', readingListRoute);
app.get('/', (req, res) => res.send('HELLO WORLD'));

app.use(errorHandler);
app.use(notFoundError);

export default app;
