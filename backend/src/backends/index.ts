import express from 'express'
const route = express.Router()
import authRoute from './routes/auth'
import otpRoute from './routes/otp'
import userRoute from './routes/user'

route.use('/auth',authRoute)
route.use('/otp',otpRoute)
route.use('/user', userRoute)


export default route