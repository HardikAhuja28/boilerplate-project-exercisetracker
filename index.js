const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser');
require('dotenv').config()
const {User, Exercise} = require('./model.js');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(cors())
app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

app.get('/api/users', async function(req, res){
  let users = await User.find();
  return res.json(users);
});

app.post('/api/users', async function(req, res){
  let username = req.body.username;
  let newUser = new User({username: username});
  let result = await newUser.save();
  return res.json(result);
});

app.post('/api/users/:_id/exercises', async function(req, res){
  let userId = req.params._id;
  let description = req.body.description;
  let duration = req.body.duration;
  let date = req.body.date || new Date();
  let newExercise = new Exercise({userId, description, duration, date});
  let result = await newExercise.save();
  return res.json(result);
})

app.get('/api/users/:_id/logs', async function(req, res){
  let userId = req.params._id;
  let from = req.query.from;
  let to = req.query.to;
  let limit = req.query.limit;
  let user = await User.findById(userId);
  let exercises = await Exercise.find({userId});
  if(from){
    exercises = exercises.filter(exercise => exercise.date >= new Date(from));
  }
  if(to){
    exercises = exercises.filter(exercise => exercise.date <= new Date(to));
  }
  if(limit){
    exercises = exercises.slice(0, limit);
  }
  return res.json({
    ...user, 
    log: exercises,
    count: exercises.length
  });
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
