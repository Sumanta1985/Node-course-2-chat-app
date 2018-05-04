var generateMessage=function(from,text){
  return {
  text,
  from,
  createdAt: new Date().getTime()
};
};

var generateLocationMessage=function(from,latitude,longitude){
  return {
    from,
    url : `https://google.com/maps?q=${latitude},${longitude}`,
    createdAt: new Date().getTime()

  };
};

module.exports={generateMessage,generateLocationMessage};
