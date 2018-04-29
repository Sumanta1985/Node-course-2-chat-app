var socket=io();  //request server to create a connection,returns socket

socket.on('connect',function(){
  console.log("connected to server");

  // socket.emit('CreateNewemail',{
  //   from:'alolika@example.com',
  //   text:'test email',
  //   createdAt:1234
  // });

  // socket.emit('createNewchat',{
  //   from: 'sumanta',
  //   text: 'hi,how are you'
  // });
});

socket.on("NewChat",function(Newchat){
  console.log('Newchat',Newchat);
});

socket.on('disconnect',function(){
  console.log("Disconnected from Server");
});

// socket.on('Newemail',function(email){
//   console.log("new email",email);
// });
//
