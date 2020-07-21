let mongoService = require("../databases/mongo");

let userService = {

    isValidUser:(user)=>{
        let {name,password,role} = user;
        return name && password && role;
    },

    createUser: async (user)=>{
        if(!userService.isValidUser(user)){
            return {status: false,message: "Please enter proper details !"};
        }
        try{
        let mongoClient = mongoService.getClient();
        const result = await mongoClient.db("ledger").collection("user").insertOne(user);
        console.log(`New user created with the following id: ${result.insertedId}`);
        user.id = result.insertedId;
        return {status: true , message : "user creation done", user:user };
        } catch(e){
            return {status: false , message : "user creation"};
        }
    },

    checkUserLogin: async (username,password)=>{
        try{
         let mongoClient = mongoService.getClient();
         let user = await mongoClient.db("ledger").collection("user")
         .findOne({ name: username });
         if(user && user.password === password){
            return {status: true , message : "valid user",user};
         }else{
            return {status: false , message : "Not valid user/password"};
         }
        }catch(e){
            return {status: false , message : "Not able to login"};
        }
    }

}

module.exports = userService;