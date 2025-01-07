const Task = require('../models/Task');

exports.getTasks = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const tasks = await Task.find({ user: req.user.id }).skip(skip).limit(limit);
    const totalTasks = await Task.countDocuments({ user: req.user.id });

    res.status(200).json({
      tasks,
      totalTasks,
      totalPages: Math.ceil(totalTasks / limit),
      currentPage: page,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.addTask = async (req, res) => {
  try {
    const { title, description } = req.body;
    const newTask = new Task({ title, description, user: req.user.id });
    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status } = req.body;

    let task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Ensure user owns the task
    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    task = await Task.findByIdAndUpdate(
      id,
      { title, description, status },
      { new: true }
    );

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    let task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Ensure user owns the task
    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await Task.findByIdAndDelete(id);

    res.status(200).json({ message: 'Task deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};