const User = require("../../models/usersModals/userModals");
const userSchema = require("../../models/usersModals/userModals");
const bcrypt = require("bcryptjs");
const messages = require("../../../json/message.json");
const JWTHelper = require("../../../helpers/jwt.helper");
const Utils = require("../../../utils/utils");

module.exports = {
  getUserById: async (req, res) => {
    try {
      //------------------ * taking id from query to fetch data * --------------------//
      let userId = req.query.id;
      let users = await userSchema.findById({ _id: userId });
      return res.status(200).json(users);
    } catch (err) {
      res
        .status(500)
        .json({ message: "User not found" });
    }
  },
  createUser: async (req, res) => {
    const { firstName, lastName, email, userName, password, contact } =
      req.body;
    if (
      !firstName ||
      !lastName ||
      !email ||
      !userName ||
      !password ||
      !contact
    ) {
      const responseObject = {
        result: -1,
        message: messages.INVALID_PARAMETERS,
        payload: {},
      };
      return res.status(400).json({ responseObject });
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
        result: 0,
        message: messages.ITEM_INSERTED,
        payload: { user: response.user, token },
      };
      return res.status(200).json(responseObject);
    } catch (error) {
      const responseObject = {
        result: -1,
        message: messages.GENERAL,
        payload: {},
      };
      res.status(500).json(responseObject);
    }
  },

  loginUser: async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      const responseObject = {
        result: -1,
        message: messages.INVALID_PARAMETERS,
        payload: {},
      };
      return res.status(400).json({ responseObject });
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
            id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            contact: user.contact,
            userName: user.userName,
            isActive: user.isActive,
            locations: user.locations,
            role: user.role,
          },
          token,
        };

        //-------------------- * send response * --------------------------//

        return res.status(200).json({ response });
      } else {
        return res
          .status(200)
          .json({ message: "Could not login" });
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
      const responseObject = {
        result: 0,
        message: messages.ITEM_UPDATED,
        payload: userData,
      };
      res.status(200).json(responseObject);
    } catch (error) {
      const responseObject = {
        result: -1,
        message: messages.GENERAL,
        payload: {},
      };
      res.status(500).json(responseObject);
    }
  },

  deleteUser: async (req, res) => {
    const { userId } = req.params;
    const userData = await userSchema.findOne({ _id: userId });
    if (!userData) {
      const responseObject = {
        result: 0,
        message: messages.ITEM_NOT_FOUND,
        payload: {},
      };
      res.status(500).json(responseObject);
    }

    try {
      const deleteUser = await userSchema.findOneAndDelete({ _id: userId });
      const responseObject = {
        result: 0,
        message: messages.ITEM_DELETED,
        payload: {},
      };
      res.status(200).json(responseObject);
    } catch (error) {
      const responseObject = {
        result: -1,
        message: messages.GENERAL,
        payload: {},
      };
      res.status(500).json(responseObject);
    }
  },
  getAllUser: async (req, res) => {
    try {
      let user = await userSchema.find();
      const responseObject = {
        result: 0,
        message: messages.ITEM_FETCHED,
        payload: { user },
      };
      res.status(200).json(responseObject);
    } catch (error) {
      const responseObject = {
        result: -1,
        message: messages.GENERAL,
        payload: {},
      };
      res.status(500).json(responseObject);
    }
  },
};
