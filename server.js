const express = require('express'); 
const hbs = require('hbs'); 
const fs = require('fs');

var app = express();

app.set('View engine', 'hbs');

//middleware
app.use(express.static(__dirname+ '/public'));


app.use((req, res, next)=>{
    var temp = new Date().toString();
    log = `Request made at ${temp}, ${req.url} ${req.method}`;
    fs.appendFile('server.log', log + '\n' , (err) => {
        if (err) throw err;
    });
    console.log(temp, req.url, req.method);
    next();
});

// app.use((req, res, next)=>{
//     res.render('maintenance.hbs');
// });

hbs.registerPartials(__dirname+ '/views/partials');

hbs.registerHelper('currentMonth', ()=>{

    return new Date().getMonth();
});

hbs.registerHelper('upper', (text)=>{

    return text.toUpperCase();
});

app.get('/', (req, res)=>{
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Hello to your new website',
        yearDate: new Date().getFullYear()
    });
});

app.get('/about', (req, res)=>{
    res.render('about.hbs', {
        pageTitle: 'About Page (offcial)',
        yearDate: new Date().getFullYear()
    });
});



app.listen(3000, ()=>{
    console.log('Server is starting on port 3000 ')
});

