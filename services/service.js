

import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const sendActivationEmail = async (email) => {
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
            subject: 'Account Registration',
            html: `
                <h5>Hi there,</h5>
                <p>Your account has been created successfully in our platform.</p>
                <p>Enjoy your service in our platform.</p>
            `,
        };

        await transporter.sendMail(emailOptions);
        console.log("Email sent: " + emailOptions.to);
        return true;
    } catch (error) {
        console.error("Error sending email:", error);
        return false;
    }
};



export default sendActivationEmail ;








