import { Sequelize } from "sequelize-typescript";
import env from "./env.config";

// Ensure all necessary environment variables are defined
const {
  NODE_ENV,
  DATABASE,
  USER,
  PASSWORD,
  DB_HOST,
  DB_PORT,
  DATABASE_URL,
  ACCESS_TOKEN_SECRET,
} = env;

if (!NODE_ENV || !DATABASE || !USER || !PASSWORD || !DB_HOST || !DB_PORT || !DATABASE_URL) {
  throw new Error("Missing required environment variables");
}

const sequelize = 
  NODE_ENV === "test" || NODE_ENV === "development"
    ? new Sequelize(DATABASE, USER, PASSWORD, {
        host: DB_HOST,
        port: Number(DB_PORT),
        dialect: 'postgres',
        logging: false,
      })
    : new Sequelize(DATABASE_URL, {
        dialect: "postgres",
        dialectOptions: {
          ssl: {
            require: true,
            rejectUnauthorized: false,
          },
        },
      });

export default sequelize;
