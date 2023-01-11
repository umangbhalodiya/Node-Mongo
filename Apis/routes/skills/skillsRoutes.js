const express = require("express");
const router = express.Router();
const skillsController = require("../../controllers/skills/skills");
const { validate } = require("../../../utils/utils");
const Joi = require("joi");

const skillsValidations = Joi.object().keys({
  skill: Joi.string().required(),
});
router.post(
  "/add-skill",
  validate(skillsValidations),
  skillsController.addSkills
);
router.delete("/delete-skill/id=:skillId", skillsController.deleteSkill);
router.get("/all-skills", skillsController.getSkills);
router.put("/update-skill/id=:skillId", skillsController.updateSkill);

module.exports = router;
// validate("body", communicatorsController.validation),
