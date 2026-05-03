const usersService = require('./users.service');

const getAll = async (req, res, next) => {
  try {
    const users = await usersService.getAll();
    res.json(users);
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const user = await usersService.getById(req.params.id);
    res.json(user);
  } catch (error) {
    next(error);
  }
};

module.exports = { getAll, getById };
