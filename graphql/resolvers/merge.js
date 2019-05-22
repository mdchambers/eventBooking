const User = require("../../models/user");
const Event = require("../../models/event");
const { dateToString } = require("../../helpers/date");

const transformEvent = event => {
  // console.log("transformEvent", event._doc);
  return {
    ...event._doc,
    creator: userPopulate.bind(this, event.creator),
    date: dateToString(event.date)
  };
};

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

const eventPopulate = async eventId => {
  try {
    const foundEvent = await Event.findOne({ _id: eventId });
    return transformEvent(foundEvent);
  } catch (err) {
    throw err;
  }
};
const eventsPopulate = async eventIds => {
  try {
    const foundEvents = await Event.find({ _id: { $in: eventIds } });
    return foundEvents.map(fe => {
      return transformEvent(fe);
    });
  } catch (err) {
    throw err;
  }
};

const transformBooking = booking => {
  // console.log(booking);
  return {
    ...booking._doc,
    event: eventPopulate.bind(this, booking.event),
    user: userPopulate.bind(this, booking.user),
    createdAt: dateToString(booking.createdAt),
    updatedAt: dateToString(booking.updatedAt)
  };
};

const transformUser = user => {
  return {
    ...user._doc,
    id: user._id,
    createdEvents: eventsPopulate.bind(this, user._doc.createdEvents)
  };
};

exports.transformEvent = transformEvent;
exports.transformBooking = transformBooking;
exports.transformUser = transformUser;
