import express from 'express'
import { authMiddleware } from '../middleware'
import { otpModel, UserModel } from '../db'
const route = express.Router()
import z from 'zod'
import nodemailer from 'nodemailer'


var transporter = nodemailer.createTransport({
    service:'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure:false,
    auth: {
        user: 'mailautomation0@gmail.com',
        pass: 'cqkjkxqyhvzckaau'
    }
});




route.post('/verify-otp', authMiddleware, async (req, res) => {
    const body = req.body
   

    try {
        const userExists = await UserModel.findOne({
            _id: req.userId,
            verified: true
        })

        if (userExists) {
            return res.json({
                message: "User already verified"
            })
        } else {
            const otpEntry = await otpModel.findOne({
                userId: req.userId,
                otp: body.otp
            })

            if (!otpEntry) {
                return res.json({
                    message: "Invalid OTP"
                })
            } else {
                await UserModel.findOneAndUpdate({
                    _id: req.userId
                }, {
                    verified: true
                })

                return res.json({
                    message: "OTP Verified Successfully"
                })
            }
        }
    } catch (error) {
        
    }
})



route.get('/send-otp', authMiddleware, async (req, res) => {
    try {
      const otp = await otpModel.findOne({ userId: req.userId });
      const user = await UserModel.findOne({ _id: req.userId });
  
      if (!otp || !user) {
        return res.status(404).json({ message: 'User or OTP not found' });
      }
  
      const email = user.email;
      const otpValue = otp.otp;
  
      if (!email) {
        return res.status(400).json({ message: 'Email address is missing' });
      }
  
      console.log(otpValue);
  
      const mailOptions = {
        from: 'mailautomation0@gmail.com',
        to: email,
                subject: 'Otp for todo-lists',
                text: `Otp  is ${otpValue}`,
                html: `<b>Otp  is ${otpValue}</b>`
      };
  
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error("Error sending email:", error);
          return res.status(500).json({ message: 'Failed to send email' });
        } else {
          console.log("Email sent:", info.response);
          return res.json({ message: "Email Sent!!" });
        }
      });
    } catch (error) {
      console.error("Error:", error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  });


export default route
