import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import { connectDB } from "./config/connectDb.js";
import userRoute from "./routes/userRoute.js";
import transactionRoute from "./routes/transactionRoute.js";
import cookieParser from "cookie-parser";
import passwordResetRoute from "./routes/passwordReset.js";

// dotenv config
dotenv.config();

// port
const port = process.env.PORT  

// rest of the code
const app = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());


// user routes
app.use("/api/user", userRoute);

// transaction routes
app.use("/api/transaction", transactionRoute);

// password reset routes
app.use("/api/password-reset", passwordResetRoute);


// listen server 
app.listen(port, () => {
    console.log(`Server is running on port ${port}`.yellow.bold);
});

connectDB();
