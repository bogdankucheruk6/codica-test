import express, {Application} from 'express';
import dotenv from 'dotenv';
import expressWinston from 'express-winston';
import cors from 'cors';
import router from './routes/index'; 
import sequelize from './db';
import errorHandler from './middleware/errorHandlingMiddleware';
import logger from './helpers/logger';

dotenv.config();

const app: Application = express();
const PORT: string = process.env.PORT || '8080';

app.use(expressWinston.logger({
    winstonInstance: logger,
    statusLevels: true
}))

app.use(cors());
app.use(express.json());
app.use('/api', router);
app.use(errorHandler);

const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        app.listen(PORT, () => console.log(`Server has been started on PORT = ${PORT}`));
    } catch (e) {
        console.log(e);
    }
}

start().catch(err => console.log(' APPLICATION UNCAUGHT EXCEPTION \r\n ', err));