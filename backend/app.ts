import 'dotenv/config';
import express, { Router } from 'express';
import { establishDBConnection } from './src/database/establishDBConnection';
import appRouter from './src/routes/app.route';
import cors from 'cors';

establishDBConnection();

const app = express();
app.use(express.json());
app.use(cors());

const route = (app: Router) => {
  app.use('/api/v1/user', appRouter);
};
route(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
