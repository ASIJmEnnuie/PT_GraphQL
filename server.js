var graphql = require ('graphql').graphql
var express = require('express')
var graphQLHTTP = require('express-graphql')
var Schema = require('./schema')
//var query = 'query { users { id, pseudo, age } }'

/*graphql(Schema, query).then( function(result) {
  console.log(JSON.stringify(result));
});

var app = express()
  .use('/', graphQLHTTP({ schema: Schema, pretty: true }))
  .listen(3000, function (err) {
    console.log('GraphQL Server is now running on localhost:3000');
  });*/
var app = express();

app.use('/', graphQLHTTP({
  schema: Schema,
  pretty: true,
  graphiql: true
}));
app.listen(process.env.PORT || 8080, (err) => {
  if (err)
    return console.error(err);
  console.log(`GraphQL Server is now running on localhost:${process.env.PORT || 8080}`);
});
