//const moment=require('moment'); doesn't work in client side javascript

var socket=io();  //request server to create a connection,returns socket

function scrollToBottom(){
  //selectors
  var messages=jQuery("#messages");
  var newMessage=messages.children('li:last-child');
  //Heights
  var clientHeight=messages.prop("clientHeight");
  var scrollTop=messages.prop("scrollTop");
  var scrollHeight=messages.prop("scrollHeight");
  var newMessageHeight=newMessage.innerHeight();
  var lastMessageHeight=newMessage.prev().innerHeight();

  console.log('clientHeight',clientHeight);
  console.log('scrollTop',scrollTop);
  console.log('newMessageHeight',newMessageHeight);
  console.log('lastMessageHeight',lastMessageHeight);
  console.log('scrollHeight',scrollHeight);

  if (clientHeight+scrollTop+newMessageHeight>=scrollHeight){
    console.log('Should scroll');
    messages.scrollTop(scrollHeight);
  }
}

socket.on('connect',function(){
  console.log("connected to server");
  var param=jQuery.deparam(window.location.search);
  socket.emit('join',param,(err)=>{
    if (err){
      console.log ("err object",err);
      alert("Please provide valid name and channel name to join");
      window.location.href="/";
    }else{
      console.log("No error");
    };
  });
});

socket.on('disconnect',function(){
  console.log("Disconnected from Server");
});

socket.on("NewChat",function(Newchat){
  var formattedtime=moment(Newchat.createdAt).format("h:mm a");
  var template=jQuery('#message-template').html();
  var html=Mustache.render(template,{
    text:Newchat.text,
    from:Newchat.from,
    createdAt:formattedtime
  });
  jQuery('#messages').append(html);
  scrollToBottom();
  // var li=jQuery('<li></li>');
  // li.text(`${Newchat.from} ${moment(Newchat.createdAt).format("h:mm a")}:${Newchat.text}`);
  // jQuery('#messages').append(li);
});

socket.on('UserLocation',function(location){
  var formattedtime=moment(location.createdAt).format("h:mm a");
  var template=jQuery('#location-template').html();
  var html=Mustache.render(template,{
    url:location.url,
    from:location.from,
    createdAt:formattedtime
  });
  jQuery('#messages').append(html);
  scrollToBottom();
  // var li=jQuery('<li></li>');
  // var a=jQuery('<a target="_blank">My location</a>');
  // li.text(`${location.from} ${moment(location.createdAt).format("h:mm a")}:`);
  // a.attr('href',location.url);
  // li.append(a);
  // jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit',(e)=>{
  e.preventDefault();
  var messageTextBox=jQuery('[name=message]');
  socket.emit('createNewchat',{
    from: 'User',
    text: messageTextBox.val()
  },(obj)=>{
    messageTextBox.val('');
  });
});

var locationbutton=jQuery('#send-location');
locationbutton.on('click',()=>{
//  e.preventDefault();
  if(!navigator.geolocation){
    return alert("Geolocation not suported by browser");
  }

  locationbutton.attr('disabled','disabled').text('sending location...');

  navigator.geolocation.getCurrentPosition((position)=>{
    socket.emit('Newuserlocation',{
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    },()=>{
      locationbutton.removeAttr('disabled').text('send location');  //name of the attribute
    });
  },()=>{
    alert("Unable to fetch location");
    locationbutton.removeAttr('disabled').text('send location');
  });
});
