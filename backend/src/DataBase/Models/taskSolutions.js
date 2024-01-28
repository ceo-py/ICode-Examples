const mongoose = require('mongoose');

const taskSolution = new mongoose.Schema({
    id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    taskName: { type: String, require: true },
    language: { type: String, require: true },
    course: { type: String, require: true },
    module: { type: String, require: true },
    videoLink: { type: String, default: '' },
    githubLink: { type: String, require: true, unique: true },
    project: { type: String, require: false, unique: true },
});

const TaskSolution = mongoose.model('TaskSolution', taskSolution, 'TaskSolutions');

module.exports = TaskSolution;
