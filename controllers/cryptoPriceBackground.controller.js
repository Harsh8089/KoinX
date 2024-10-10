import dotenv from "dotenv";
import axios from "axios";
import Crypto from "../models/crypto.model.js";
import PriceHistory from "../models/priceHistory.model.js";

dotenv.config({
    path: './.env'
})

// Task-1
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
        symbol: data.symbol,
        current_price: data.current_price,
        market_cap: data.market_cap,
        price_change_24h: data.price_change_24h,
        last_updated: data.last_updated
    };
}

const fetchCryptoPrice = async () => {
    try {
        const [btc_data, eth_data, matic_network_data] = await Promise.all([
            fetchCryptoData('bitcoin'),
            fetchCryptoData('ethereum'),
            fetchCryptoData('matic-network')
        ]);

        return {
            btc_data,
            eth_data,
            matic_network_data
        };

    } catch (error) {
        console.log(error);
        return null;
    }
}

const saveCryptoData = async () => {
    try {
        const data = await fetchCryptoPrice();
        // console.log(data);
        if(data != null) {
            const { btc_data, eth_data, matic_network_data } = data;
            const totalDocuments = await Crypto.countDocuments();
            
            if(totalDocuments == 0) {
                await Crypto.insertMany([
                    {
                        ...btc_data,
                        price_history: (await PriceHistory.create({price: btc_data.current_price}))._id
                    },
                    {
                        ...eth_data,
                        price_history: (await PriceHistory.create({price: eth_data.current_price}))._id
                    },
                    {
                        ...matic_network_data,
                        price_history: (await PriceHistory.create({price: matic_network_data.current_price}))._id
                    }
                ])
            }
            else {
                await Crypto.updateMany(
                    { id: btc_data.id }, 
                    {
                        current_price: btc_data.current_price,
                        market_cap: btc_data.market_cap,
                        price_change_24h: btc_data.price_change_24h,
                        last_updated: new Date(),
                        $push: { 
                            price_history: (await PriceHistory.create({ price: btc_data.current_price }))._id 
                        }
                    }
                );

                await Crypto.updateMany(
                    { id: eth_data.id }, 
                    {
                        current_price: eth_data.current_price,
                        market_cap: eth_data.market_cap,
                        price_change_24h: eth_data.price_change_24h,
                        last_updated: new Date(),
                        $push: { 
                            price_history: (await PriceHistory.create({ price: eth_data.current_price }))._id 
                        }
                    }
                );

                await Crypto.updateMany(
                    { id: matic_network_data.id }, 
                    {
                        current_price: matic_network_data.current_price,
                        market_cap: matic_network_data.market_cap,
                        price_change_24h: matic_network_data.price_change_24h,
                        last_updated: new Date(),
                        $push: { 
                            price_history: (await PriceHistory.create({ price: matic_network_data.current_price }))._id 
                        }
                    }
                );
            }
        }
        console.log('Crypto data saved successfully!');
    } catch (error) {
        console.log(error);
    }
}

export {
    saveCryptoData
}