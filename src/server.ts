import mongoose from 'mongoose';
import app from './app';
import config from './config';

const connectDB = async () => {
  try {
    console.log(process.env.NODE_ENV);
    // console.log(config.database_url);

    await mongoose.connect(config.database_url as string);
    console.log('-> MongoDB Connected successfully...');

    app.listen(config.port, () => {
      console.log(`App is listening on port ${config.port}`);
    });
  } catch (err) {
    console.error(`=> Could not connected Error: ${err} `);
  }
};

connectDB();
