const express = require('express');
const app = express();
const exphbs  = require('express-handlebars');
const path = require('path');
const PORT = process.env.PORT||5000;





app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// IEK APIs
// API Token: pk_2d5e072944934e17893ee7396ea3dbd8 
// Account No. edf918ea98e365a78c08fd91c7ccf32f 
 

//Main page route
app.get('/', function (req, res) {
    res.render('home', {

    });
});
// About Page route
app.get('/about.html', function (req, res) {
    res.render('about', {
        
    });
});

app.use(express.static(path.join(__dirname, 'public')));


app.listen(PORT, () => {
    console.log('App listening on port 5000!');

});