import express from 'express'
const route = express.Router()
import authRoute from './routes/auth'
import otpRoute from './routes/otp'
import userRoute from './routes/user'
import taskRoute from './routes/todo'

route.use('/auth',authRoute)
route.use('/otp',otpRoute)
route.use('/user', userRoute)
route.use('/task',taskRoute)

route.get('/',(req,res)=>{
    const tokens = req.cookies
    console.log(tokens)
    res.json({
        message:"Hello",
        tokens
    })
})

export default route