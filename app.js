import cors from 'cors';
import express from 'express';

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    return res.json({
        "bitcoin": {
            "/stats": "https://koinx-0jk4.onrender.com/api/v1/stats/bitcoin",
            "/deviation": "https://koinx-0jk4.onrender.com/api/v1/deviation/bitcoin"
        },
        "ethereum": {
            "/stats": "https://koinx-0jk4.onrender.com/api/v1/stats/ethereum",
            "/deviation": "https://koinx-0jk4.onrender.com/api/v1/deviation/ethereum"
        },
        "matic-network": {
            "/stats": "https://koinx-0jk4.onrender.com/api/v1/stats/matic-network",
            "/deviation": "https://koinx-0jk4.onrender.com/api/v1/deviation/matic-network"
        }
        
    })
});

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
