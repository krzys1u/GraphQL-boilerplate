
exports.exampleResolvers = {
    example_field: {
        example_subfield(root, args, context) {
            return {
                status: 'ok',
                data: 2
            };
        }
    }
};

exports.exampleRoot = {
    example: {
        example_set: function (data, context) { // mutation
            return {
                status: 'ok',
                data: 1
            }
        }
    }
};

