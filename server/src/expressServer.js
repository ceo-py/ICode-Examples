const express = require('express');
const {MongoClient} = require('mongodb');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const bcrypt = require('bcrypt');
const url = require("url");

const pathToEnvFile = path.resolve(__dirname, '../../.env');
dotenv.config({path: pathToEnvFile});

const app = express();
app.use(cors(), express.json());
const port = process.env.VITE_REACT_DB_PORT;
const uri = `mongodb+srv://${process.env.VITE_REACT_DB_USER_NAME}:${process.env.VITE_REACT_DB_PASSWORD}@cluster0.1sxtc.mongodb.net/?retryWrites=true&w=majority`;


const [user, password] = [process.env.VITE_REACT_API_DB_USER_NAME_EU_LOG, process.env.VITE_REACT_DB_PASSWORD_EU_LOG]

const uriEU = `mongodb+srv://${user}:${password}@cluster0.9cewhel.mongodb.net/?retryWrites=true&w=majority`;

let dbEU;

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

// mongo db EU

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
        await collection.insertOne(
            {
                username,
                password: hashedPassword
            }
        )
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

async function deleteUserFromDB(collectionName, username) {
    const collection = await connectToCollection(collectionName);
    try {
        const result = await collection.deleteOne({username: username});
        if (result.deletedCount === 0) {
            const output = `User not found : ${username}`;
            console.log(output);
            return output;
        } else {
            const output = `Deleted User : ${username}`;
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

app.post('/api/login', async (req, res) => {
    const {username, password} = req.body;

    const user = await findSingleRecord('Users', {username});

    if (!user) {
        console.log(`${username} Authentication failed`)
        return res.status(401).json({message: 'Authentication failed'});
    }

    const isPasswordValid = await bcrypt.compare(password, user?.password);

    if (!isPasswordValid) {
        console.log(`${username} Authentication failed`)
        return res.status(401).json({message: 'Authentication failed'});
    }
    console.log(`${username} Login successful`)
    return res.status(200).json({message: 'Login successful'});
});

app.get('/api/users', async (req, res) => {
    await queryDbEuCollection(res, 'Users', '', 'username')
});

app.delete('/api/users/:username', async (req, res) => {
    const username = req.params.username;
    const result = await deleteUserFromDB('Users', username);
    if (result) {
        res.status(200).json({message: result});
    } else {
        res.status(404).json({message: 'User not found'});
    }
});

app.post('/api/users', async (req, res) => {
    const {username, password} = req.query;
    await addUserToDB('Users', {username, password})
});

app.get('/api/search', async (req, res) => {
    const {language, task} = req.query;
    await output(language, task, res, searchInCollection)
});

app.get('/api/contests', async (req, res) => {
    const {language, contest} = req.query;
    await output(language, generateUnicodePath(contest), res, searchForContest)
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
