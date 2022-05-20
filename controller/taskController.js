const Task = require('../models/Task')

// declare default tasks array

let allTasks = [{ category: 'Category 1', todo: 'todo 1'}]

// controller to create tasks
const createTask = async (req, res) => {

    // save task in db
        const task = await Task.create({
            category: req.body.category,
            todo: req.body.todo
        })

        const newItem = {
            category: req.body.category,
            todo: req.body.todo
        }

        // add task to array
        allTasks.push(newItem)
        // res.json({
        //     success: true,
        //     task
        // })
        res.redirect("/");
}

const gettasks = async (req, res) => {
        const tasks = await Task.find({})

        // res.json({
        //     success: true,
        //     data: tasks
        // })
        res.render("index", { task: allTasks });
}

const updateTask = async (req, res) => {


    const allTasks = await Task.find({})
    const task = await Task.findById(req.params.id)

    if(task) {

        // check if all tasks in previous category is completed

        if(!task.previousCategory) {
            // update tasks as it does not have a parent todo
            task.status = true
        } else {
            let filterTasks  = allTasks.filter((tk) => tk.category === task.previousCategory);

            // check if all tasks has been completed
            let isAllTasknotCompleted = false 
            for (let i = 0; i < filterTasks.length; i++) {
                const newtK = filterTasks[i];
                
                if(newtK.status === false) {
                    isAllTasknotCompleted = true
                }
            }
            // If All Tasks in previous category has not been completed return an error
            if(isAllTasknotCompleted) {
                res.json({
                    success: false,
                    message: 'Previous Category tasks have not been completed'
                })
            } else {
                // update task status
                task.status = true
            }
        }

        await task.save()

        res.json({
            success: true,
            message: 'Task created'
        })
    } else {
        res.status(404)
        throw new Error('Not found')
    }
}


const getCategoryTasks = async (req, res) => {

    if(!req.params.category) {
        res.status(500)
        throw new Error('Please provide category')
    }

    const categoryTasks = await Task.find({ category: req.params.category })

    if(categoryTasks) {
        res.json({
            success: true
        })
    } else {
        res.json({
            success: false,
            messgae: 'No tasks found'
        })
    }

}




module.exports = {
    createTask,
    gettasks,
    updateTask,
    getCategoryTasks,
}