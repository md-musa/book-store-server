import dotenv from 'dotenv';
import path from 'path';

const NODE_ENV: string = process.env.NODE_ENV?.trim() === 'development' ? 'development' : 'production';
dotenv.config({ path: path.join(process.cwd(), `${NODE_ENV}.env`) });

export default {
  node_env: process.env.NODE_ENV,
  port: process.env.PORT,

  database_url: process.env.DATABASE_URL,
  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,

  jwt: {
    access_token_secret: process.env.JWT_ACCESS_TOKEN_SECRET,
    access_token_expires_in: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN,

    refresh_token_secret: process.env.JWT_REFRESH_TOKEN_SECRET,
    refresh_token_expires_in: process.env.JWT_REFRESH_TOKEN_SECRET_IN,
  },
};
