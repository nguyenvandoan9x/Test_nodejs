const mongoose = require('mongoose');

async function connectDB(){
  await mongoose.connect('mongodb://127.0.0.1 /shops', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});

}

module.exports = connectDB