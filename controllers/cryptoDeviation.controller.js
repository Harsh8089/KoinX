import Crypto from "../models/crypto.model.js";

const calculateMean = (prices) => {
    let sum = 0;
    for(let i = 0; i < prices.length; i++) {
        sum += prices[i];
    }
    return sum / prices.length;
};

const calculateStandardDeviation = (prices) => {
    const mean = calculateMean(prices);
    const squaredDifferences = prices.map(price => Math.pow(price - mean, 2));
    const meanOfSquaredDifferences = calculateMean(squaredDifferences);
    const standardDeviation = Math.sqrt(meanOfSquaredDifferences);
    return Number(standardDeviation.toFixed(2));
};


const calcuateDeviation = async(req, res) => {
    try {
        const { coin } = req.params;
        const document = await Crypto.find({id: coin}).populate('price_history').sort({ timeStamp: -1 });
    
        if(!document || document.length == 0) {
            return res.status(404).json({
                success: false,
                message: `No records found for ${coin}`
            });
        }

        let totalPriceRecords = document.price_history.length;
        if(totalPriceRecords > 100) totalPriceRecords = 100;  
        
        const recentPrices = document.price_history.slice(0, totalPriceRecords).map(record => record.price);
        const standardDeviation = calculateStandardDeviation(recentPrices);

        return res.status(200).json({
            success: true,
            data: {
                coin,
                standardDeviation,
                messsage: `Standard deviation calculated for ${totalPriceRecords} prices`
            }
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
    calcuateDeviation
}