import mongoose from "mongoose";

const cryptoSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true 
    },
    symbol: {
        type: String,
        required: true,
        uppercase: true 
    },
    current_price: {
        type: Number,
        required: true,
    },
    price_history: [
        {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'PriceHistory' 
        }
    ],
    market_cap: {
        type: Number,
        required: true,
        min: 0 
    },
    last_updated: {
        type: Date,
        default: Date.now,
    }
});

const Crypto = mongoose.model('Crypto', cryptoSchema);
export default Crypto;
