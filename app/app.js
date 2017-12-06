
const GraphQlApplication = require('./bootstrap.js');

const config = {
    version: '0.0.1',
    port: 3000,
    graphQl: {
        tracing: true,
        debug: true
    }
};

//@todo initialize config with start parameters and env variables

let app = new GraphQlApplication(config).getApp();

app.listen(app.get('port'));
