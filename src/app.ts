import express, { NextFunction, Response, Request } from 'express';
import dotenv from 'dotenv';
import errorHandler from './interfaces/http/api/middlewares/errorHandler';
import routes from './interfaces/http/api/routes'


dotenv.config();

const app = express();

app.use(express.json());
app.use('/api', routes);


app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  errorHandler(err, req, res, next);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
