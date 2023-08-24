const User = require("../../models/usersModals/userModals");
const userSchema = require("../../models/usersModals/userModals");
const bcrypt = require("bcryptjs");
const messages = require("../../../json/message.json");
const JWTHelper = require("../../../helpers/jwt.helper");

module.exports = {
  getUserById: async (req, res) => {
    try {
      //------------------ * taking id from query to fetch data * --------------------//
      let userId = req.query.id;
      let users = await userSchema.findById({ _id: userId });
      return res.status(200).json(users);
    } catch (err) {
      res.status(500).json({ message: "User not found" });
    }
  },
  createUser: async (req, res) => {
    const { name, email, password, contact } = req.body;
    if (!name || !email || !password || !contact) {
      return res
        .status(400)
        .json({ message: "Didn't get required parameters" });
    }
    try {
      let hashPassword = await bcrypt.hash(password, 10);
      let userCreate = { ...req.body, password: hashPassword };
      const newUser = new userSchema(userCreate);
      let user = await newUser.save();
      const token = JWTHelper.getJWTToken({
        email: user.email,
        role: "user",
        _id: user._id,
      });
      let response = {
        user: {
          user,
        },
        token,
      };
      const responseObject = {
        message: "Item Found",
        payload: { user: response.user, token },
      };
      return res.status(200).json(responseObject);
    } catch (error) {
      res.status(500).json({
        message: "Something went wrong",
      });
    }
  },

  loginUser: async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Didn't get required parameters" });
    }
    try {
      const user = await User.findOne({ email: email, isActive: true });
      if (!user) {
        return res.status(200).json({ msg: "User does not exist." });
      }
      let passwordCheck = await bcrypt.compare(password, user.password);

      //------------------ * password check and create token * --------------------//

      if (user && passwordCheck === true) {
        const token = JWTHelper.getJWTToken({
          email: user.email,
          role: "user",
          _id: user._id,
        });

        //---------------------- * Create response * --------------------------//

        let response = {
          user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            contact: user.contact,
            isActive: user.isActive,
            role: user.role,
          },
          token,
        };

        //-------------------- * send response * --------------------------//

        return res.status(200).json({ response });
      } else {
        return res.status(200).json({ message: "Could not login" });
      }
    } catch (e) {
      return res.status(200).json({ message: "bad request" });
    }
  },

  editUser: async (req, res) => {
    const { userId } = req.params;
    try {
      const userData = await userSchema.findByIdAndUpdate(
        { _id: userId },
        req.body.place ? { $push: { locations: req.body } } : req.body,
        { new: true }
      );
      res.status(200).json({
        message: "User Updated",
        payload: userData,
      });
    } catch (error) {
      res.status(500).json({
        message: "Something went wrong",
      });
    }
  },

  deleteUser: async (req, res) => {
    const { userId } = req.params;
    const userData = await userSchema.findOne({ _id: userId });
    if (!userData) {
      res.status(500).json({
        message: "Not Found",
      });
    }

    try {
      const deleteUser = await userSchema.findOneAndDelete({ _id: userId });
      res.status(200).json({
        message: "Deleted",
      });
    } catch (error) {
      res.status(500).json({
        message: "Something Went Wrong",
      });
    }
  },
  getAllUser: async (req, res) => {
    try {
      let user = await userSchema.find();
      res.status(200).json({
        message: "Users Founds",
        payload: { user },
      });
    } catch (error) {
      res.status(500).json({
        message: "Something Went Wrong",
      });
    }
  },
};
