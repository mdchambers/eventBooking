const express = require("express");
const bodyParser = require("body-parser");
const graphqlHttp = require("express-graphql");
const mongoose = require("mongoose");
const cors = require('cors');

const graphQlSchema = require("./graphql/schema/index");
const graphQlResolvers = require("./graphql/resolvers/index");
const isAuth = require('./middleware/isAuth');
const app = express();

app.use(bodyParser.json());

// Bypass CORS protections
// Options needed for pre-flight check, as this request is a POST
app.use(cors());
app.options('*', cors())

// Authentication middleware
app.use(isAuth);


// ManuallyAdd middleware to allow CORS - WORKS
// Also solved by cors package
// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', '*')
//   res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS')
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
//   if(req.method === 'OPTIONS'){
//     console.log("status 200");
//     return res.sendStatus(200);
//   }
//   next();
// })

app.use(
  "/graphql",
  graphqlHttp({
    schema: graphQlSchema,
    rootValue: graphQlResolvers,
    graphiql: true
  })
);

const mongoUser = process.env.MONGO_USER;
const mongoPwd = process.env.MONGO_PASSWORD;
const mongoDB = process.env.MONGO_DB;
// console.log(mongoUser, mongoPwd);
const mongoURL = `mongodb+srv://${mongoUser}:${mongoPwd}@event-site-xfhq5.mongodb.net/${mongoDB}?retryWrites=true`;
// console.log(mongoURL);
mongoose
  .connect(mongoURL, { useNewUrlParser: true })
  .then(() => {
    app.listen(8000);
  })
  .catch(err => {
    console.log("Error connecting to mongo");
    console.log(err);
  });

app.get("/", (req, res, next) => {
  res.send("hello worlds");
});
