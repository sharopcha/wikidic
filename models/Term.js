const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TermSchema = new Schema({
    approvedBy: {
        type: Schema.Types.ObjectId,
        ref: 'users' 
    },
    approved: {
        type: Boolean,
        default: null
    },
    createdBy: {
        type: String,
    },
    term: {
        type: String,
        required: true
    },
    definition: {
        type: Array,
        required: true
    },
    relatedWords: {
        type: Array,
    }
});

module.exports = mongoose.model('term', TermSchema);