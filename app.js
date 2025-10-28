const express = require('express');

//express app
const app = express();

// register view engine
app.set('view engine', 'ejs');

//giving path of view's
// app.set('views', 'views'); //giving relative folder name (views by default)

//listen for request
app.listen(3000);

app.get('/', (req, res) => {
    // res.sendFile('./views/index.html', { root: __dirname });
    res.render('index');
});

app.get('/about', (req, res) => {
    // res.sendFile('./views/about.html', { root: __dirname });
    res.render('about');
});

// app.get('/about-us', (req, res) => {
//     res.redirect('/about');
// });

app.get('/blogs/create', (req, res) => {
    res.render('create');
});

app.use((req, res) => {
    res.status(404).render('404');
});