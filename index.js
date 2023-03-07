const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const dotenv=require('dotenv');
const bcrypt = require('bcrypt');


const User = require('./model/User');
dotenv.config({ path:'./config.env' })
require('./db/db');

const app = express();
const PORT = process.env.PORT || 5000;


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



const JWT_SECRET = 'secret';

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  const isPasswordMatch = await bcrypt.compare(password, user.password);
      if (!isPasswordMatch) {
        return res.status(400).json({ message: 'Incorrect password' });
      }

  const token = jwt.sign({ email }, JWT_SECRET);

  res.json({ token });
});


app.post('/profile', async (req, res) => {
  const { email, name, age, sport, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);


  const user = new User({ email, name, age , sport, password: hashedPassword });

  try {
    await user.save();
    res.json({ message: 'Profile created successfully' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


app.put('/profile', async (req, res) => {
  const { email, name, age ,sport} = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404
).json({ message: 'User not found' });
}

if (name) {
user.name = name;
}
if (age) {
user.age = age;
}
if (sport) {
user.sport = sport;
}

try {
await user.save();
res.json({ message: 'Profile updated successfully' });
} catch (err) {
res.status(400).json({ message: err.message });
}
});


app.get('/users', async (req, res) => {
const users = await User.find();
res.json(users);
});


app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`);
});