/**
 * Server
 */
var express = require('express');
var app = express();

/**
 * Database
 */
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');
var Schema = mongoose.Schema;
var TaskSchema = new Schema({ title: String, date: { type: Date, default: Date.now }, completed: Boolean });
var Task = mongoose.model('Task', TaskSchema);

/**
 * Create a task
 */
app.get('/task/create', (req, res) => {
    // Grab the title from request query
    var task = req.query.title;

    // Create a task
    Task.create({ title: task, completed: false }, function (err, task) {
        if (err) return handleError(err);
        res.send(task);
    }); 
});

/**
 * Delete a task
 */
app.get('/task/delete', (req, res) => {
    // Grab the id from request query
    var task = req.query.id;

    // Create a task
    Task.findByIdAndRemove(task, function (err, task) {
        if (err) return handleError(err);

        // Successful delete
        res.json({message: 'Task "' + task.title + '" is deleted'});
    });
});

/**
 * Get list of tasks
 */
app.get('/tasks', (req, res) => {
    Task.find({}, (err, tasks) => {
        var taskMap = {};

        tasks.forEach(function(task) {
            taskMap[task._id] = task;
        });

        res.send(taskMap);
    });
});

/**
 * Home page
 */
app.get('/', (req, res) => {
    res.sendFile('index.html', { root: __dirname + '/public' });
});

/**
 * Javascript Bundle
 */
app.get('/assets/bundle.js', (req, res) => {
    res.sendFile('bundle.js', { root: __dirname + '/public/assets'});
});

/**
 * Port
 */
app.listen('3000', () => {
    console.log('Server is running on port 3000');
});