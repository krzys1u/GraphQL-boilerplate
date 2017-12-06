const DataLoader = require('dataloader');

module.exports = (context) => {
    return {
        exampleDataLoader: new DataLoader((input) => { // return values must has the same length as input
            return input
        })
    }
};


