const Task = require('../models/task');

async function createTask(req, res){
    const { name, description } = req.body;
    if(!name || !description){
        return res.status(400).json({message: "Please provide name and description"});
    }
    const task = new Task({
        name,
        description
    });
    try {
        await task.save();
        return res.status(201).json({message : `New task successfully created with ID : ${task._id}`});
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}

async function getTasks(req, res){
    try {
        const tasks = await Task.find();
        return res.status(200).json({tasks});
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}

async function getTask(req, res){
    const {taskId} = req.params;
    try {
        const task = await Task.findById(taskId);
        if(!task){
            return res.status(404).json({message: "Task not found"});
        }
        return res.status(200).json({task});
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}

async function updateTask(req, res){
    const { taskId } = req.params;
   
    try{
        const task = await Task.findByIdAndUpdate(taskId,{...req.body},{ new: true })
        if(!task){
            return res.status(404).json({message:"Task not found"})
        }
        return res.status(200).json({
            message: `Task with ID: ${taskId} has been successfully updated`,
            updatedTask: task
        });
    }catch(err){
        return res.status(500).json({message:err.message})
    }
}

async function deleteTask(req, res){
    const {taskId} = req.params;
    try{
    const task = await Task.findByIdAndDelete(taskId);
    if(!task){
        return res.status(404).json({message : `Task with ID : ${taskId} not found.`})
    }
    return res.status(200).json({message : `Task with ID : ${taskId} has been successfully deleted.`})

    }catch(err){
        return res.status(500).json({message : err.message})
    }
}

module.exports = {createTask, getTasks, getTask, updateTask, deleteTask};