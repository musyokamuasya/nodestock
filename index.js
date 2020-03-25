const express = require('express');
const app = express();
const request = require("request");
const exphbs  = require('express-handlebars');
const path = require('path');
const bodyParser = require('body-parser');

const PORT = process.env.PORT||5000;


// Use body parser middleware
app.use(bodyParser.urlencoded({extended: false}));


app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// IEK APIs
// API Token: pk_2d5e072944934e17893ee7396ea3dbd8 
// Account No. edf918ea98e365a78c08fd91c7ccf3

function call_api(finishedAPI){


request('https://cloud.iexapis.com/stable/stock/fb/quote?token=pk_2d5e072944934e17893ee7396ea3dbd8', {json: true},(err, res, body)=>{
    if(err){return console.log(err);}

    if(res.statusCode===200){
        // console.log(body);
        finishedAPI(body);
    }
});
}

//Set Handlebar GET route
app.get('/', function (req, res) {
   call_api(function(doneAPI){
       res.render('home', {
           stock:doneAPI
       });
   });
});

// Set handlebars POST route
app.get('/', function (req, res) {
    call_api(function(doneAPI){
        posted_stuff = req.body.stock_ticker;
        res.render('home', {
            stock:doneAPI,
            posted_stuff: posted_stuff
        });
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