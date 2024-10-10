import dotenv from "dotenv";
import axios from "axios";

dotenv.config({
    path: './.env'
})

// Task-2
const fetchCryptoData = async (id) => {
    const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
        params: {
            vs_currency: 'usd',
            ids: id
        },
        headers: {
            'accept': 'application/json',
            'x-cg-demo-api-key': process.env.COINGECKO_API_KEY
        }
    });
    const data = response.data[0];
    return {
        id: data.id,
        price: data.current_price,
        marketCap: data.market_cap,
        "24hChange": data.price_change_24h,
        last_updated: data.last_updated
    };
}

const fetchCryptoPrice = async (req, res) => {
    try {   
        const { coin } = req.params;
        const data = await fetchCryptoData(coin);

        return res.status(200).json ({
            success: true,
            data: data   
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json ({
            success: false,
            message: 'Internal Server Error',
            error
        });
    }
}

export {
    fetchCryptoPrice
}