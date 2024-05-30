import express from "express";
import joi from "joi";
import passwordComplexity from "joi-password-complexity";
import User from "../models/userModel.js";
import TokenSchema from "../Token/token.js";
import bcrypt from 'bcrypt';
import { sendPasswordResetEmail } from "../services/passwordService.js";
import crypto from 'crypto';


const router = express.Router();



// router.post("/forgot-password", async (req, res) => {
//     try {
//         const emailSchema = joi.object({
//             email: joi.string().email().required().label('Email')
//         });
//         const { error } = emailSchema.validate(req.body);
//         if (error) {
//             return res.status(400).send(error.details[0].message);
//         }
//         const user = await User.findOne({ email: req.body.email });
//         if (!user) {
//             return res.status(409).send({ message: 'User with given email does not exist' });
//         }

//         // Delete any existing token for this user
//         await TokenSchema.deleteOne({ userId: user._id });

//         const token = await new TokenSchema({ userId: user._id, token: crypto.randomBytes(32).toString('hex') }).save();

//         const url = `${process.env.BASE_URL}${user._id}/${token.token}`;
//         console.log("url for forgot password :",url)

//         await sendPasswordResetEmail(user.email, url);

//         res.status(200).send({ message: 'Password reset link email sent to your email' });

//     } catch (error) {
//         res.status(500).send({ message: 'Internal server error' });
//         console.log("Error while sending email for forgot password", error);
//     }
// });

//forgot password without token

router.post("/forgot-password", async (req, res) => {
    try {
        const { password , confirmPassword } = req.body;
        if (password !== confirmPassword) { 
            return res.status(400).send({ message: 'Passwords do not match' });
        }

        const user = await User.findOne({ _id: req.body.userId });
        if (!user) { 
            return res.status(400).send({ message: 'User not found' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await User.updateOne({ _id: user._id }, { password: hashedPassword });
        res.status(200).send({ message: 'Password reset successfully' });

    } catch (error) {
        res.status(500).send({ message: 'Internal server error' });
    }
})

// //verify url 
// router.get("/:id/:token", async (req, res) => {
//     try {
//         const user = await User.findOne({ _id: req.params.id });
//         if (!user) {
//             return res.status(400).send({ message: 'Invalid link' });
//         }
//         const tokenData = await TokenSchema.findOne({ userId: user._id, token: req.params.token });
//         if (!tokenData) {
//             return res.status(400).send({ message: 'Invalid link' });
//         }
//         await User.updateOne({ _id: user._id }, { verified: true });
//         // await TokenSchema.deleteOne({ _id: tokenData._id });
//         res.status(200).send({ message: 'valid url' });
//     } catch (error) {
//         res.status(500).send({ message: 'Internal server error' });
//     }
// })



// const complexityOptions = {
//     min: 8,
//     max: 30,
//     lowerCase: 1,
//     upperCase: 1,
//     numeric: 1,
//     symbol: 1,
//     requirementCount: 4,
// };

// router.post("/:id/:token", async (req, res) => {
//     try {
//         const passwordSchema = joi.object({
//             password: passwordComplexity(complexityOptions).required().label('Password'),
//         });

//         const { error } = passwordSchema.validate(req.body);
//         if (error) {
//             const requirements = `
//                 Password must meet the following requirements:
//                 - Minimum 8 characters
//                 - Maximum 30 characters
//                 - At least one lowercase letter
//                 - At least one uppercase letter
//                 - At least one numeric digit
//                 - At least one special character
//             `;
//             return res.status(400).send({ message: error.details[0].message, requirements });
//         }

//         const user = await User.findOne({ _id: req.params.id });
//         if (!user) {
//             return res.status(400).send({ message: 'Invalid link' });
//         }

//         const tokenData = await TokenSchema.findOne({ userId: user._id, token: req.params.token });
//         if (!tokenData) {
//             return res.status(400).send({ message: 'Invalid link' });
//         }

//         if (!user.verified) user.verified = true;

//         const salt = await bcrypt.genSalt(10);
//         const hashedPassword = await bcrypt.hash(req.body.password, salt);
//         user.password = hashedPassword;
//         await user.save();
//         await TokenSchema.deleteOne({ _id: tokenData._id });

//         res.status(200).send({ message: 'Password reset successfully' });
//     } catch (error) {
//         console.error("Error during password reset:", error);
//         res.status(500).send({ message: 'Internal server error' });
//     }
// });








export default router