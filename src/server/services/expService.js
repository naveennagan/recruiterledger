let mongoService = require("../databases/mongo");
let ObjectId = require("mongodb").ObjectId;

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

    verifyUser: async (user,claim)=>{
        try{
         let mongoClient = mongoService.getClient();
        
         let experience = await mongoClient.db("ledger").collection("experience")
         .findOne({ name: user.name });

         if(claim.claim === experience.company){
            claim.points = claim.points+30;
         }
         else{
            claim.points = claim.points+10;
         }

         if(claim.points >= 100){
            let exp = await mongoClient.db("ledger").collection("experience")
            .findOne({ name: claim.name });
            exp.company = claim.claim;
            let companies = exp.experience;
            if(companies.indexOf(claim.claim) == -1){
                companies.push(claim.claim);
            }
            exp.companies = companies;

            const result = await mongoClient.db("ledger").collection("experience")
                        .updateOne({ name: claim.name },
                                    { $set: {company: claim.claim, experience: companies} },
                                    { upsert: true });

            console.log(`${result.matchedCount} document(s) matched the query criteria.`);

            console.log(`${result.modifiedCount} document(s) was/were updated.`);    
            
            const res = await mongoClient.db("ledger").collection("pending")
            .deleteOne({ name:claim.name, claim: claim.claim });

            console.log(`${res.deletedCount} document(s) was/were deleted.`);

            return {status: true, message: "Update experience !"};
         }
         else{
            const result = await mongoClient.db("ledger").collection("pending")
            .updateOne({ name: claim.name, claim: claim.claim },
                        { $set: {points: claim.points} },
                        { upsert: true });

            console.log(`${result.matchedCount} document(s) matched the query criteria.`);

            console.log(`${result.modifiedCount} document(s) was/were updated.`);         

            return {status: true, message: "Update claims !"};
         }

        }catch(e){
            return {status: false , message : "Not able to login"};
        }
    },

    createClaim: async (user,claim)=>{
        try{
         let mongoClient = mongoService.getClient();

         let claimData = {
            name: user.name,
            claim: claim,
            points: 2
        }
        

         const result = await mongoClient.db("ledger").collection("pending").insertOne(claimData);

         console.log(`New claim created with the following id: ${result.insertedId}`);

         return {status: true, message: "Created claims !"};

        }catch(e){
            return {status: false , message : "Not able to login"};
        }
    }
    

}

module.exports = expService;