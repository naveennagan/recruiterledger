var express = require('express');

var path = require('path');

var app = express();

app.use(express.static(path.join(__dirname, '/../../public/')));

var bodyParser = require('body-parser'); 

app.use(bodyParser.json());

var loginRoutes = require('./routes/login');

var userRoutes = require('./routes/user');

var mongoService = require('./databases/mongo');

app.use("/app", loginRoutes);

app.use("/user", userRoutes);

app.listen(3124, function () {
  initApp();
  console.log("Listening on 3124 ");
})

function initApp(){
  mongoService.connect().then((success)=>{
    if(success.status){
      console.log(success.message);
      console.log("App init!");
    }else{
      console.log(success.message);
      process.exit(0);
    }
  },(error)=>{
    console.log("Init app down!");
    console.log(error);
    process.exit(0);
  })
}