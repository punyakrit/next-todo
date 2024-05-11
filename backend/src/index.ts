import express from 'express'
import cors from 'cors'
import mainRoute from './backends/index'
import cookieparser from 'cookie-parser'
const app = express()
app.use(express.json())
app.use(cookieparser())
app.use(cors({
    credentials:true,
    origin:"http://localhost:3000/"
}))

app.use('/api/v1', mainRoute)

app.listen('8080', () => {
    console.log("Server started")
}) 