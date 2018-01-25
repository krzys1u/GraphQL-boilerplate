const express = require("express");

const {graphqlExpress, graphiqlExpress} = require('graphql-server-express');

const {schema, rootValue} = require('./graphql/bootstrap');

const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');

class GraphQlApplication{
    app = null;

    middlewares = [
        bodyParser.json(),
        cookieSession({
            name: 'session',
            keys: ['as890foij23r9lkmzoip3ponoi211ad'],
            maxAge: 72 * 60 * 60 * 1000 // 72 hours
        }),
        (err, req, res, next) => {
            console.error('Application error: ', err); //@todo log errors to file - logger
            res.status(err.status || 500).render('error', { //@todo preety error pages
                message: err.message,
                error: err
            });
        }
    ];

    loaders = [
        {name: 'exampleLoader', path: './graphql/example/exampleLoaders'}
    ];

    constructor(config){
        this.app = express;
        this.config = config;

        this.setUp()
    }

    getApp(){
        return this.app;
    }

    getConfig(){
        return this.config;
    }

    setUp() {

        this.app.set('port', this.config.port); //@todo add port get from start process parameters
        //@todo add logger - morgan

        this.registerCommonHandlers();

        this.applyMiddlewares();

        this.initGraphQl();
    }

    applyMiddlewares(){
        this.middlewares.forEach((middleware) => this.app.use(middleware));
    }

    registerCommonHandlers(){
        this.app.get('/hellp', (req, res) => {
            res.send('hello world');
        });
    }

    initLoaders(context) {
        let ret = {};

        this.loaders.forEach((loader) => {
            if (!this.cachedLoaders[loader.name]){
                this.cachedLoaders[loader.name] = require(loader.path)(context);
            }

            ret[loader.name] = this.cachedLoaders[loader.name];
        });

        return ret;
    }

    initGraphQl(){
        this.app.use('/api', graphqlExpress(async (req, res) => {
            let loaders = this.initLoaders({req});

            return {
                schema: schema,
                rootValue: rootValue,
                tracing: this.config.graphQl.tracing,
                debug: this.config.graphQl.debug,

                context: {
                    request: req,
                    config: this.config,
                    loaders: loaders
                },
            };
        }));

        this.app.use('/tester', graphiqlExpress({endpointURL: 'api'}));
    }
}

module.exports = GraphQlApplication;
