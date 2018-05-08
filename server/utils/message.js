const moment=require('moment');

var generateMessage=function(from,text){
  return {
  text,
  from,
  createdAt: moment().valueOf()
};
};

var generateLocationMessage=function(from,latitude,longitude){
  return {
    from,
    url : `https://google.com/maps?q=${latitude},${longitude}`,
//    createdAt: new Date().getTime()
    createdAt: moment().valueOf()
  };
};

module.exports={generateMessage,generateLocationMessage};
