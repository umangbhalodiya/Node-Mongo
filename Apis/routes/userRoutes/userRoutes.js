const express = require("express");
const router = express.Router();
const userController = require("../../controllers/users/users");
const { validate } = require("../../../utils/utils");
const Joi = require("joi");

const userValidations = Joi.object().keys({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().required(),
  userName: Joi.string().required(),
  password: Joi.string(),
  contact: Joi.number().required(),
});
router.post("/add-user", validate(userValidations), userController.createUser);
router.post("/login", userController.loginUser);
router.put("/edit-user/id=:userId", userController.editUser);
router.delete("/delete-user/id=:userId", userController.deleteUser);
router.get("/getUsers/", userController.getAllUser);
router.get("/getById", userController.getUserById);
module.exports = router;
// validate("body", userController.validation),
