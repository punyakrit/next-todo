import express from 'express'
import cors from 'cors'
import mainRoute from './backends/index'
import cookieParser from 'cookie-parser';
const app = express()
app.use(express.json())
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:3000', 
    credentials:true
  }));

app.use('/api/v1', mainRoute)

app.listen('8080', () => {
    console.log("Server started")
}) 