const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const logger = require('morgan')

// Routing middleware
const ProjectRouter = require('./routes/ProjectRouter')
const UserRouter = require('./routes/UserRouter')

const PORT = process.env.PORT || 3001

// Use Body Parser when tied to databses!!!!!
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(logger('dev'))
app.use(cors())

app.get('/', async (req, res) => {
	res.send('connected')
})

app.use('/projects', ProjectRouter)
app.use('/user', UserRouter)

app.listen(PORT, () => console.log(`Server Started On Port ${PORT}`))
