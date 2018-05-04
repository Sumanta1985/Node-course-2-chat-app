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

// socket.emit('createNewchat',{
//   from: 'sumanta',
//   text: 'hi,how are you'
// },(obj)=>{
//   console.log(obj.text);
// });

jQuery('#message-form').on('submit',(e)=>{
  e.preventDefault();

  socket.emit('createNewchat',{
    from: 'sumanta',
    text: jQuery('[name=message]').val()
  },(obj)=>{
    console.log(obj.text);
  });
});

var locationbutton=jQuery('#send-location');
locationbutton.on('click',()=>{
//  e.preventDefault();
  if(!navigator.geolocation){
    return alert("Geolocation not suported by browser");
  }

  navigator.geolocation.getCurrentPosition((position)=>{
    socket.emit('userlocation',{
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  },()=>{
    alert("Unable to fetch location");
  });
  // socket.emit('createNewlocation',);
});

socket.on("NewChat",function(Newchat){
  // console.log('Newchat',Newchat);
  var li=jQuery('<li></li>');
  li.text(`${Newchat.from}:${Newchat.text}`);

  jQuery('#messages').append(li);
});

socket.on('newUserWelcome',function(user){
  console.log(`${user.from} welcomes you`);
});

socket.on('newUserJoin',function(user){
  console.log(`New user joined`);
});

socket.on('NewLocation',function(location){
  var li=jQuery('<li></li>');
  var a=jQuery('<a target="_blank">My location</a>');
  li.text(`${location.from}:`);
  a.attr('href',location.url);
  li.append(a);
  jQuery('#messages').append(li);
});

socket.on('disconnect',function(){
  console.log("Disconnected from Server");
});



// socket.on('Newemail',function(email){
//   console.log("new email",email);
// });
//
