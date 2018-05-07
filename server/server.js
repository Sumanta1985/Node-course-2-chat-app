const path=require('path');
const http=require('http');
const socketIO=require('socket.io');
const express=require('express');
const {generateMessage,generateLocationMessage}=require('./utils/message');


const port=process.env.PORT||3000;

const app=express();

const server=http.createServer(app);

const publicPath=path.join(__dirname,'../public');

var io=socketIO(server);  //web socket server

app.use(express.static(publicPath));

io.on('connection',(socket)=>{
  console.log("new user connected");

  // socket.emit('Newemail',enerateMessage('sumanta@example.com','hi '));
  //
  // socket.on('CreateNewemail',function(newEmail){
  //   console.log('Created email',newEmail);
  // });
  socket.emit('NewChat',generateMessage('Admin','Welcome to chat group'));
  socket.broadcast.emit('NewChat',generateMessage('Admin','New user joined'));

  socket.on('createNewchat',function(NewChat,callback){
//    console.log('New chat',NewChat);
    NewChat.createdAt=new Date().getTime();
    io.emit('NewChat',NewChat);
    callback({text:'this is from server'});
    // socket.broadcast.emit('NewChat',NewChat);
  });

  socket.on('Newuserlocation',(location,callback)=>{
    io.emit('UserLocation',generateLocationMessage('User',location.latitude,location.longitude));
    callback();
  });

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
