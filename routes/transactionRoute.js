import express from "express";
import { addTransaction, getTransaction, deleteTransaction,editTransaction } from "../controllers/transactionCntrl.js";

const router = express.Router();

//add transaction
router.post("/add-transaction", addTransaction)

//post all transaction
router.post("/get-transaction", getTransaction)

//delete transaction
router.post('/delete-transaction', deleteTransaction)

//edit transaction
router.post('/edit-transaction', editTransaction)


export default router