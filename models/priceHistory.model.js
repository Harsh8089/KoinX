import mongoose from "mongoose";

const priceHistorySchema = new mongoose.Schema({
    price: {
        type: Number,
        required: true
    },
    timeStamp: {
        type: Date,
        default: Date.now 
    }
});


const PriceHistory = mongoose.model('PriceHistory', priceHistorySchema);
export default PriceHistory;
