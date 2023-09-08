const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = class UsersController {
  constructor() {}

  GET_ALL_USERS = async (req, res, next) => {
    try {
      let user = await prisma.user.findMany({});

      res.status(200).json({
        data: user,
      });
    } catch (error) {
      next(error);
    }
  };

  GET_USER = async (req, res, next) => {
    try {
      let user = await prisma.user.findUnique({
        where: {
          id: parseInt(req.params.id),
        },
      });

      if (!user)
        return res.status(404).json({
          msg: "User not found",
        });

      return res.status(200).json({
        data: user,
      });
    } catch (error) {
      next(error);
    }
  };
};
