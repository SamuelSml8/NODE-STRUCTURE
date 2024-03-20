const passport = require("passport");
const { Strategy, ExtractJwt } = require("passport-jwt");
const User = require("../models/userModel.js");

const jwt_Secret = ".*#/$=1sMl*!$%&/($DF";

const strategy = new Strategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: jwt_Secret,
  },
  async (jwtPayload, done) => {
    try {
      const userFound = await User.findById({ userId: jwtPayload.id });

      if (!userFound) {
        const error = new Error("User not found");
        console.log(error);
      }

      done(null, userFound);
    } catch (error) {
      done(error);
    }
  }
);

passport.use(strategy);

const initialize = () => {
  return passport.initialize();
};

const authenticate = () => {
  return passport.authenticate("jwt", { session: false });
};

module.exports = {
  initialize,
  authenticate,
};
