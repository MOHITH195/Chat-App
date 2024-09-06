const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const userRoute = require('./routes/userRoute')
const messageRoute = require('./routes/messagesRoute')
const {Server} = require('socket.io')
const app = express()

require('dotenv').config()
app.use(cors())
app.use(express.json())
app.use("/api/auth",userRoute)
app.use('/api/messages',messageRoute)

mongoose.connect(process.env.MONGO_URI)
.then(()=>{console.log("DB Connected")})
.catch((err)=>console.log(err))

const server = app.listen(5000,()=>{
    console.log("Server listening on port 5000");
})

const io = new Server(server,{
    cors:{
        origin : "http://localhost:3000"
        
    }
})

global.onlineUsers = new Map()

io.on("connection",(socket)=>{
    global.chatSocket = socket;
    socket.on("add-user",(userId)=>{
        console.log("User added :",socket.id);
        onlineUsers.set(userId,socket.id)
    })

    socket.on("send-msg",(data)=>{
        const sendUserSocket = onlineUsers.get(data.to)
        if(sendUserSocket){
            socket.to(sendUserSocket).emit("msg-receive",data.nessage)
        }
    })
})