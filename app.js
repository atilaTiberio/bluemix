var express = require('express');
var bodyParser = require('body-parser');
var cfenv = require('cfenv');
var watsonAPI = require('./src/model/watsonApi.js');
var app = express();

var port = process.env.PORT || 5000;

var apiRouter = require('./src/routes/apiRoutes');
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.set('views','./src/views');
app.set('view engine','ejs');

app.use('/api',apiRouter);
app.get('/',function(req,res){
    console.log('Hello World');
    var appenv= cfenv.getAppEnv();
    console.log(appenv);
    console.log(appenv.getServiceCreds("toneAnalyzer_horaciodemo"));
    res.send('Hello World');
});
app.get('/ui',function(req,res){
  res.render('index', {
      'text': '',
      'tones': [],
  });
});
app.listen(port, function(err){
   console.log('running on server on port:'+port);
});
