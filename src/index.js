require("dotenv").config()
const port = process.env.PORT || 4000
const {json,urlencoded,} = require("express")
const cookieParser = require("cookie-parser")
const session = require('express-session')
const express = require("express");
const cors = require("cors")
const passport = require("passport");
const settings = require("../app.json")
const appRoutes = require("./futures")

const app = express();
app.use(json())
app.use(urlencoded({extended:true}))
app.use(cookieParser())
app.use(session({ secret:process.env.SESSION_SECRET,resave: false, saveUninitialized: true,  cookie: { secure: false }}))
app.use(passport.initialize());
app.use(passport.session())
const corsOptions ={ origin:settings.origin, credentials:true, optionSuccessStatus:200}
app.use(cors(corsOptions))
appRoutes.forEach(fn=>app.use("/api/v-1",fn))
app.listen(port, () => console.log(`app listening on port ${port}!`))
app.get("/", (_req, res) => res.send({ message: "server is ok" }));