const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db_connection');
const app = express();
const cors = require('cors');


const graphqlHTTP = require('express-graphql');
const graphQlSchema = require('./schema');
const graphQlResolvers = require('./index');


var options = {
  origin: "http://localhost:3000"
}


app.use(cors(options));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json()); 

db.authenticate()
  .then(() => console.log("Successful connection"))
  .catch(err => console.log("bad connect"));


app.use('/graphql', (req, res) => {
  return graphqlHTTP({
    schema: graphQlSchema,
    rootValue: graphQlResolvers,
    graphiql: true,
    context: {req, res},
  })(req, res);
});


app.listen(8080, () => {
  console.log(`Server started on port 8080`);
}); 