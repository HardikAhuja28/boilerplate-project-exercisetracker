mongoose = require('mongoose');
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://hardik286:mongodbsucks@cluster0.uz7pb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

mongoose.connect(uri, { useNewUrlParser: true });

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique:true
  }
});

const exerciseSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    date: {
        type: Date
    }
});

exports.User = mongoose.model('User', userSchema);
exports.Exercise = mongoose.model('Exercise', exerciseSchema);