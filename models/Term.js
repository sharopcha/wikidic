const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TermSchema = new Schema({
  created: {
    name: {
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
  approved: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model("term", TermSchema);
