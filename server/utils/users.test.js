var expect=require('expect');

var {Users}=require('./users');

//adduser(id,name,room)
//removeuser(id)
//getuser(id)
//getuserlist(room)

describe('users',()=>{
  var me;

  beforeEach(()=>{
    me=new Users();
    me.users=[{
      id:1234,name:'rana',c_name:'node'
    },
    {
      id:12345,name:'alolika',c_name:'expect'
    },
    {
      id:123456,name:'bonu',c_name:'expect'
    }];
  });

  it('should add a new user',()=>{
    var me=new Users();
//    var user=me.adduser(123,'sumanta','room');

    expect(me.adduser(123,'sumanta','room')).toEqual({id:123,c_name:'room',name:'sumanta'});
  });

  it('should remove a  user',()=>{
//   var me=new Users();
//    var user=me.adduser(123,'sumanta','room');

    expect(me.removeuser(123456)).toEqual([{id:1234,name:'rana',c_name:'node'},{id:12345,name:'alolika',c_name:'expect'}]);
  });

  it('should get a user',()=>{
//   var me=new Users();
//    var user=me.adduser(123,'sumanta','room');

    expect(me.getuser(12345)).toEqual([{id:12345,name:'alolika',c_name:'expect'}]);
  });

  it('should fetch user names',()=>{
//   var me=new Users();
//    var user=me.adduser(123,'sumanta','room');

    expect(me.getuserlist('expect'))
    .toEqual(["alolika","bonu"]);
  });
});
