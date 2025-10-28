const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
require('dotenv').config();

//express app
const app = express();

//connect to mongodb and listen for request

const dbURI = process.env.MONGO_URI;
const port  = process.env.PORT || 3000;

mongoose.connect(dbURI)
    .then((res) => console.log('Connected to MongoDB Atlas'))
    .then(() => app.listen(port, () => console.log(`Server is running on the port ${port}`)))
    .catch(err => console.log(err));

// register view engine
app.set('view engine', 'ejs');

//giving path of view's
// app.set('views', 'views'); //giving relative folder name (views by default)






// app.use((req, res, next) => {
    //     console.log('new request made =>');
    //     console.log('host: ', req.hostname);
    //     console.log('path: ', req.path);
    //     console.log('method: ', req.method);
    //     next();
    // });
    
//middleware & static files (ex: css, img)
app.use(express.static('public'));
app.use(morgan('dev'));

app.get('/', (req, res) => {
    // res.sendFile('./views/index.html', { root: __dirname });
    const blogs = [
  {
    title: "The Journey Begins",
    snippet: "Every great adventure starts with a single step. Here's how I began my blogging journey and what inspired me to write."
  },
  {
    title: "Why Simplicity Wins",
    snippet: "In a world obsessed with complexity, simplicity often leads to the best outcomes. Let’s explore why minimalism matters."
  },
  {
    title: "Building Discipline as a Developer",
    snippet: "Discipline isn’t just about motivation — it’s about habits, focus, and consistency. Here’s how to build it step-by-step."
  },
  {
    title: "Breaking Through Creative Blocks",
    snippet: "Stuck staring at a blank page? Learn practical techniques to overcome creative paralysis and get your ideas flowing again."
  },
  {
    title: "Learning from Failure",
    snippet: "Failure is a teacher disguised as a setback. In this post, I share how my biggest mistakes shaped my growth as a creator."
  }
];

    res.render('index', { title: 'Home', blogs });
});

app.get('/about', (req, res) => {
    // res.sendFile('./views/about.html', { root: __dirname });
    res.render('about', { title: 'About' });
});

// app.get('/about-us', (req, res) => {
//     res.redirect('/about');
// });

app.get('/blogs/create', (req, res) => {
    res.render('create', { title: 'Create a new blog' });
});

app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
});