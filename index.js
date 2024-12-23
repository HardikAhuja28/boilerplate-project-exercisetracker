const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser');
require('dotenv').config()
const {User2, Exercise2} = require('./model.js');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(cors())
app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

app.get('/api/users', async function(req, res){
  let users = await User2.find();
  return res.json(users);
});

app.post('/api/users', async function(req, res){
  let username = req.body.username;
  let newUser = new User2({username: username});
  let result
  try{
    result = await newUser.save();
  }catch(err){
    return res.json(err);
  }
  return res.json(result);
});

app.post('/api/users/:_id/exercises', async function(req, res){
  let userId = req.params._id,
   description = req.body.description,
   user, result

  try {
    user = await User2.findById(userId)
  } catch (err) {
    return res.json({error: 'User not found'});
  }
  
  let newExercise = new Exercise2({
    userId:userId, description, duration,
    date: date ? new Date(date) : new Date()
  });
  try {
    result = await newExercise.save();
  }catch(err){
    return res.json(err);
  }
  
  return res.json({
    ...user._doc,
    description: result.description,
    duration: result.duration,
    date: result.date.toDateString()
  });
})

app.get('/api/users/:_id/logs', async function(req, res){
  let userId = req.params._id,
    {from, to, limit} = req.query,
    user,
    exercises 
  try{
    user = await User2.findById(userId);
    exercises = await Exercise2.find({userId: userId, date: {$gte: from, $lte: to}}, null, {limit: limit});
  }
  catch(err){
    return res.json({error: 'User not found'});
  }
  return res.json({
    ...user._doc, 
    log: exercises,
    count: exercises.length
  });
});

app.post('/api/clearDb', async function(req, res){
  await User2.deleteMany({});
  await Exercise2.deleteMany({});
  return res.json({message: 'Database cleared'});
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
