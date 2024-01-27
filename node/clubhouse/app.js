const express = require("express");
const path = require("path");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs")
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const {body, validationResult} = require('express-validator')

const mongoDb = "mongodb+srv://admin:3TC2vdxJvezI8ETb@cluster0.ty3uuu8.mongodb.net/clubhouse?retryWrites=true&w=majority"
mongoose.connect(mongoDb);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "mongo connection error"));

const User = mongoose.model(
  "User",
  new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    member: {type: Boolean, required: false}
  })
);

const Message = mongoose.model(
  'Message',
  new Schema({
    title: {type: String, required: true},
    text: {type: String, required: true},
    date: {type: Date, required: true},
    user: {type: Schema.Types.ObjectId, ref: 'User', required: true},
  })
)

const app = express();
app.set("views", 'views');
app.set("view engine", "ejs");

app.use(session({ secret: 'dom', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await User.findOne({ username: username });
      if (!user) {
	return done(null, false, { message: "Incorrect username" });
      };
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
	return done(null, false, { message: "Incorrect password" })
      }
      return done(null, user);
    } catch(err) {
      return done(err);
    };
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch(err) {
    done(err);
  };
});

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

app.get("/", async (req, res) => {
  const messages = await Message.find().populate('user').sort({date: 1}).exec()
  res.render("index", { session: req.user, messages, message: '', errors: ''});
});

app.post('/', [
  body('title').trim().notEmpty().escape(),
  body('text').trim().notEmpty().escape(),

  async (req, res) => {
    const errors = validationResult(req).array()
    const message = new Message({
      title: req.body.title,
      text: req.body.text,
      user: req.user,
      date: new Date()
    })
    if (errors.length) {
      const messages = await Message.find().populate('user').sort({date: 1}).exec()
      res.render("index", { session: req.user, messages, message: '', errors});
    } else {
      await message.save()
      res.redirect('/')
    }
  }
])

app.get("/signup", (req, res) => res.render("signup", {user: {username: ''}, errors: ''}));

app.post("/signup", [
  body('username').custom(async value => {
    const user = await User.findOne({username: value})
    if (user) {
      throw new Error('username taken');
    }
  }),
  body('password').custom((value, { req }) => {
    return value == req.body.confirmation
  }).withMessage('passwords must match'),

  async (req, res, next) => {
    bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
      const errors = validationResult(req).array()
      if (err || errors.length) {
	res.render("signup", {user: {username: req.body.username}, errors});
      } else {
	const user = new User({
	  username: req.body.username,
	  password: hashedPassword,
	  member: false,
	});
	const result = await user.save();
	res.redirect("/");
      };
    });
  }
]);

app.get("/login", (req, res) => res.render("login", {user: {username: ''}, errors: ''}));

app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login"
  })
);

app.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

app.get('/join', (req, res) => {
  res.render('join')
})

app.post('/join', async (req, res) => {
  if (req.body.password == 'dom') {
    await User.findByIdAndUpdate(req.user.id, {member: true})
    res.redirect('/')
  }
})

app.listen(3000, () => console.log("app listening on port 3000!"));
