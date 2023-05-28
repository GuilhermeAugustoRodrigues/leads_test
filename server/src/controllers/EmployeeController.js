const {
  Employee,
  EmployeeSkill,
  ParticipantOnProject,
} = require("../models/loader");

const EmployeeController = {
  async find(req, res) {
    try {
      const employees = await Employee.findAll({
        where: { company: req.user.company },
      });
      return res.ok(employees);
    } catch (e) {
      return res.badRequest(e);
    }
  },

  async findOne(req, res) {
    try {
      const employee = await Employee.findOne({
        where: {
          id: req.params.id,
          company: req.user.company,
        },
      });

      return res.ok(employee);
    } catch (e) {
      return res.badRequest(e);
    }
  },

  async update(req, res) {
    try {
      const employee = await Employee.findOne({
        where: {
          id: req.params.id,
          company: req.user.company,
        },
      });

      employee.update({
        ...req.body,
        company: req.user.company,
      });

      return res.ok(employee);
    } catch (e) {
      return res.badRequest(e);
    }
  },

  async create(req, res) {
    try {
      const employee = await Employee.create({
        ...req.body,
        company: req.user.company,
      });

      return res.ok(employee);
    } catch (e) {
      return res.badRequest(e);
    }
  },

  async destroy(req, res) {
    const { id } = req.params;
    const { company } = req.user;

    try {
      // Remove as dependências
      await Promise.all([
        EmployeeSkill.destroy({
          where: {
            employee: id,
            company,
          },
        }),
        ParticipantOnProject.destroy({
          where: {
            employee: id,
          },
        }),
      ]);

      await Employee.destroy({
        where: {
          id: id,
          company,
        },
      });

      return res.noContent();
    } catch (e) {
      console.log(e);
      return res.badRequest(e);
    }
  },
};

module.exports = EmployeeController;
