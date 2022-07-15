// mongodb server
// import controller: 
const { MongoClient } = require('mongodb');
const mongoose = require('mongoose');
//allows to use environment variables in .env file
require('dotenv').config()

//returns the client, once you have the client, format: client.db("dbname").collection("collectionname")
module.exports.connectToMongoDB = async() => {

    const uri = process.env.MONGO_URI;

    const client = new MongoClient(uri);

    try {
        return (await client.connect()); // need to await client.close();
    } catch (e) {
        console.error(e);
    }
}

//list databases
module.exports.listDatabases = async(client) => {
    const databasesList = await client.db().admin().listDatabases();

    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
}

// const connectToMongoDB = async () => {
//     await mongoose.connect(process.env.MONGO_URI);
//     console.log('DB Connected!')
// }

// module.exports = {
//     connectToMongoDB
// };