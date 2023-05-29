const EmployeeSkill = require("../models/EmployeeSkill");
const {
  Employee,
  Project,
  ParticipantOnProject,
  ProjectSkill,
  Skill,
  sequelize,
} = require("../models/loader");

const ProjectController = {
  async find(req, res) {
    try {
      const projects = await Project.findAll({
        where: { company: req.user.company },
      });
      return res.ok(projects);
    } catch (e) {
      return res.badRequest(e);
    }
  },

  async findOne(req, res) {
    try {
      const project = await Project.findOne({
        where: {
          id: req.params.id,
          company: req.user.company,
        },
      });

      return res.ok(project);
    } catch (e) {
      return res.badRequest(e);
    }
  },

  async update(req, res) {
    try {
      const project = await Project.findOne({
        where: {
          id: req.params.id,
          company: req.user.company,
        },
      });

      project.update({
        ...req.body,
        company: req.user.company,
      });

      return res.ok(project);
    } catch (e) {
      return res.badRequest(e);
    }
  },

  async create(req, res) {
    try {
      const project = await Project.create({
        ...req.body,
        company: req.user.company,
      });

      return res.ok(project);
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
        ProjectSkill.destroy({
          where: {
            project: id,
            company,
          },
        }),
        ParticipantOnProject.destroy({
          where: { project: id },
        }),
      ]);

      // Remove o projeto
      await Project.destroy({
        where: {
          id: id,
          company,
        },
      });

      return res.noContent();
    } catch (e) {
      return res.badRequest(e);
    }
  },

  async addEmployee(req, res) {
    try {
      let participantOnProject = await ParticipantOnProject.create(req.body);
      return res.ok(participantOnProject);
    } catch (e) {
      return res.badRequest(e);
    }
  },

  async removeEmployee(req, res) {
    try {
      let participantOnProject = await ParticipantOnProject.destroy({
        where: {
          project: req.params.id,
          employee: req.params.employee,
        },
      });
      return res.ok(participantOnProject);
    } catch (e) {
      return res.badRequest(e);
    }
  },

  async participants(req, res) {
    try {
      let participants = await ParticipantOnProject.findAll({
        where: {
          project: req.params.id,
        },
        include: [{ model: Employee }],
      });
      return res.ok(participants);
    } catch (e) {
      console.log(e);
      return res.badRequest(e);
    }
  },

  async suggestions(req, res) {
    try {
      let participants = await ParticipantOnProject.findAll({
        where: {
          project: req.params.id,
        },
      });

      let ignoreIds = participants.map((o) => o.employee);

      let [bests] = await sequelize.query(`
        select employee.id, employee.firstname, employee.lastname, employee.email, sum(projectskill.stars) as stars from projectskill
        inner join employeeskill on employeeskill.skill = projectskill.skill and employeeskill.stars >= projectskill.stars
        inner join employee on employee.id = employeeskill.employee
        where projectskill.project = ${req.params.id} and employee.id not in (${ignoreIds}) and employee.company = ${req.user.company}
        group by employee.id
        having count(distinct projectskill.skill) = (select count(*) from projectskill where project = ${req.params.id})
        order by stars desc;
      `);

      bests = await Promise.all(bests.map(async employee => await addEmployeeSkillsToSuggestion(employee)));

      ignoreIds = [...ignoreIds, ...bests.map((o) => o.id)];

      let [others] = await sequelize.query(`
        select employee.id, employee.firstname, employee.lastname, employee.email, sum(employeeskill.stars) as stars from projectskill
        inner join employeeskill on employeeskill.skill = projectskill.skill
        inner join employee on employee.id = employeeskill.employee
        where projectskill.project = ${req.params.id} and employee.id not in (${ignoreIds}) and employee.company = ${req.user.company}
        group by employee.id
        order by stars desc;
      `);

      others = await Promise.all(others.map(async employee => await addEmployeeSkillsToSuggestion(employee)));

      ignoreIds = [...ignoreIds, ...others.map((o) => o.id)];

      const [all] = await sequelize.query(`
        select employee.id, employee.firstname, employee.lastname, employee.email from employee
        where employee.id not in (${ignoreIds}) and employee.company = ${req.user.company};
      `);

      return res.ok({ bests, others, all });
    } catch (e) {
      return res.badRequest(e);
    }
  },
};

async function addEmployeeSkillsToSuggestion (employee) {
  const skills = await EmployeeSkill.findAll({
    where: {
      employee: employee.id,
    },
    include: [{ model: Skill }],
  });

  const newEmployee = {
    ...employee,
    skills: skills
  }

  return newEmployee;
}

module.exports = ProjectController;
