const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config/index");

module.exports = class AuthController {
  constructor() {}

  /**
   * @returns {Promise<void>}
   */
  REGISTER = async (req, res, next) => {
    try {
      let { firstName, lastName, username, password, age } = req.body;

      const user = await prisma.user.findFirst({
        where: { username },
      });
      if (user)
        return res.status(404).json({
          msg: "The user has been already registered",
        });

      password = await bcrypt.hash(password, 10);
      const newUser = await prisma.user.create({
        data: {
          firstName,
          lastName,
          username,
          password,
          age,
        },
      });

      res.status(200).json({
        data: newUser,
      });

      await next();
    } catch (error) {
      next(error);
    }
  };
  /**
   * @returns {Promise<void>}
   */
  LOGIN = async (req, res, next) => {
    try {
      let { username, password } = req.body;

      const user = await prisma.user.findFirst({
        where: { username },
      });
      if (!user)
        return res.status(404).json({
          msg: "Username or password is incorrect",
        });

      let isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword)
        return res.status(400).json({
          msg: "Username or password is incorrect",
        });

      const token = jwt.sign(
        {
          id: user.id,
          role: user.role,
        },
        config.SECRET_CODE,
        {
          expiresIn: 86400,
        }
      );
      res.status(200).json({
        data: user,
        message: "Ok",
        token: token,
      });

      await next();
    } catch (error) {
      next(error);
    }
  };

  GETME = async (req, res, next) => {
    try {
      let user_id = req.user.id;

      let user = await prisma.user.findUnique({
        where: {
          id: user_id,
        },
      });

      res.status(200).json({
        msg: "ok",
        data: user,
      });
    } catch (error) {
      next(error);
    }
  };
};
