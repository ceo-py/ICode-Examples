const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const bcrypt = require('bcrypt');

const pathToEnvFile = path.resolve(__dirname, '../../.env');
dotenv.config({path: pathToEnvFile});

const app = express();
app.use(cors(), express.json(), setUser);

const port = process.env.VITE_REACT_DB_PORT;


const {
    findSingleRecord,
    addUserToDB,
    deleteUserFromDB,
    queryDbEuCollection,
} = require('../src/mongoDB');
const {authUser} = require("./auth/mongoAuth");


const {
    output,
    searchInCollection,
    searchForContest,
    generateUnicodePath,
} = require('../src/mongoTaskDB')


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
    return res.status(200).json({
        message: 'Login successful',
        username
    });
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

async function setUser(req, res, next) {
    const username = req.body.username
    console.log(`Username : `)
    console.log(req.body)
    const user = await findSingleRecord('Users', {username})
    console.log(`Users : `)
    console.log(user)
    if (username === user?.username) req.user = user?.username
    next()
}

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
