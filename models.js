var Sequelize = require('sequelize');

var mysql = new Sequelize(
  'golden'
  ,'root'
  ,'123456'
  ,{
    dialect: "mysql",
    port: 3306
  }
);

var User = mysql.define('User',{
  username: Sequelize.STRING,
  password: Sequelize.STRING
});

var Student = mysql.define('Students',{
  name     : Sequelize.STRING,
  roll_no  : Sequelize.STRING,
  password : Sequelize.STRING,
  phone_no : Sequelize.STRING,
  balance  : Sequelize.FLOAT
});

function sync(){
  mysql
    .sync({ force : true })
    .complete(function(err){
      if(!!err){
        console.log('sync error', err);
      }else{
        console.log('sync success');
      }
  });
}

function addUser(username, password){
  User
    .create({
      username: username,
      password: password   //hash the password
    })
    .complete(function(err, user){
      if(!!err){
        console.log(":( user add fail");
      }else{
        console.log(":) user add success");
      }
    });
}


module.exports = {
  User: User,
  Student: Student,
  fn:{
    sync: sync,
    addUser: addUser
  }
};
