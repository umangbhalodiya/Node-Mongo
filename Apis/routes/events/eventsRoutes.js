const express = require("express");
const router = express.Router();
const eventsController = require("../../controllers/events/events");
const { validate } = require("../../../utils/utils");
const Joi = require("joi");

const eventsValidations = Joi.object().keys({
  name: Joi.string().required(),
  desc: Joi.string().required(),
  startDate: Joi.string().required(),
  endDate: Joi.string().required(),
});
router.post(
  "/add-event",
  validate(eventsValidations),
  eventsController.addEvents
);
router.delete("/delete-event/id=:eventId", eventsController.deleteEvent);
router.get("/get-events", eventsController.getEvents);
router.put("/update-event/id=:eventId", eventsController.updateEvent);

module.exports = router;
