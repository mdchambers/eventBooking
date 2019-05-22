const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// const Event = require("../../models/event");
const User = require("../../models/user");
// const Booking = require("../../models/booking");
// const { dateToString } = require("../../helpers/date");
const { transformUser } = require("./merge");

module.exports = {
  users: async () => {
    try {
      const res = await User.find({});
      return res.map(user => {
        return transformUser(user);
      });
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
  createUser: async args => {
    try {
      // Check if user alraedy registered
      const user = await User.findOne({ email: args.userInput.email });
      if (user) {
        // If registered, throw error
        throw new Error("Email already in use");
      }

      // Hash password (never store unhashed passwords)
      // 12 rounds of salting is standard
      const hashedPassword = await bcrypt.hash(args.userInput.password, 12);
      const newUser = new User({
        email: args.userInput.email,
        password: hashedPassword
      });
      const res = await newUser.save();
      // Do not return hashed password
      return { ...res._doc, password: null };
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
  login: async ({ email, password }) => {
    // Confirm user in db
    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error("User does not exist");
    }
    // Validate password
    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
      throw new Error("Password is incorrect");
    }
    // Generate token
    const token = jwt.sign(
      { userId: user.id, email: user.email }, // data to store in token
      "somesupersecretkeythatyoucannotguess", // secret decryption key; will need later
      {
        expiresIn: "1h" //token expiration time (keep short)
      }
    );
    // return AuthData
    return {
      userId: user.id,
      token: token,
      tokenExpiration: 1
    }
  }
};
