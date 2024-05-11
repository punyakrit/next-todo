import express from 'express'
import cors from 'cors'
import mainRoute from './backends/index'
const app = express()
app.use(cors())
app.use(express.json())

app.use('/api/v1', mainRoute)

app.listen('8080', () => {
    console.log("Server started")
}) 