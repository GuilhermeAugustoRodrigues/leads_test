const { ProjectSkill, Skill } = require("../models/loader");

const ProjectSkillController = {
  async find(req, res) {
    try {
      const projectSkill = await ProjectSkill.findAll({
        where: {
          ...req.query,
          company: req.user.company,
        },
        include: [{ model: Skill }],
      });
      return res.ok(projectSkill);
    } catch (e) {
      return res.badRequest(e);
    }
  },

  async findOne(req, res) {
    try {
      const projectSkill = await ProjectSkill.findOne({
        where: {
          id: req.params.id,
          company: req.user.company,
        },
      });

      return res.ok(projectSkill);
    } catch (e) {
      return res.badRequest(e);
    }
  },

  async update(req, res) {
    try {
      const projectSkill = await ProjectSkill.findOne({
        where: {
          id: req.params.id,
          company: req.user.company,
        },
      });

      projectSkill.update({
        ...req.body,
        company: req.user.company,
      });

      return res.ok(projectSkill);
    } catch (e) {
      return res.badRequest(e);
    }
  },

  async create(req, res) {
    try {
      const created = await ProjectSkill.create({
        ...req.body,
        company: req.user.company,
      });

      const projectSkill = await ProjectSkill.findOne({
        where: {
          id: created.id,
        },
        include: [{ model: Skill }],
      });

      return res.ok(projectSkill);
    } catch (e) {
      return res.badRequest(e);
    }
  },

  async destroy(req, res) {
    try {
      await ProjectSkill.destroy({
        where: {
          id: req.params.id,
          company: req.user.company,
        },
      });

      return res.noContent();
    } catch (e) {
      return res.badRequest(e);
    }
  },
};

module.exports = ProjectSkillController;
