import express, { Express, Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import db from './db/models';
import router from './routes';
import cors from 'cors';
import errorHandler from './middleware/error-handler';

dotenv.config();

const app: Express = express();

// Log each incoming request
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.use(express.json());
app.use(
  cors({
    origin: "https://frontend-one-mocha.vercel.app", // Replace with your frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.options('*', cors()); // Handle preflight requests

const port: number = 8080;

app.use(router);
app.use(errorHandler);

db.sequelize.sync().then(() => {
  console.log('Database synced successfully.');
}).catch((error) => {
  console.error('Error syncing database:', error);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

export default app;
