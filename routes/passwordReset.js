import express from "express";
import User from "../models/userModel.js";
import bcrypt from 'bcrypt';


const router = express.Router();

router.post("/forgot-password", async (req, res) => {
    try {
        const { email, password, confirmPassword } = req.body;

        if (password !== confirmPassword) {
            return res.status(400).send({ message: 'Passwords do not match' });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).send({ message: 'User with given email does not exist' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await User.updateOne({ email }, { password: hashedPassword });

        await sendPasswordResetEmail(user.email);
        res.status(200).send({ message: 'Password reset successfully' });

    } catch (error) {
        console.error('Error resetting password:', error);
        res.status(500).send({ message: 'Internal server error' });
    }
});










export default router