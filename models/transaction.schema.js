const assert = require('assert');
let Schema = null;

function init() {
    const transactionSchema = new Schema({
        type: {
            type: String,
            required: true,
        },
        transaction_id: {
            type: Number,
            required: true,
            unique: true
        },
        parent_id: {
            type: Number,
        },
        amount: {
            type: Number,
            required: true
        },
    }, {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    });
    return transactionSchema;
}

module.exports = (schema) => {
    assert.ok(schema);
    Schema = schema;
    return init();
};