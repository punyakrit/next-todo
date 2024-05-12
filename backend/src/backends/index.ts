import express from 'express'
const route = express.Router()
import authRoute from './routes/auth'
import otpRoute from './routes/otp'


route.use('/auth',authRoute)
route.use('/otp',otpRoute)


export default route