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

const userSchema2 = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique:true
  }
});

const exerciseSchema2 = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        unique:false
    },
    description: {
        type: String,
        required: true,
        unique:false
    },
    duration: {
        type: Number,
        required: true,
        unique:false
    },
    date: {
        type: Date
    }
});

exports.User2 = mongoose.model('User2', userSchema2);
exports.Exercise2 = mongoose.model('Exercise2', exerciseSchema2);