const {MongoClient, ObjectId} = require('mongodb');
const dotenv = require('dotenv');
const path = require('path');
const url = require("url");

const pathToEnvFile = path.resolve(__dirname, '../../.env');
dotenv.config({path: pathToEnvFile});


const port = process.env.VITE_REACT_DB_PORT;
const uri = `mongodb+srv://${process.env.VITE_REACT_DB_USER_NAME}:${process.env.VITE_REACT_DB_PASSWORD}@cluster0.1sxtc.mongodb.net/?retryWrites=true&w=majority`;


let db;

async function connectToMongoDB() {
    const client = new MongoClient(uri);

    try {
        await client.connect();
        console.log('Connected to MongoDB Atlas');
        db = client.db(process.env.VITE_REACT_DB_NAME);
    } catch (e) {
        console.error('Error connecting to MongoDB Atlas:', e);
        throw e;
    }
}

async function output(language, query, res, searchingMethod) {
    try {
        if (!db) {
            await connectToMongoDB();
        }
        const results = await searchingMethod(language, query);

        res.json(results);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({error: 'An error occurred'});
    }
}

async function searchInDB(collectionName, query, searchByField) {
    try {
        const collection = db.collection(collectionName);
        const querySet = {[searchByField]: {"$regex": query}};
        return await collection.find(querySet).toArray();
    } catch (e) {
        console.error(`Error searching in collection ${collectionName}:`, e);
        throw e;
    }
}

async function searchInCollection(collectionName, query) {
    return await searchInDB(collectionName, query, 'task name')
}

async function searchForContest(collectionName, contest) {
    return await searchInDB(collectionName, contest, 'task url')
}

function generateUnicodePath(query) {
    return query.split('/').map(x => encodeURIComponent(x)).join('/')
}

module.exports = {
    connectToMongoDB,
    output,
    searchInDB,
    searchInCollection,
    searchForContest,
    generateUnicodePath,
}