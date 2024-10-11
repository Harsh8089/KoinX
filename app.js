import cors from 'cors';
import express from 'express';

const app = express();

app.use(cors());
app.use(express.json());

// Task-1
import { saveCryptoData } from './controllers/cryptoPriceBackground.controller.js';
setInterval(saveCryptoData, 2*60*60*1000); // saveCryptoData will be called at every 2 hr gap.

saveCryptoData();

// Task-2
import statsRouter from './routes/getCryptoData.route.js';
app.use("/api/v1", statsRouter);

// Task-2
import deviationRouter from './routes/getDeviation.route.js';
app.use('/api/v1', deviationRouter);

export { app }
