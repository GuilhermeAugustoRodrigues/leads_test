const { EmployeeSkill, Skill } = require("../models/loader");

const EmployeeSkillController = {
  async find(req, res) {
    try {
      const employeeSkills = await EmployeeSkill.findAll({
        where: {
          ...req.query,
          company: req.user.company,
        },
        include: [{ model: Skill }],
      });
      return res.ok(employeeSkills);
    } catch (e) {
      return res.badRequest(e);
    }
  },

  async findOne(req, res) {
    try {
      const employeeSkill = await EmployeeSkill.findOne({
        where: {
          id: req.params.id,
          company: req.user.company,
        },
      });

      return res.ok(employeeSkill);
    } catch (e) {
      return res.badRequest(e);
    }
  },

  async update(req, res) {
    try {
      const employeeSkill = await EmployeeSkill.findOne({
        where: {
          id: req.params.id,
          company: req.user.company,
        },
      });

      employeeSkill.update({
        ...req.body,
        company: req.user.company,
      });

      return res.ok(employeeSkill);
    } catch (e) {
      return res.badRequest(e);
    }
  },

  async create(req, res) {
    try {
      const created = await EmployeeSkill.create({
        ...req.body,
        company: req.user.company,
      });

      const employeeSkills = await EmployeeSkill.findOne({
        where: {
          id: created.id,
        },
        include: [{ model: Skill }],
      });

      return res.ok(employeeSkills);
    } catch (e) {
      return res.badRequest(e);
    }
  },

  async destroy(req, res) {
    try {
      await EmployeeSkill.destroy({
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

module.exports = EmployeeSkillController;
