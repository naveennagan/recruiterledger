var express = require('express');
var router = express.Router();
var expService = require("../services/expService");
var tokenService = require("../services/tokenService");


router.post("/verified", (req, res) => {
    let reqBody = req.body;
    let {token} = reqBody;
    let userObj = tokenService.verifyToken(token);
    if(userObj.status){
        expService.getVerifiedResumes(userObj.data).then((results)=>{
            res.send(results);
        },(e)=>{
            console.log(e)
            res.send({status:false, results:[]})
        })
    }else{
       res.send({status:false,results: []});
    }
 });

 router.post("/pending", (req, res) => {
    let reqBody = req.body;
    let {token} = reqBody;
    let userObj = tokenService.verifyToken(token);
    if(userObj.status){
        expService.getPending(userObj.data).then((results)=>{
            res.send(results);
        },(e)=>{
            console.log(e)
            res.send({status:false, results:[]})
        })
    }else{
       res.send({status:false,results: []});
    }
 });

 router.post("/verify", (req, res) => {
    let reqBody = req.body;
    let {token,claim} = reqBody;
    let userObj = tokenService.verifyToken(token);
    if(userObj.status){
        expService.verifyUser(userObj.data,claim).then((results)=>{
            res.send(results);
        },(error)=>{
            res.send({status:false, message:error});
        });
    }
    else{
        res.send({status:false, message:"not logged in"});
    }
 });

 router.post("/save", (req, res) => {
    let reqBody = req.body;
    let {token, claim} = reqBody;
    let userObj = tokenService.verifyToken(token);
    if(userObj.status){
        expService.createClaim(userObj.data,claim).then((results)=>{
            res.send(results);
        },(error)=>{
            res.send({status:false, message:error});
        });
    }
    else{
        res.send({status:false, message:"not logged in"});
    }
 });


module.exports = router;