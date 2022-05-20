const express = require('express')
const { gettasks, createTask, updateTask } = require('../controller/taskController')


const router = express.Router()

router.route('/')
    .get(gettasks)

router.route('/addtask')
    .post(createTask)


router.route('/:id')
    .put(updateTask)


module.exports = router