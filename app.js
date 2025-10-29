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

//blog routes
app.get('/blogs', (req, res) => {
    Blog.find().sort({ createdAt: -1 })
        .then((result) => {
            res.render('index', {
                title: 'All Blogs',
                blogs: result
            })
        })
        .catch((err) => {
            console.log(err);
        });
});

app.post('/blogs', (req, res) => {
    const blog = new Blog(req.body);

    blog.save()
        .then((result) => {
            res.redirect('/blogs');
        })
        .catch((err) => {
            console.log(err);
        });

});

app.get('/blogs/create', (req, res) => {
    res.render('create', { title: 'Create a new blog' });
});

app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
});