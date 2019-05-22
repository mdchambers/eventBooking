const Event = require("../../models/event");
// const User = require("../../models/user");
const Booking = require("../../models/booking");
// const { dateToString } = require("../../helpers/date");
const { transformBooking } = require('./merge');



module.exports = {
  bookings: async () => {
    try {
      const res = await Booking.find();
      // console.log(res);
      return res.map(book => {
        return transformBooking(book);
      });
    } catch (error) {
      throw error;
    }
  },
  bookEvent: async (args, req) => {
    if(! req.isAuth){
      // console.log("not authenticated");
      throw new Error('Not authenticated');
    }
    try {
      // Find associated event
      // console.log(args.eventId)
      const fetchedEvent = await Event.findOne({ _id: args.eventId });
      // Create booking
      // console.log(fetchedEvent);
      const newBooking = new Booking({
        event: fetchedEvent,
        user: req.userId
      });
      // Save booking
      const submittedBooking = await newBooking.save();
      // Return booking
      return transformBooking(submittedBooking);
    } catch (error) {
      throw error;
    }
  },
  cancelBooking: async (args, req) => {
    if(! req.isAuth){
      // console.log("not authenticated");
      throw new Error('Not authenticated');
    }
    try {
      // console.log(args.bookingId);
      const cancelled = await Booking.findById(args.bookingId);
      await Booking.findByIdAndDelete(args.bookingId);
      // console.log(cancelled);
      return transformBooking(cancelled);
    } catch (error) {
      throw error;
    }
  }
};
