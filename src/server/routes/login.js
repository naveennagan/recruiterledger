var express = require('express');
var router = express.Router();
var userService = require("../services/userService");
var tokenService = require("../services/tokenService");


router.post("/verify", (req, res) => {
    let reqBody = req.body;
    let {token} = reqBody;
    let userObj = tokenService.verifyToken(token);
    res.send(userObj);
 });


router.post("/login", (req, res) => {
   let reqBody = req.body;
   let {name,password} = reqBody;
   userService.checkUserLogin(name,password).then((success)=>{
        if(success && success.status){
            let user = success.user;
            delete user["password"];
            let token = tokenService.createToken(user);
            success.token = token;
        }
        res.send(success);
    },(error)=>{
        res.send({status:false, message:error});
    });
});

router.post("/register", (req, res) => {
    let reqBody = req.body;
    let {username,password,role} = reqBody;
    userService.createUser({name:username,password,role}).then((success)=>{
        res.send(success);
    },(error)=>{
        res.send({status:false, message:error});
    });
 });



module.exports = router;