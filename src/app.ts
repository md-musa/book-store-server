import express, { Application } from 'express';
import errorHandler from './app/middlewares/errorHandler';
import notFoundError from './app/middlewares/notFoundError';
import 'express-async-errors';
import userRoute from './app/modules/user/user.route';
import cowRoute from './app/modules/cow/cow.route';
import orderRoute from './app/modules/order/order.route';
import adminRoute from './app/modules/admin/admin.route';
import authRoute from './app/modules/auth/auth.route';
import cookieParser from "cookie-parser";
const app: Application = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// routers
// app.use("/api/v1/auth", authRoute);
// app.use('/api/v1/users', userRoute);
// app.use('/api/v1/cows', cowRoute);
// app.use('/api/v1/orders', orderRoute);
// app.use('/api/v1/admins', adminRoute);

app.get("/", (req, res) => {
    res.send("HELLO WORLD")
})

app.use(errorHandler);
app.use(notFoundError);

export default app;
