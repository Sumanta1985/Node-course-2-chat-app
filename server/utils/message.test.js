var expect=require('expect');

var {generateMessage}=require('./message');

describe('generateMessgae',()=>{
  it('should return generated message',()=>{
    var from ='sumanta';
    var text='hi';
    var message=generateMessage(from,text);
    expect(message.createdAt).toBeA('number');
    expect(message).toInclude({
      from,
      text
    })
  });
});
