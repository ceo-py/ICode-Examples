const express = require('express');
const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');
const path = require('path');

const pathToEnvFile = path.resolve(__dirname, '../../.env');
dotenv.config({ path: pathToEnvFile });

const app = express();
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

async function output (language, query, res, searchingMethod) {
        try {
        if (!db) {
            await connectToMongoDB();
        }
        const results = await searchingMethod(language, query);

        res.json(results);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred' });
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

app.get('/api/search', async (req, res) => {
    const { language, task } = req.query;
    await output(language, task, res, searchInCollection)
});

app.get('/api/contests', async (req, res) => {
    const { language, contest } = req.query;
    await output(language, contest, res, searchForContest)
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
