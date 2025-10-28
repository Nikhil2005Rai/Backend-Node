const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog')
require('dotenv').config();

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
// app.set('views', 'views'); //giving relative folder name (views by default)


//middleware & static files (ex: css, img)
app.use(express.static('public'));
app.use(morgan('dev'));


//mongoose and mono sandbox routes
app.get('/add-blog', (req, res) => {
    const blog = new Blog({
        title: 'new blog',
        snippet: 'about my new blog',
        body: 'more about my new blog (edit)'
    });

    blog.save()
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        });
});

app.get('/all-blogs', (req, res) => {
    Blog.find()
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        });
})

app.get('/single-blog', (req, res) => {
    Blog.findById('6900d1030d625c71dc39739c')
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        });
});

    

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