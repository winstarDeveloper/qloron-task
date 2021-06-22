const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, 'You must have a Name'],
      maxlength: [50, 'Name cannot exceed 50 characters'],
      minlength: [2, 'Name must have atleast 2 characters']
    }
  });
  
  const DataModel = mongoose.model('Names', dataSchema);

  module.exports = DataModel;