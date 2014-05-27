var express = require('express'),
    passport = require('passport'),
    bauth = require('passport-http').BasicStrategy;
    lauth = require('passport-local').Strategy;
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    path = require('path');

var db = require('./models.js');

passport.serializeUser(function(user, done){
  done(null, user);
});

passport.deserializeUser(function(user, done){
  done(null, user);
});

passport.use(new bauth({},
  function(username, password, done){
    //TODO process.nextTick
    if(username == 'admin' && password == 'delta'){
      done(null, username);
    }else{
      done(null, false);
    }
  }
));

passport.use(new lauth(
    function(username, password, done){
      if(username == "vivek" && password == "hello"){
        return done(null, username);
      }else{
	return done(null, false);
      }
    }
  )
);

var app = express();
var router = express.Router();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cookieParser());
app.use(bodyParser());
app.use(passport.initialize());
app.use(passport.session());

app.use('/', router);

router.get(
  '/'
  ,passport.authenticate('basic', {session: false}) 
  ,function(req, res){
    res.render('index');
  }
);

router.get(
  '/success'
  ,function(req, res){
    res.render('credit');
  }
);

router.post('/login', passport.authenticate('local', {
  successRedirect: '/success',
  failureRedirect: '/failure'
}));

db.fn.sync();

app.listen(3000);
console.log("port 3000");
