const path=require('path');
const http=require('http');
const socketIO=require('socket.io');
const express=require('express');
const {generateMessage,generateLocationMessage}=require('./utils/message');
const {isStringValid}=require('./utils/validate');
var {Users}=require('./utils/users');

const port=process.env.PORT||3000;

const app=express();
const server=http.createServer(app);
const publicPath=path.join(__dirname,'../public');

var user=new Users();

var io=socketIO(server);  //web socket server

app.use(express.static(publicPath));

io.on('connection',(socket)=>{
  console.log("new user connected");

  socket.on('join',(param,callback)=>{
    var name=param.name;
    var c_name=param.c_name;

    if (isStringValid(name) && isStringValid(c_name)){
      socket.join(c_name);
      user.removeuser(socket.id); //not sure how it helps
      user.adduser(socket.id,name,c_name);

      // console.log('user.getuser:',user.getuser(socket.id));

      io.to(param.c_name).emit('userlist',user.getuserlist(c_name));

      socket.emit('NewChat',generateMessage('Admin','Welcome to chat group'));
      socket.broadcast.to(param.c_name).emit('NewChat',generateMessage('Admin',`${name} joined`));
      callback();
    }else{
      callback("Please provide valid name and channel");
    }
  });

//  socket.emit('NewChat',generateMessage('Admin','Welcome to chat group'));
//  socket.broadcast.emit('NewChat',generateMessage('Admin','New user joined'));

  socket.on('createNewchat',function(NewChat,callback){
    io.to(NewChat.from.c_name).emit('NewChat',generateMessage(NewChat.from.name,NewChat.text));
    callback({text:'this is from server'});
  });

  socket.on('Newuserlocation',(location,callback)=>{
    var l_user=user.getuser(socket.id);
    io.to(l_user[0].c_name).emit('UserLocation',generateLocationMessage(location.from,location.latitude,location.longitude));
    callback();
  });


  socket.on('disconnect',()=>{
    console.log('Client connection closed');
//    var remove_user=user.getuser(socket.id);
    var remove_user=user.removeuser(socket.id);
    io.to(remove_user[0].c_name).emit('userlist',user.getuserlist(remove_user[0].c_name));
    // console.log('removed user:',remove_user);
    // console.log('users:',user);
    socket.broadcast.to(remove_user[0].c_name).emit('NewChat',generateMessage('Admin',`${remove_user[0].name} has left`));
  });
});

// app.get('/',(req,res)=>{
//   console.log('document',req);
// });

server.listen(port,()=>{
  console.log(`Server started at port ${port}`);
});
