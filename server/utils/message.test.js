var expect=require('expect');

var {generateMessage,generateLocationMessage}=require('./message');

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

describe('generatelocation',()=>{
  it('should fetch current location',()=>{
    var from='sumanta'
    var latitude=37.5288982;
    var longitude=-77.4221769;
    var url='https://google.com/maps?q=37.5288982,-77.4221769';
    var location=generateLocationMessage(from,latitude,longitude);
    expect(location.createdAt).toBeA('number');
    expect(location).toInclude({url});
    expect(location.url).toBe('https://google.com/maps?q=37.5288982,-77.4221769')
  });
});
