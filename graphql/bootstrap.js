const {merge} = require('lodash');

const {makeExecutableSchema} = require('graphql-tools');

const requires = [
    './rootSchema',
    './example/exampleModule',
    './example2/example2Module'
];

let schemas = [];
let resolvers = [];
let roots = [];

requires.forEach( (path) => {
   let data = require(path);

   for ( let key in data ) {
       if ( !data.hasOwnProperty(key)){
           continue;
       }

       if ( key.indexOf('Schema') > 0) {
           schemas.push(...data[key]);
       }
       if ( key.indexOf('Resolvers') > 0) {
           resolvers.push(data[key]);
       }
       if ( key.indexOf('Root') > 0) {
           roots.push(data[key]);
       }
   }
});

let schema = makeExecutableSchema({
    typeDefs: schemas,
    resolvers: merge(...resolvers)
});

module.exports = {
    schema,
    rootValue: merge(...roots)
};

