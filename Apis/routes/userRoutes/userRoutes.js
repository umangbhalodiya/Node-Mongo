const express = require("express");
const router = express.Router();
const userController = require("../../controllers/users/users");
 
router.post("/login", userController.loginUser);
router.put("/edit-user/id=:userId", userController.editUser);
router.delete("/delete-user/id=:userId", userController.deleteUser);
router.get("/getUsers/", userController.getAllUser);
router.get("/getById", userController.getUserById);
module.exports = router;
