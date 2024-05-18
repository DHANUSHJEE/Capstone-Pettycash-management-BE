import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();


export const sendPasswordResetEmail = async (email, url) => {
    try {
        const transporter = nodemailer.createTransport({
            service: process.env.SERVICE,
            host: process.env.HOST,
            secure: false,
            port: process.env.EMAIL_PORT,
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            },
            tls: {
                rejectUnauthorized: false // Ignore SSL certificate validation
            }
        });

        const emailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: 'Password Reset',
            html: `
                <h5>Hi there,</h5>
                <p>Your request to reset your password has been received.</p>
                <p>Click here to reset your account password: <a href="${url}">Reset Password</a></p>
                <p>Enjoy your service in our platform.</p>`
        };

        console.log('sending email with url:',url)

        await transporter.sendMail(emailOptions);
        console.log("Email sent: " + emailOptions.to);
        return true;
    } catch (error) {
        console.error("Error sending email:", error);
        return false;
    }
};