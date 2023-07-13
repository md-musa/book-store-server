import dotenv from 'dotenv';
import path from 'path';

const nodeEnv: string = process.env.NODE_ENV === 'development' ? 'development' : 'production';
// test nodeEnv

dotenv.config({ path: path.join(process.cwd(), `${nodeEnv}.env`) });

export default {
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
  jwt: {
    secret: process.env.JWT_SECRET,
    refresh_secret: process.env.JWT_EXPIRES_IN,
    expires_in: process.env.JWT_REFRESH_SECRET,
    refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN,
  },
};
