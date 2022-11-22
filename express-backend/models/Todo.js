const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PostSchema = new mongoose.Schema(
  {
    title: {type: String, required: true},
    description: {type: String, required: true,},
    author: {type: Schema.Types.ObjectId, ref: 'User'},
    dateCreated: {type: Date, default: Date.now()}, 
    complete: {type: Boolean, default: true},
    dateCompleted: {type: Date, default: ""}
  }
);

//Export model
module.exports = mongoose.model('Todo', PostSchema);
 