var express = require('express');
var app = express();

const { Sequelize, DataTypes } = require('sequelize');
// Option 2: Passing parameters separately (sqlite)
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'database.sqlite'
});

const Comments = sequelize.define('Comments', {
  // Model attributes are defined here
  content: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  // Other model options go here
});

(async() => {
await Comments.sync();
console.log();
})();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// set the view engine to ejs
app.set('view engine', 'ejs');

// use res.render to load up an ejs view file

// index page
app.get('/', async function(req, res) {

  // Find all users
  const comments = await Comments.findAll();

  res.render('index',{ comments: comments});
});

app.post('/create', async function(req, res) {

  const { content } = req.body

    // Create a new user
  await Comments.create({ content: content });

  res.redirect('/')
});

app.post('/update/:id', async function(req, res) {

  const { content } = req.body
  const { id } = req.params

  // Change everyone without a last name to "Doe"
await Comments.update({ content: content }, {
  where: {
    id: id
  }
});

  res.redirect('/')
});

app.post('/delete/:id', async function(req, res) {
  const { content } = req.body
  const { id } = req.params

  // Delete everyone named "Jane"
  await Comments.destroy({
    where: {
      id: id
    }
  });

  res.redirect('/')
});


// about page
app.get('/about', function(req, res) {
  res.render('about');
});

app.listen(3000);
console.log('Server is listening on port 3000');