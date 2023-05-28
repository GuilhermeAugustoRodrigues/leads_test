import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store/index.js";

import Home from "../views/Home.vue";
import SignIn from "../views/SignIn.vue";
import SignUp from "../views/SignUp.vue";
import EmployeeIndex from "../views/Employee/Index.vue";
import EmployeeShow from "../views/Employee/Show.vue";
import EmployeeEdit from "../views/Employee/Edit.vue";
import EmployeeCreate from "../views/Employee/Create.vue";
import EmployeeShowSkill from "../views/Employee/Show/Skill.vue";
import ProjectIndex from "../views/Project/Index.vue";
import ProjectShow from "../views/Project/Show.vue";
import ProjectCreate from "../views/Project/Create.vue";
import ProjectEdit from "../views/Project/Edit.vue";
import ProjectShowSkill from "../views/Project/Show/Skill.vue";
import ProjectShowEmployee from "../views/Project/Show/Employee.vue";
import ProjectShowAddEmployee from "../views/Project/Show/AddEmployee.vue";
import SkillIndex from "../views/Skill/Index.vue";
import SkillShow from "../views/Skill/Show.vue";
import SkillEdit from "../views/Skill/Edit.vue";
import SkillCreate from "../views/Skill/Create.vue";

Vue.use(VueRouter);

const authenticatedRoute = (to, from, next) => {
  return store.getters.isAuthenticated ? next() : next("/signin");
};

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    beforeEnter: authenticatedRoute,
  },
  {
    path: "/employee",
    name: "Employee",
    component: EmployeeIndex,
    beforeEnter: authenticatedRoute,
    children: [
      {
        path: "show/:id",
        component: EmployeeShow,
        children: [
          {
            path: "",
            name: "EmployeeShowSkill",
            component: EmployeeShowSkill,
          },
        ],
      },
      {
        path: "edit/:id",
        name: "EmployeeEdit",
        component: EmployeeEdit,
      },
      {
        path: "create",
        name: "EmployeeCreate",
        component: EmployeeCreate,
      },
    ],
  },
  {
    path: "/project",
    name: "Project",
    component: ProjectIndex,
    beforeEnter: authenticatedRoute,
    children: [
      {
        path: "edit/:id",
        name: "ProjectEdit",
        component: ProjectEdit,
      },
      {
        path: "create",
        name: "ProjectCreate",
        component: ProjectCreate,
      },
      {
        path: "show/:id",
        component: ProjectShow,
        children: [
          {
            path: "",
            name: "ProjectShowSkill",
            component: ProjectShowSkill,
          },
          {
            path: "participants",
            name: "ProjectShowEmployee",
            component: ProjectShowEmployee,
          },
          {
            path: "participants/add",
            name: "ProjectShowAddEmployee",
            component: ProjectShowAddEmployee,
          },
        ],
      },
    ],
  },
  {
    path: "/skill",
    name: "Skill",
    component: SkillIndex,
    beforeEnter: authenticatedRoute,
    children: [
      {
        path: "show/:id",
        name: "SkillShow",
        component: SkillShow,
      },
      {
        path: "edit/:id",
        name: "SkillEdit",
        component: SkillEdit,
      },
      {
        path: "create",
        name: "SkillCreate",
        component: SkillCreate,
      },
    ],
  },
  {
    path: "/signin",
    name: "SignIn",
    component: SignIn,
  },
  {
    path: "/signup",
    name: "SignUp",
    component: SignUp,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
