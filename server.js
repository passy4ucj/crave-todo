const express = require('express')
const morgan = require('morgan')
const dotenv = require('dotenv')
const colors = require('colors')
const { notFound, errorHandler } = require('./middleware/errorMiddleware')


// Creating an express app
const app = express()

const connectDB = require('./config/db')

// Initializing dotenv || Load env vars
dotenv.config({ path: './config/config.env' })

// Connect to database
connectDB()


// Import Route files
const tasks = require('./routes/tasksRoutes')


// using JSON parser
app.use(express.json({}))

// setup ejs
app.set('view engine', 'ejs');

// Dev logging middleware
if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}


// Render tasks using ejs template engines

// Mount routers
app.use('/', tasks)

// app.get('/', (req, res) => {
//     // res.json({
//     //     message: 'CRAVE API'
//     // })
//     res.render('index');
// })


// Use error Middleware
app.use(notFound)
app.use(errorHandler)


const PORT = process.env.PORT || 5000
app.listen(PORT, 
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold))