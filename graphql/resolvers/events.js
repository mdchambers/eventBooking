const Event = require("../../models/event");
const User = require("../../models/user");
// const Booking = require("../../models/booking");
// const { dateToString } = require('../../helpers/date');
const { transformEvent } = require('./merge');



module.exports = {
  events: async () => {
    try {
      const res = await Event.find({});
      return res.map(transformEvent);
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
  createEvent: async (args, req) => {
    if(! req.isAuth){
      console.log("not authenticated");
      throw new Error('Not authenticated');
    }
    const newEvent = new Event({
      title: args.eventInput.title,
      description: args.eventInput.description,
      price: +args.eventInput.price,
      date: new Date(args.eventInput.date),
      creator: req.userId
    });

    try {
      // Send new event
      const result = await newEvent.save();

      // Update user record with this event
      const user = await User.findById(req.userId);
      if (!User) {
        throw new Error("User not found");
      }
      user.createdEvents.push(result._doc);
      await user.save();

      console.log("createEvent", result);
      return transformEvent(result);
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
};
