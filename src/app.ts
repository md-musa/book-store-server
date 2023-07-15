import 'express-async-errors';
import express, { Application } from 'express';
import cookieParser from 'cookie-parser';

import errorHandler from './app/middlewares/errorHandler';
import notFoundError from './app/middlewares/notFoundError';

import authRoute from './app/modules/auth/auth.route';
import bookRoute from './app/modules/book/book.route';
import wishListRoute from './app/modules/wishlist/wishlist.route';
import readingList from './app/modules/readingList/readingList.route';

const app: Application = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// routes
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/books', bookRoute);
app.use('/api/v1/wishlists', wishListRoute);
app.use('/api/v1/readingLists', readingList);
app.get('/', (req, res) => {
  res.send('HELLO WORLD');
});

app.use(errorHandler);
app.use(notFoundError);

export default app;
