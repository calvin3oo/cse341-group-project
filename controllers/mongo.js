//mongodb server
//import controller: const mongo = require('./controllers/mongo.js');
// const { MongoClient } = require('mongodb');
// //allows to use environment variables in .env file
// require('dotenv').config()

// //returns the client, once you have the client, format: client.db("dbname").collection("collectionname")
// async function connectToMongoDB() {

//     const uri = process.env.MONGO_URI;

//     const client = new MongoClient(uri);

//     try {
//         return (await client.connect()); // need to await client.close();
//     } catch (e) {
//         console.error(e);
//     }
// }

// //list databases
// async function listDatabases(client) {
//     const databasesList = await client.db().admin().listDatabases();

//     databasesList.databases.forEach(db => console.log(` - ${db.name}`));
// }

// module.exports = {
//     connectToMongoDB
// }

const mongoose = require('mongoose');
require('dotenv').config();

const connectToMongoDB = async () => {
    await mongoose.connect('mongodb+srv://calvin3oo:calvin3oo@firstcluster.fi1s9.mongodb.net/?retryWrites=true&w=majority');
    console.log('DB Connected!')
}

module.exports = connectToMongoDB;