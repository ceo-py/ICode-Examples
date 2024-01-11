const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const mongoose = require('mongoose');
const resolvers = require('./GraphQL/resolvers');
const path = require('path');
const fs = require('fs/promises');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');

const pathToEnvFile = path.resolve(__dirname, '../../.env');
dotenv.config({ path: pathToEnvFile });

const app = express();
app.use(helmet());
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: true,
    saveUninitialized: false,
    cookie: {
      secure: true, 
    },
  })
);
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));


mongoose.connect(process.env.MONGO_URI, { writeConcern: { w: 'majority' } }).catch(error => console.error('Connection ERROR:\n', error));




const typeDefsPath = path.join(__dirname, '/GraphQL/schema.graphql');

async function startApolloServer() {
  const typeDefs = gql(await fs.readFile(typeDefsPath, 'utf8'));

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req, res }) => ({ req, res }),
    cors: {
      origin: 'http://localhost:5173',
      credentials: true,
    },
  });

  await server.start();

  server.applyMiddleware({ app, cors: false });
}

startApolloServer();

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
