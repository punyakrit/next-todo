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

export default route