const express = require('express');
const app = express();
const morgan = require('morgan');
const userModel = require('./models/user');
const connection = require('./config/db');

app.use(morgan('dev'));  // Third party middleware
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.use((req, res, next) => {
  console.log(`This is Middleware`);
  next();
})

app.get('/', (req, res, next) => {
  console.log(req.method);
  res.render('homePage');
})

app.get('/about', (req, res) => {
  res.send("This is a About Page")
})

app.get('/register', (req, res) => {
  res.render('register')
})

app.post('/register', async (req, res) => {
  const { username, email, password } = req.body

  await userModel.create({
    username: username,
    email: email,
    password: password
  })
  res.send("user created");
});


app.get('/updateUser', async (req, res) => {
  try {
    // Correct the typo and handle the asynchronous operation properly
    const result = await userModel.findOneAndUpdate(
      { username: 'a' },  // Search query
      { email: 'sayanduary@gmail.com' },  // Update data
      { new: true }  // Return the updated document instead of the original
    );

    if (result) {
      res.send('User Updated');
    } else {
      res.status(404).send('User not found');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('An error occurred while updating the user');
  }

});

app.get('/users', (req, res) => {
  userModel.find({
    username: 'b',
  }).then((user) => {
    res.send(user);
  })
})

app.get('/deleteUser', async (req, res) => {
  try {

    const result = await userModel.findOneAndDelete({
      username: 'asaas'
    });
    if (result) {
      res.send('User Deleted')
    } else {
      res.status(404).send('User Not Found')
    }

  } catch (err) {

    console.error(err);
    res.status(500).send("An Error Occurred  while updating the user")

  }
});


const PORT = 3001;
app.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`);
});