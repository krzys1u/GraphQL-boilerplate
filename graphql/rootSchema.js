let {jsonScalarType, customString} = require('./jsonScalarType');
let path = require('path');
let fs = require('fs');

const BigIntType = require('graphql-bigint');

exports.rootSchema = [fs.readFileSync(path.join(__dirname) + '/rootSchema.graphqls', 'utf8')];

exports.rootResolvers = {
    BigInt: BigIntType,
    JSON: jsonScalarType,
    ApplicationRoot: {
        exampleRoot(root, args, context) {
            return {};
        },
        example2Root(root, args, context) {
            return {};
        },

        api_info(root, args, context) {
            return {
                version: context.config.version
            }
        }
    }
};
