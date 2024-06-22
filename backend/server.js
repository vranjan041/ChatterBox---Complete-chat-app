import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
import authRoutes from './Routes/auth.routes.js'
import cookieParser from 'cookie-parser'
import messageRoutes from './Routes/message.routes.js'
import userRoutes from './Routes/user.routes.js'
import { connectToMongo } from './DB/connectToMongo.js'
import { app, server } from './socket/socket.js'

const PORT = process.env.PORT || 5000

const __dirname = path.resolve()

dotenv.config()

app.use(express.json())
app.use(cookieParser())

app.use("/api/auth", authRoutes)
app.use("/api/messages", messageRoutes)
app.use("/api/users", userRoutes)

app.use(express.static(path.join(__dirname, "/frontend/dist")))

app.get("*", (req, res)=>{
    res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"))
})

server.listen(PORT, ()=>{
    connectToMongo()
    console.log(`listening at ${PORT}...`)
})