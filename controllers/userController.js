import userModel from "../models/userModel.js"
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import TokenSchema from "../Token/token.js";
import User from "../models/userModel.js";
import crypto from 'crypto'; 
import  sendActivationEmail  from "../services/service.js";
import dotenv from 'dotenv';



dotenv.config();

export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }

        // Compare the hashed password with the input password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).send({ message: 'Invalid password' });
        }
        //check email is valid
        if (!user.verified) {
            let Token = await TokenSchema.findOne({ userId: user._id });
            if (!Token) {
                Token = await new TokenSchema({ userId: user._id, token: crypto.randomBytes(32).toString('hex') }).save();

                const url = `${process.env.BASE_URL}user/${user._id}/verify/${Token.token}`;
                await sendActivationEmail(user.email, "verify email",url);
            }
            return res.status(400).send({ message: ' An activation email has been sent to your email. Please verify your email' });
        }

        //if the password is correct generate a token
        const token = jwt.sign({
            id: user._id,
            email: user.email,
        }, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.cookie('token', token, { httpOnly: true, sameSite: 'none', secure: true, expires: new Date(Date.now() + 24 * 60 * 60 * 1000) });
        


        res.status(200).send({ message: 'Login success', user, token });

    } catch (error) {
        res.status(500).send({ message: 'Error occurred when logging in', error });
    }
};

export const registerController = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password before saving it to the database
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await new User({ name, email, password: hashedPassword, verified: false }).save();

        const newToken = await new TokenSchema({ userId: user._id, token: crypto.randomBytes(32).toString('hex') }).save();
        


       

        const url = `${process.env.BASE_URL}user/${user._id}/verify/${newToken.token}`;

        await sendActivationEmail(user.email, url);

        res.status(201).json({ message: 'User registered successfully. Please check your email for verification.' });
    } catch (error) {
        res.status(500).json({ message: 'Error occurred during registration' });
    }
};
export const verifyEmail = async (req, res) => {
    const { id, token } = req.params;

    try {
        const user = await User.findOne({ _id: id });
        if (!user) {
            return res.status(400).json({ message: 'Invalid verification link' });
        }

        const tokenData = await TokenSchema.findOne({ userId: user._id, token });
        if (!tokenData) {
            return res.status(400).json({ message: 'Invalid verification link' });
        }

        await User.updateOne({ _id: user._id }, { verified: true });

        await TokenSchema.deleteOne({ _id: tokenData._id });

        res.status(200).json({ message: 'Email verified successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};



