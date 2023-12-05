const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const mongoose = require('mongoose');
const resolvers = require('./GraphQL/resolvers');
const path = require('path');
const fs = require('fs/promises');
const dotenv = require('dotenv');

const pathToEnvFile = path.resolve(__dirname, '../../.env');
dotenv.config({ path: pathToEnvFile });

const app = express();

mongoose.connect(process.env.MONGO_URI, { writeConcern: { w: 'majority' } });



const typeDefsPath = path.join(__dirname, '/GraphQL/schema.graphql');

async function startApolloServer() {
  const typeDefs = gql(await fs.readFile(typeDefsPath, 'utf8'));

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start();

  server.applyMiddleware({ app });
}

startApolloServer();

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
