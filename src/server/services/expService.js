let mongoService = require("../databases/mongo");

let expService = {

    isValidUser:(user)=>{
        let {name,password,role} = user;
        return name && password && role;
    },

    getVerifiedResumes: async (user)=>{
        try{
        let mongoClient = mongoService.getClient();
        const cursor =  mongoClient.db("ledger").collection("experience").find({});
        const results = await cursor.toArray();
        return {status:true, results:results};
        } catch(e){
            return {status: false , results: [], message : "user creation"};
        }
    },

    getPending: async (user)=>{
        try{
        let mongoClient = mongoService.getClient();
        const cursor =  mongoClient.db("ledger").collection("pending").find({});
        const results = await cursor.toArray();
        return {status:true, results:results};
        } catch(e){
            return {status: false , results: [], message : "user creation"};
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

module.exports = expService;