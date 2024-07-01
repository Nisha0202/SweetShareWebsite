import nodemailer from 'nodemailer';
import User from "@/models/user";
import bcrypt from 'bcrypt';

export const sendEmail = async ({ email, emailType, userId }) => {
    try {
        // Create a hashed token
        const hashedToken = await bcrypt.hash(userId.toString(), 10);

        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(userId, {
                verifyToken: hashedToken,
                verifyTokenExpiry: Date.now() + 900000 // 15min expiration
            });
        } else if (emailType === "RESET") {
            await User.findByIdAndUpdate(userId.toString, {
                forgotPasswordToken: hashedToken,
                forgotPasswordTokenExpiry: Date.now() + 900000 // 15 min expiration
            });
        }

        // Create a transporter object using Mailtrap SMTP
        let transporter = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "3f906593a75218",
                pass: process.env.MAIL_PASS
            }
        });

        // Email options
        const mailOptions = {
            from: 'nishajabatun@gmail.com',
            to: email,
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
            html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"} or copy and paste the link below in your browser.<br>${process.env.DOMAIN}/verifyemail?token=${hashedToken}</p>`
        };

        // Send email
        const mailResponse = await transporter.sendMail(mailOptions);
        return mailResponse;

    } catch (error) {
        throw new Error(error.message);
    }
};
