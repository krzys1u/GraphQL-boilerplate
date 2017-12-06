
exports.example2Resolvers = {
    example2_field: {
        example_subfield(root, args, context) {
            return {
                status: 'ok',
                data: 4
            };
        },
    }
};

exports.example2Root = {
    example: {
        example2_set: function (data, context) { // mutation
            return {
                status: 'ok',
                data: 3
            }
        }
    }
};

