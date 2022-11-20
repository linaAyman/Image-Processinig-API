import express from 'express';
import morgan from 'morgan';
import * as dotenv from 'dotenv';
import routes from './routes/index';
import errHandler from './middlewares/errHandler';

dotenv.config();
const PORT = process.env.PORT || 3000;

//create server instance
const app: express.Application = express();
//middleware logger
app.use(morgan('dev'));

//routing
app.use('/api', routes);

app.listen(PORT, () => {
  console.log(`Server Listening on port ${PORT}`);
});

app.use(errHandler);
export default app;
