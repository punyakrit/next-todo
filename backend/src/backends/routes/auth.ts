import express from 'express'
import bcrypt from 'bcrypt'
const route = express.Router()
import z from 'zod'
import { otpModel, UserModel } from '../db'
import jwt from 'jsonwebtoken'
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
        user: 'mailautomation0@gmail.com',
        pass: 'cqkjkxqyhvzckaau',
    },
});

const userSchema = z.object({
    username: z.string().min(2).max(20),
    email: z.string().email(),
    password: z.string()
})

route.post('/signup', async (req, res) => {
    const body = req.body
    const { success } = userSchema.safeParse(req.body)
    if (!success) {
        return res.status(400).json({
            message: "Error Occured Enter correct values"
        })
    }

    try {
        const userExists = await UserModel.findOne({
            username: body.username
        })

        if (userExists) {
            return res.status(400).json({
                message: "User already exists kindly login"
            })
        } else {

            const hasedPassword = await bcrypt.hash(body.password, 10)
            const createUser = await UserModel.create({
                username: body.username,
                email: body.email,
                password: hasedPassword,
                verified: false

            })


            const otp = Math.floor(1000 + Math.random() * 9000);
            await otpModel.create({
                otp: otp,
                userId: createUser._id
            })
            const token = jwt.sign({ userId: createUser._id }, "mypassword")
            console.log(token)
            res.cookie('token', token)

            const info = await transporter.sendMail({
                from: 'mailautomation0@gmail.com',
                to: body.email,
                subject: 'Otp for todo-lists',
                text: `Otp for username: ${body.username} is ${otp}`,
                html: `<b>Otp for username: ${body.username} is ${otp}</b>`
            });
            
            console.log(`Message sent to ${body.email}: ${info.messageId}`);

            res.status(200).json({
                message: "User created",
                token
            })
        }
    } catch (error) {
        res.status(400).json({
            message: "Signup server crashed",
            error
        })
    }
})


const signinSchema = z.object({
    username:z.string().min(2).max(20),
    password:z.string()
})


route.post('/signin',async (req,res)=>{
    const body = req.body;

    const {success} = signinSchema.safeParse(req.body)
    if(!success){
        return res.status(400).json({
            message: "Error Occured Enter correct values"
        })
    }

    try{
        const userExists = await UserModel.findOne({
            username: body.username
        })
        if(!userExists){
            return res.status(400).json({
                message:"Username does not exists"
            })
        }else{
            const passMatch = await  bcrypt.compare(body.password, userExists.password ||"")

            if(passMatch){
                const token = jwt.sign({ userId: userExists._id }, "mypassword")
                res.cookie('token', token)
                return res.status(200).json({
                    message: "Login successful",
                    token
                })
            }else{
                return res.status(400).json({
                    message: "Incorrect password"
                })
            }
        }
    }catch(error){
        res.status(400).json({
            message: "Signup server crashed",
            error
        })
    }
})



export default route