const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const helper = require("../helpers/helper");

// Set up the Passport strategy:
passport.use(new LocalStrategy( function (username, password, done) {
  helper.findByUsername(username, async (err, user) => {
      if(err) done(err)
      const matchedPassword = await bcrypt.compare(password, user.password)
      if(!user || !matchedPassword) done(null, false)
      done(null, user)
    })
  }
))

// Serialize a user
passport.serializeUser((user, done) => {
  done(null, user.id)
})

// Deserialize a user
passport.deserializeUser((id, done) => {
  helper.findById(id, (err, user) => {
    if (err) done(err)
    done(null, user)
  })
})
