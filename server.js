// import express from "express";
// import cors from "cors";
// import morgan from "morgan";
// import dotenv from "dotenv";
// import { connectDB } from "./config/connectDb.js";
// import userRoute from "./routes/userRoute.js";
// import transactionRoute from "./routes/transactionRoute.js";
// import cookieParser from "cookie-parser";
// import passwordResetRoute from "./routes/passwordReset.js";

// // dotenv config
// dotenv.config();

// // port
// const port = process.env.PORT

// // rest of the code
// const app = express();

// // middlewares
// app.use(cors());
// app.use(express.json());
// app.use(morgan("dev"));
// app.use(cookieParser());


// // user routes
// app.use("/api/user", userRoute);

// // transaction routes
// app.use("/api/transaction", transactionRoute);

// // password reset routes
// app.use("/api/password-reset", passwordResetRoute);


// // listen server
// app.listen(port, () => {
//     console.log(`Server is running on port ${port}`.yellow.bold);
// });

// connectDB();

import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import { connectDB } from "./config/connectDb.js";
import userRoute from "./routes/userRoute.js";
import transactionRoute from "./routes/transactionRoute.js";
import cookieParser from "cookie-parser";
import passwordResetRoute from "./routes/passwordReset.js";
import path from "path";

// dotenv config
dotenv.config();

// Ensure PORT is defined in .env
if (!process.env.PORT) {
    console.error("PORT is not defined in the .env file");
    process.exit(1);
}

// port
const port = process.env.PORT ; 

// Initialize express app
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());

// Serve static files with correct MIME types
app.use('/static', express.static(path.join(__dirname, 'public'), {
    setHeaders: function (res, path) {
        if (path.endsWith('.js')) {
            res.setHeader('Content-Type', 'application/javascript');
        }
    }
}));

// API routes
app.use("/api/user", userRoute);
app.use("/api/transaction", transactionRoute);
app.use("/api/password-reset", passwordResetRoute);

// Error handling middleware (optional, but recommended)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Listen server 
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// Connect to the database
connectDB();
