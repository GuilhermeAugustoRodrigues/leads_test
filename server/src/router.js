const express = require('express');
const router = express.Router();
const isAuthenticated = require('./middlewares/isAuthenticated');
const {
  AuthController,
  EmployeeController,
  EmployeeSkillController,
  ProjectController,
  SkillController,
  ProjectSkillController
} = require('./controllers/loader');

// AuthController
router.post('/signup', AuthController.signup);
router.post('/login', AuthController.login);

// EmployeeController
router.get('/employee', [isAuthenticated], EmployeeController.find);
router.post('/employee', [isAuthenticated], EmployeeController.create);
router.get('/employee/:id', [isAuthenticated], EmployeeController.findOne);
router.put('/employee/:id', [isAuthenticated], EmployeeController.update);

// SkillController
router.get('/skill', [isAuthenticated], SkillController.find);
router.post('/skill', [isAuthenticated], SkillController.create);
router.get('/skill/:id', [isAuthenticated], SkillController.findOne);
router.put('/skill/:id', [isAuthenticated], SkillController.update);
router.delete('/skill/:id', [isAuthenticated], SkillController.destroy);

// EmployeeSkillController
router.get('/employeeSkill', [isAuthenticated], EmployeeSkillController.find);
router.post('/employeeSkill', [isAuthenticated], EmployeeSkillController.create);
router.get('/employeeSkill/:id', [isAuthenticated], EmployeeSkillController.findOne);
router.put('/employeeSkill/:id', [isAuthenticated], EmployeeSkillController.update);
router.delete('/employeeSkill/:id', [isAuthenticated], EmployeeSkillController.destroy);

// ProjectController
router.get('/project', [isAuthenticated], ProjectController.find);
router.post('/project', [isAuthenticated], ProjectController.create);
router.get('/project/:id/participants', [isAuthenticated], ProjectController.participants);
router.get('/project/:id/suggestions', [isAuthenticated], ProjectController.suggestions);
router.post('/project/addEmployee', [isAuthenticated], ProjectController.addEmployee);
router.delete('/project/:id/removeEmployee/:employee', [isAuthenticated], ProjectController.removeEmployee);
router.get('/project/:id', [isAuthenticated], ProjectController.findOne);
router.put('/project/:id', [isAuthenticated], ProjectController.update);
router.delete('/project/:id', [isAuthenticated], ProjectController.destroy);

// EmployeeSkillController
router.get('/projectSkill', [isAuthenticated], ProjectSkillController.find);
router.post('/projectSkill', [isAuthenticated], ProjectSkillController.create);
router.get('/projectSkill/:id', [isAuthenticated], ProjectSkillController.findOne);
router.put('/projectSkill/:id', [isAuthenticated], ProjectSkillController.update);
router.delete('/projectSkill/:id', [isAuthenticated], ProjectSkillController.destroy);

module.exports = (app) => app.use(router);
