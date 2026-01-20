const Transaction = require('../models/Transaction');

exports.fixDates = async (req, res) => {
    try {
        // pobieram surowe dane (lean), bo mi nie updatowało
        // date jako string chociaz w modelu jest date, mało czasu mam 
        const transactions = await Transaction.find().lean();

        let count = 0;

        for (let doc of transactions) {
            if (typeof doc.date === 'string') {
                await Transaction.updateOne(
                    { _id: doc._id },
                    { $set: { date: new Date(doc.date) } }
                );
                count++;
            }
        }

        await Transaction.collection.createIndex({ category: 1 });

        res.status(200).json({
            message: "Operacja zakończona sukcesem",
            converted: count,
            optimization: "Indeks nałożony na category"
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getRevenueReport = async (req, res) => {
    try {
        const report = await Transaction.aggregate([
            { 
                $match: { status: "COMPLETED" } 
            },
            {
                $group: {
                    _id: "$category",
                    totalRevenue: { $sum: "$amount" },
                    transactionCount: { $sum: 1 }
                }
            },
            { 
                $sort: { totalRevenue: -1 } 
            }
        ]);

        res.status(200).json({
            status: "success",
            results: report.length,
            data: report
        });
    } catch (err) {
        res.status(500).json({
            status: "error",
            message: err.message
        });
    }
};