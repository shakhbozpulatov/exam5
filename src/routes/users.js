const express = require("express");
const Controller = require("../controllers/users");
const { mAuth, mIsAdmin } = require("../middleware");

module.exports = class UsersRoutes {
  path;
  router;
  controller;

  constructor() {
    this.path = "/users";
    this.router = express.Router();
    this.controller = new Controller();

    this.initRoutes();
  }

  /** @returns {void} */
  initRoutes = () => {
    this.router.get("/", mAuth, mIsAdmin, this.controller.GET_ALL_USERS);
    this.router.get("/:id", mAuth, mIsAdmin, this.controller.GET_USER);
  };
};
