const { Skill } = require('../models/loader');

const SkillController = {
  async find (req, res) {
    try {
      const skills = await Skill.findAll({
        where: { company: req.user.company }
      });
      return res.ok(skills);
    } catch (e) {
      return res.badRequest(e);
    }
  },

  async findOne (req, res) {
    try {
      const skill = await Skill.findOne({
        where: {
          id: req.params.id,
          company: req.user.company
        }
      });

      return res.ok(skill);
    } catch (e) {
      return res.badRequest(e);
    }
  },

  async update (req, res) {
    try {
      const skill = await Skill.findOne({
        where: {
          id: req.params.id,
          company: req.user.company
        }
      });

      skill.update({
        ...req.body,
        company: req.user.company
      });

      return res.ok(skill);
    } catch (e) {
      return res.badRequest(e);
    }
  },

  async create (req, res) {
    try {
      const skill = await Skill.create({
        ...req.body,
        company: req.user.company
      });

      return res.ok(skill);
    } catch (e) {
      return res.badRequest(e);
    }
  },

  async destroy (req, res) {
    try {
      await Skill.destroy({
        where: {
          id: req.params.id,
          company: req.user.company
        }
      });

      return res.noContent();
    } catch(e) {
      return res.badRequest(e);
    }
  }
};

module.exports = SkillController;
