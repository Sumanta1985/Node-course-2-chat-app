var generateMessage=function(from,text){
  return {
  text,
  from,
  createdAt: new Date().getTime()
};
};

module.exports={generateMessage};
