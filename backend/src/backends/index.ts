import express from 'express'
const route = express.Router()
import authRoute from './routes/auth'

route.use('/auth',authRoute)


export default route