const express = require("express");
const exphbs = require("express-handlebars");
const session = require("express-session");
const FileStore = require("session-file-store")(session);
const flash = require("express-flash");
const ideasRoutes = require("./routes/ideasRoute");
const authRoutes = require("./routes/authRoutes");
const app = express();
const Idea = require("./models/idea");
const User = require("./models/user");
const conn = require("./db/connection");
const IdeasController = require("./controllers/ideasController");

app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");

app.use(express.json());
app.use(
  session({
    name: "session",
    secret: "nosso_secret",
    resave: false,
    saveUninitialized: false,
    store: new FileStore({
      logFn: function () {},
      path: require("path").join(require("os").tmpdir(), "sessions"),
    }),
    cookie: {
      secure: false,
      maxAge: 360000,
      expires: new Date(Date.now() + 360000),
      httpOnly: true,
    },
  })
);

app.use(express.urlencoded({ extended: true }));

app.use(flash());

app.use(express.static("public"));

app.use((req, res, next) => {
  if (req.session.userId) {
    res.locals.session = req.session;
  }

  next();
});

app.use("/", ideasRoutes);
app.use("/", authRoutes);
app.get("/", IdeasController.showIdeas);

conn
  .sync()
  .then(() => {
    app.listen(5000);
  })
  .catch((error) => console.log(error));
