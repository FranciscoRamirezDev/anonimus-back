const tasksService = require('./tasks.service');

const getAll = async (req, res, next) => {
  try {
    const tasks = await tasksService.getAll();
    res.json(tasks);
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const task = await tasksService.create(req.body);
    res.status(201).json(task);
  } catch (error) {
    next(error);
  }
};

module.exports = { getAll, create };
