const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRouts')
require('dotenv').config();
const path = require('path');


//express app
const app = express();

//connect to mongodb and listen for request

const dbURI = process.env.MONGO_URI;
const port  = process.env.PORT || 3000;
 
const startServer = async () => {
  try {
    await mongoose.connect(dbURI);
    console.log('Connected to MongoDB Atlas');
    app.listen(port, () => console.log(`Server running on port ${port}`));
  } catch (err) {
    console.error('MongoDB connection error:', err);
  }
};
startServer();



// register view engine
app.set('view engine', 'ejs');
//giving path of view's
app.set('views', path.join(__dirname, 'views'));

// app.set('views', 'views'); //giving relative folder name (views by default)


//middleware & static files (ex: css, img)
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
    
//routes
app.get('/', (req, res) => {
    // res.sendFile('./views/index.html', { root: __dirname });
   res.redirect('/blogs');
});

app.get('/about', (req, res) => {
    // res.sendFile('./views/about.html', { root: __dirname });
    res.render('about', { title: 'About' });
});

app.get('/blogs/create', (req, res) => {
    res.render('blogs/create', { title: 'Create a new blog' });
});

app.use('/blogs', blogRoutes);

app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
});