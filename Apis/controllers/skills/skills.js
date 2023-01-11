const enums = require("../../../json/enums.json");
// const Skill = require("../../../models/skills/skillsModel");
const skillSchema = require("../../models/skills/skillsModel");
const messages = require("../../../json/message.json");

module.exports = {
  getSkillById: async (req, res) => {
    try {
      //------------------ * taking id from query to fetch data * --------------------//
      let skillId = req.query.id;
      let skillData = await skillSchema.findById({ _id: skillId });
      return res.status(enums.HTTP_CODES.OK).json(skillData);
    } catch (err) {
      res
        .status(enums.HTTP_CODES.INTERNAL_SERVER_ERROR)
        .json({ message: "Skill not found" });
    }
  },
  addSkills: async (req, res) => {
    const { skill, skillType } = req.body;

    if (!skill) {
      const responseObject = {
        result: -1,
        message: messages.INVALID_PARAMETERS,
        payload: {},
      };
      return res.status(enums.HTTP_CODES.BAD_REQUEST).json({ responseObject });
    }
    try {
      //   let skillCreate = {
      //     firstName: firstName,
      //     lastName: lastName,
      //     email: email,
      //     userName: userName,
      //     password: hashPassword,
      //     contact: contact,
      //     locations: [],
      //   };
      const newSkill = new skillSchema({ skill: skill, skillType: skillType });
      let skillData = await newSkill.save();

      //   let response = {};
      const responseObject = {
        result: 0,
        message: messages.ITEM_INSERTED,
        payload: { skill: skillData.skill, skillType: skillData.skillType },
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

  updateSkill: async (req, res) => {
    const { skillId } = req.params;
    try {
      const skillData = await skillSchema.findByIdAndUpdate(
        { _id: skillId },
        req.body,
        { new: true }
      );
      const responseObject = {
        result: 0,
        message: messages.ITEM_UPDATED,
        payload: { skillData },
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

  deleteSkill: async (req, res) => {
    const { skillId } = req.params;
    const skillData = await skillSchema.findOne({ _id: skillId });
    if (!skillData) {
      const responseObject = {
        result: 0,
        message: messages.ITEM_NOT_FOUND,
        payload: {},
      };
      res.status(enums.HTTP_CODES.INTERNAL_SERVER_ERROR).json(responseObject);
    }

    try {
      const deleteSkill = await skillSchema.findOneAndDelete({ _id: skillId });
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
  getSkills: async (req, res) => {
    try {
      let skill = await skillSchema.find();
      const responseObject = {
        result: 0,
        message: messages.ITEM_FETCHED,
        payload: { skill },
      };
      res.status(enums.HTTP_CODES.OK).json(responseObject);
    } catch (error) {
      console.log(error);
      const responseObject = {
        result: -1,
        message: messages.GENERAL,
        payload: {},
      };
      res.status(enums.HTTP_CODES.INTERNAL_SERVER_ERROR).json(responseObject);
    }
  },
};
