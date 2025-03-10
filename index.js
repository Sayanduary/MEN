const express = require('express');
const app = express();
const morgan = require('morgan');

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
  res.render('index')
})

app.post('/register', (req, res) => {
  console.log(req.body);
  res.send('submitted')
})

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`);
});