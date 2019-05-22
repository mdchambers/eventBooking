const express = require("express");
const bodyParser = require("body-parser");
const graphqlHttp = require("express-graphql");
const mongoose = require("mongoose");

const graphQlSchema = require("./graphql/schema/index");
const graphQlResolvers = require("./graphql/resolvers/index");

const app = express();

app.use(bodyParser.json());

// const events = [];

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
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });

app.get("/", (req, res, next) => {
  res.send("hello worlds");
});
