const express = require("express");
const helmet = require("helmet");
const http = require("http");
const cookieParser = require('cookie-parser');
const path = require("path");
const app = express();
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/User');
const sequelize = require('./db');
const cors = require('cors');


const config = require("./server.config.js");

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}))
app.use(helmet());

// Express Route File Requires
const authAPI = require("./routes");


app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());

app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false,
  cookie : {
    secure : false, 
    maxAge : (4 * 60 * 60 * 1000), //Tiempo expiracion de cookie 4hs 
    httpOnly: false
  }    
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: `password`
},
  function (email, password, done) {
    User.findOne({ where: { email } })
      .then((user, err) => {
        if (err) return done(err); 

        if (!user) return done(null, false, { message: 'Incorrect username.' });

        return user.hash(password, user.salt)
          .then(hashedPass => {

            if (hashedPass !== user.password) return done(null, false, { message: 'Incorrect password.' });

            return done(null, user);
          })

      });
  }
));

passport.serializeUser(function (user, done) {
  done(null, user.id);
});
// How we look for the user
passport.deserializeUser(function (id, done) {
  console.log(`from deserialize`)
  User.findByPk(id)
    .then(user => done(null, user))
});

// Express Routing
app.use("/api", authAPI);
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "./src/public", "index.html"));
});

sequelize.sync({})
  .then(() => {
    http.createServer(app).listen(config.port, () => {
      console.log(`Server listening at port ${config.port}`);
    });
  })
  //.catch()