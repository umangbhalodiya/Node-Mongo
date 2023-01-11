const enums = require("../../../json/enums.json");
const eventsSchema = require("../../models/events/events");
const messages = require("../../../json/message.json");

module.exports = {
  getEventsById: async (req, res) => {
    try {
      let eventId = req.query.id;
      let eventData = await eventsSchema.findById({ _id: eventId });
      return res.status(enums.HTTP_CODES.OK).json(eventData);
    } catch (err) {
      res
        .status(enums.HTTP_CODES.INTERNAL_SERVER_ERROR)
        .json({ message: "Event not found" });
    }
  },

  addEvents: async (req, res) => {
    const { name, desc, startDate, endDate } = req.body;
    if ((!name, !desc, !startDate, !endDate)) {
      const responseObject = {
        result: -1,
        message: messages.INVALID_PARAMETERS,
        payload: {},
      };
      return res.status(enums.HTTP_CODES.BAD_REQUEST).json({ responseObject });
    }
    try {
      const newEvent = new eventsSchema({
        name: name,
        desc: desc,
        startDate: startDate,
        endDate: endDate,
      });
      let eventData = await newEvent.save();
      console.log(eventData);
      const responseObject = {
        result: 0,
        message: messages.ITEM_INSERTED,
        payload: {
          name: eventData.name,
          desc: eventData.desc,
          startDate: eventData.startDate,
          endDate: eventData.endDate,
        },
      };
      return res.status(enums.HTTP_CODES.OK).json(responseObject);
    } catch (error) {
      const responseObject = {
        result: -1,
        message: messages.GENERAL,
        payload: {},
      };
      res.status(enums.HTTP_CODES.INTERNAL_SERVER_ERROR).json(responseObject);
    }
  },

  updateEvent: async (req, res) => {
    const { eventId } = req.params;
    try {
      const eventData = await eventsSchema.findByIdAndUpdate(
        { _id: eventId },
        req.body,
        { new: true }
      );
      const responseObject = {
        result: 0,
        message: messages.ITEM_UPDATED,
        payload: { eventData },
      };
      res.status(enums.HTTP_CODES.OK).json(responseObject);
    } catch (error) {
      const responseObject = {
        result: -1,
        message: messages.GENERAL,
        payload: {},
      };
      res.status(enums.HTTP_CODES.INTERNAL_SERVER_ERROR).json(responseObject);
    }
  },

  deleteEvent: async (req, res) => {
    const { eventId } = req.params;
    const eventData = await eventsSchema.findOne({ _id: eventId });
    if (!eventData) {
      const responseObject = {
        result: 0,
        message: messages.ITEM_NOT_FOUND,
        payload: {},
      };
      res.status(enums.HTTP_CODES.INTERNAL_SERVER_ERROR).json(responseObject);
    }
    try {
      const deleteEvent = await eventsSchema.findOneAndDelete({ _id: eventId });
      const responseObject = {
        result: 0,
        message: messages.ITEM_DELETED,
        payload: {},
      };
      res.status(enums.HTTP_CODES.OK).json(responseObject);
    } catch (error) {
      const responseObject = {
        result: -1,
        message: messages.GENERAL,
        payload: {},
      };
      res.status(enums.HTTP_CODES.INTERNAL_SERVER_ERROR).json(responseObject);
    }
  },

  getEvents: async (req, res) => {
    try {
      let event = await eventsSchema.find();
      const responseObject = {
        result: 0,
        message: messages.ITEM_FETCHED,
        payload: { event },
      };
      res.status(enums.HTTP_CODES.OK).json(responseObject);
    } catch (error) {
      const responseObject = {
        result: -1,
        message: messages.GENERAL,
        payload: {},
      };
      res.status(enums.HTTP_CODES.INTERNAL_SERVER_ERROR).json(responseObject);
    }
  },
};
