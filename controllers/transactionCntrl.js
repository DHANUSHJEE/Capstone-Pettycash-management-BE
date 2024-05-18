import transactionModel from "../models/transactionModel.js";
import mongoose from "mongoose";
import moment from "moment";



export const addTransaction = async (req, res) => {
    try {
        
        const newTransaction = new transactionModel(req.body);
        // Save new transaction
        await newTransaction.save();

        // Respond with success message and new transaction
        res.status(201).send("Transaction created");
    } catch (error) {
        console.error("Error in adding transaction:", error);
        res.status(500).json({ message: "Internal Server Error While Adding Transaction" });
    }
}

export const getTransaction = async (req, res) => {
    try {
        const { frequency, userid, selectedDate, type } = req.body;
        let dateFilter = {};

       
        if (frequency === 'all') {
            // All time
            dateFilter = {
                $gt: moment().subtract(365, 'days').toDate(),
            };

        } else if (frequency === '7') {
            // Last 1 week
            dateFilter = {
                $gt: moment().subtract(7, 'days').toDate(),
            };
        }  else if (frequency === '30') {
            // Last 1 month
            dateFilter = {
                $gt: moment().subtract(1, 'months').toDate(),
            };
        } else if (frequency === '365') {
            // Last 1 year
            dateFilter = {
                $gt: moment().subtract(1, 'years').toDate(),
            };
        } else if (frequency === 'custom') {
            // Custom date range
            dateFilter = {
                $gte: moment(selectedDate[0]).toDate(),
                $lte: moment(selectedDate[1]).toDate(),
            };
        }

        const query = {
            userid,
            date: dateFilter
        };

        if (type !== 'all') {
            query.type = type;
        }

        const transactions = await transactionModel.find(query);

        res.status(200).send({ message: "Transactions fetched successfully", transactions });
    } catch (error) {
        res.status(500).send({ message: "Error occurred when getting transaction", error });
    }
};


export const deleteTransaction = async (req, res) => {
    try {
        await transactionModel.findOneAndDelete({ _id: req.body.transactionId });
        res.status(200).json({ message: "Transaction deleted successfully" });
    } catch (error) {
        console.error("Error occurred when deleting transaction:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const editTransaction = async (req, res) => {
    try {
        await transactionModel.findOneAndUpdate({ _id: req.body.transactionId }, req.body.payload);
        res.status(200).json({ message: "Transaction updated successfully" });
    } catch (error) {
        console.log("Error occured in edit transaction",error);
        res.status(500).json('internal server error')
    }
}
