const {MongoClient, MongoServerError} = require('mongodb');
const dotenv = require('dotenv');
const path = require('path');

const pathToEnvFile = path.resolve(__dirname, '../../.env');
dotenv.config({path: pathToEnvFile});

const [user, password] = [process.env.VITE_REACT_API_DB_USER_NAME_EU_LOG, process.env.VITE_REACT_DB_PASSWORD_EU_LOG]

const uriEU = `mongodb+srv://${user}:${password}@cluster0.9cewhel.mongodb.net/?retryWrites=true&w=majority`;

let dbEU;


async function connectToMongoDBEU() {
    const client = new MongoClient(uriEU);
    try {
        await client.connect();
        console.log('Connected to MongoDB Atlas');
        dbEU = client.db('ICode-Examples');

    } catch (e) {
        console.error('Error connecting to MongoDB Atlas:', e);
        throw e;
    }
}

async function connectToCollection(collectionName) {

    if (!dbEU) {
        await connectToMongoDBEU();
    }
    const collections = await dbEU.listCollections().toArray();
    const existingCollection = collections.find((collection) => collection.name === collectionName);

    if (!existingCollection) {
        throw new Error(`Collection ${collectionName} does not exist.`);
    }

    return dbEU.collection(collectionName)

}

async function searchInDB(collectionName, query, searchByField) {

    const collection = await connectToCollection(collectionName);
    const querySet = {[searchByField]: {"$regex": query}};
    return await collection.find(querySet).toArray();

}

async function addUserToDD(collectionName, {username, password}) {
    const collection = await connectToCollection(collectionName);

    try {
        await collection.insertOne(
            {
                'username': username.toLowerCase(),
                password
            }
        )
    } catch (e) {
        if (e.code === 11000) {
            console.log(`Duplicate Username ${username}`);
            return
        } else {
            throw new Error(e);
        }
    }
    console.log(`Added Username to DB : ${username}`)


}

async function queryDbEuCollection(collectionName, query, searchByField) {
    // const collection = await connectToCollection(collectionName);
    // collection.createIndex({ username: 1 }, { unique: true });


    const results = await searchInDB(collectionName, query, searchByField);
    console.log(results)

}


addUserToDD('Users', {
    username: 'Test3',
    password: 'test2'
})
// addUserToDD('Users', {
//     username: 'Test2',
//     password: 'test2'
// })

// queryDbEuCollection('Users', 'Test', 'username')
