const path=require('path');
const http=require('http');
const socketIO=require('socket.io');
const express=require('express');
const {generateMessage,generateLocationMessage}=require('./utils/message');
const {isStringValid}=require('./utils/validate');

const port=process.env.PORT||3000;

const app=express();
const server=http.createServer(app);
const publicPath=path.join(__dirname,'../public');

var io=socketIO(server);  //web socket server

app.use(express.static(publicPath));

io.on('connection',(socket)=>{
  console.log("new user connected");

  socket.on('join',(param,callback)=>{
    var name=param.name;
    var c_name=param.c_name;

    if (isStringValid(name) && isStringValid(c_name)){
      callback();
    }else{
      callback("Please provide valid name and channel");
    }
  });

  socket.emit('NewChat',generateMessage('Admin','Welcome to chat group'));
  socket.broadcast.emit('NewChat',generateMessage('Admin','New user joined'));

  socket.on('createNewchat',function(NewChat,callback){
    io.emit('NewChat',generateMessage('User',NewChat.text));
    callback({text:'this is from server'});
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
