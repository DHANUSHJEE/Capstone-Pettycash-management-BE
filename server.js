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

// const allowedOrigins = ['http://localhost:3001' || 'https://main--enchanting-piroshki-6c4c3f.netlify.app/']; app.use(cors({
//     origin: function (origin, callback) {
//         if (!origin) return callback(null, true); // Allow requests with no origin (like mobile apps or curl requests)
//     }
//         if(allowedOrigins.indexOf(origin) === -1) {
//     const msg = 'The CORS policy for this site does not allow access from the specified origin.'; return callback(new Error(msg)
//         }, true)

app.use(express.static('public', {
    setHeaders: (res, path) => {
        if (path.endsWith('.js')) {
            res.setHeader('Content-Type', 'application/javascript');
        }
    }
}));

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
