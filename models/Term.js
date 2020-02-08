const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TermSchema = new Schema({
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
    type: String,
    required: true
  },
  definition: {
    type: Array
  },
  relatedWords: {
    type: Array
  },
  approved: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model("term", TermSchema);
