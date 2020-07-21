let mongoUri = "mongodb+srv://naveen:root123@cluster0.ugrwq.mongodb.net/<dbname>?retryWrites=true&w=majority";

const {MongoClient} = require('mongodb');

let client;

let mongoClient = {
    connect: async ()=>{
       try{ 
        client = new MongoClient(mongoUri);
        let connectStatus = await client.connect();
        let dbs = await client.db().admin().listDatabases();
        console.log(dbs);
        return {status: "Mongo connected!"};
       }catch(e){
           return {status: "Mongo cannot be connected to !"};
       }
    },
    getClient:()=>{
      return client;
    }
};

module.exports = mongoClient;