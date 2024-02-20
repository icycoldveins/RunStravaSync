const mongoose = require("mongoose");
const suggestionSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
});

const Suggestion = mongoose.model('Suggestion', suggestionSchema);

export default Suggestion;