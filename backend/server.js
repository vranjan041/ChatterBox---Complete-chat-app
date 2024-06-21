import express from 'express'
import dotenv from 'dotenv'
import authRoutes from './Routes/auth.routes.js'
import cookieParser from 'cookie-parser'
import messageRoutes from './Routes/message.routes.js'
import userRoutes from './Routes/user.routes.js'
import { connectToMongo } from './DB/connectToMongo.js'

dotenv.config()
const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json())
app.use(cookieParser())

app.use("/api/auth", authRoutes)
app.use("/api/messages", messageRoutes)
app.use("/api/users", userRoutes)
// app.get('/', (req, res) => {
//     res.send('Hello!!!')
// })


app.listen(PORT, ()=>{
    connectToMongo()
    console.log(`listening at ${PORT}...`)
})