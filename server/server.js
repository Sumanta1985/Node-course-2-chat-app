const path=require('path');
const http=require('http');
const socketIO=require('socket.io');
const express=require('express');

const port=process.env.port||3000;

const app=express();

const server=http.createServer(app);

const publicPath=path.join(__dirname,'../public');

var io=socketIO(server);  //web socket server

app.use(express.static(publicPath));

io.on('connection',(socket)=>{
  console.log("new user connected");
  socket.on('disconnect',()=>{
    console.log('Client connection closed');
  });
});

app.get('/',(req,res)=>{
  console.log('document',req);
});


server.listen(port,()=>{
  console.log(`Server started at port ${port}`);
});
