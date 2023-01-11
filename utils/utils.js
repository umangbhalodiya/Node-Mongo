const enums = require("../json/enums.json");
exports.validate = (schema) => (req, res, next) => {
    const {
      error
    } = schema.validate(req.body);
    if (error) {
      res.status(enums.HTTP_CODES.VALIDATION_ERROR)
        .send(error.details[0].message);
    } else {
      next();
    }
  };

