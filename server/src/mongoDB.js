const {MongoClient, ObjectId} = require("mongodb");
const dotenv = require('dotenv');
const path = require('path');
const bcrypt = require('bcrypt');

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

async function searchInDBEU(collectionName, query, searchByField) {

    const collection = await connectToCollection(collectionName);
    const querySet = {[searchByField]: {"$regex": query}};
    return await collection.find(querySet).toArray();

}

async function findSingleRecord(collectionName, query) {
    const collection = await connectToCollection(collectionName);
    return await collection.findOne(query)
}

async function addUserToDB(collectionName, {username, password}) {
    const collection = await connectToCollection(collectionName);
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        const result = await collection.insertOne(
            {
                username,
                password: hashedPassword
            }
        )
        await addUserProfile(result.insertedId, username)
    } catch (e) {
        if (e.code === 11000) {
            const output = `Duplicate Username ${username}`
            console.log(output);
            return output
        } else {
            throw new Error(e);
        }
    }
    const output = `Added Username to DB : ${username}`
    console.log(output)
    return output
}

async function addUserProfile(userId, displayName) {
    const collection = await connectToCollection(process.env.VITE_REACT_DB_USERPROFILE);

    try {
        await collection.insertOne({
            userId: new ObjectId(userId),
            displayName,
            email: '',
            avatarUrl: '',
            youtubeLink: '',
            githubLink: '',
            about: '',
        });

        console.log(`Added user profile for user with ID ${userId}`);
    } catch (e) {
        if (e.code === 11000) {
            console.error(`User profile already exists for user with ID ${userId}`);
        } else {
            console.error(`Error adding user profile: ${e.message}`);
        }
    }
}

async function deleteUserFromDB(collectionName, username) {
    const collection = await connectToCollection(collectionName);
    try {
        const result = await collection.findOne({username});
        if (!result) {
            const output = `User not found : ${username}`;
            console.log(output);
            return output;
        } else {
            const output = `Deleted User : ${username}`;
            await collection.deleteOne({username: username});
            const collectionProfie = await connectToCollection(process.env.VITE_REACT_DB_USERPROFILE);
            collectionProfie.deleteOne({userId: result._id});
            console.log(output);
            return output;
        }
    } catch (e) {
        throw new Error(e);
    }
}

async function queryDbEuCollection(res, collectionName, query, searchByField) {
    const results = await searchInDBEU(collectionName, query, searchByField);
    res.json(results)
}

// eslint-disable-next-line no-undef
module.exports = {
    connectToCollection,
    searchInDBEU,
    findSingleRecord,
    addUserToDB,
    addUserProfile,
    deleteUserFromDB,
    queryDbEuCollection,
}