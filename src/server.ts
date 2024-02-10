import express, { response } from 'express';
import { userRoutes } from './routes/use.routes';
import { videoRoutes } from './routes/video.routes';

const app = express();

app.use(express.json());
app.use('/user', userRoutes)
app.use('/video', videoRoutes)


app.listen(4000);