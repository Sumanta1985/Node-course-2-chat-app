//adduser(id,name,room)
//removeuser(id)
//getuser(id)
//getuserlist(room)

class Users{
  constructor(){
    // below 2 lines are notes
    //var user=new Users();
    //user.users will return an array and it is going to be an array of obects because of adduser funtion.
    this.users=[];
  }
  adduser(id,name,c_name){
    // console.log('User added',this.id,this.name,this.c_name);
    var user={id,name,c_name};
    this.users.push(user);
    return user;
  }

  removeuser(id){
    //returns an array excluding the user
    var user=this.getuser(id);
    this.users=this.users.filter(user=>user.id!=id);
    return user;
  }

  getuser(id){
    var user=this.users.filter(user=>user.id==id);
    return user;
  }

  getuserlist(room){
    var users=this.users.filter(user=>user.c_name==room);
    var usernames= users.map(user=>user.name);

    return usernames;
  }

}

// var me=new Users();
// var user=me.adduser(123,'sumanta','room');
//
// console.log("users",me.users);

module.exports={Users};
