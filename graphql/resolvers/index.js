const bcrypt = require("bcryptjs");

const Event = require("../../models/event");
const User = require("../../models/user");

const userPopulate = async userId => {
  try {
    const user = await User.findById(userId);
    return {
      ...user._doc,
      createdEvents: eventsPopulate.bind(this, user.createdEvents)
    };
  } catch (err) {
    throw err;
  }
};

const eventsPopulate = async eventIds => {
  try {
    const foundEvents = await Event.find({ _id: { $in: eventIds } });
    return foundEvents.map(fe => {
      return {
        ...fe._doc,
        creator: userPopulate.bind(this, fe.creator)
      };
    });
  } catch (err) {
    throw err;
  }
};

module.exports = {
  events: async () => {
    try {
      const res = await Event.find({});
      return res.map(event => {
        return {
          ...event._doc,
          date: new Date(event._doc.date).toISOString(),
          creator: userPopulate.bind(this, event.creator)
        };
      });
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
  createEvent: async args => {
    const newEvent = new Event({
      title: args.eventInput.title,
      description: args.eventInput.description,
      price: +args.eventInput.price,
      date: new Date(args.eventInput.date),
      creator: "5ce4df27974c0bf82fb77228"
    });

    try {
      // Send new event
      let createdEvent;
      const result = await newEvent.save();
      createdEvent = { ...result._doc };

      // Update user record with this event
      const user = await User.findById("5ce4df27974c0bf82fb77228");
      if (!User) {
        throw new Error("User not found");
      }
      user.createdEvents.push(newEvent);
      await user.save();

      return {
        ...createdEvent,
        // date: new Date(createdEvent._doc.date).toISOString(),
        creator: userPopulate.bind(this, createdEvent.creator)
      };
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
  users: async () => {
    try {
      const res = await User.find({});
      return res.map(user => {
        return {
          ...user._doc,
          createdEvents: eventsPopulate.bind(this, user._doc.createdEvents)
        };
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
  }
};
