const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TermSchema = new Schema({
    approvedBy: {
        type: Schema.Types.ObjectId,
        ref: 'users' 
    },
    created: {
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true   
        },
        email: {
            type: String,
            required: true
        }  
    },
    term: {
        approved: {
            type: Boolean
        },
        term: {
            type: String,
            required: true
        }
    },
    definition: {
        type: Array
    },
    relatedWords: {
        type: Array,
    }
});

module.exports = mongoose.model('term', TermSchema);