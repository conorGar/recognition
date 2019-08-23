const express = require('express')
const app = express()
const bodyParser = require('body-parser')
var aws = require('aws-sdk'); 
const cors = require('cors')
const logger = require('morgan')
const passport = require('passport')
const appRouter = require('./routes/AppRouter')
const AuthRouter = require('./routes/AuthRouter')

require('dotenv').config()


// Routing middleware
const ProjectRouter = require('./routes/ProjectRouter')
const UserRouter = require('./routes/UserRouter')
const UploadRouter = require('./routes/UploadRouter')

const s3Bucket = process.env.S3_BUCKET; //name of S3 bucket(not required to be in .env)

const PORT = process.env.PORT || 3001

// Use Body Parser when tied to databses!!!!!
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(logger('dev'))
app.use(cors())
app.use('/auth', AuthRouter)



// Configure aws with your accessKeyId and your secretAccessKey
aws.config.update({
  region: 'us-east-1', // Put your aws region here
  accessKeyId: process.env.AWSAccessKeyId,
  secretAccessKey: process.env.AWSSecretKey
})



app.get('/', async (req, res) => {
	res.send('connected')
})

app.use('/project', ProjectRouter)


app.use('/users', UserRouter)
app.use('/app', appRouter)

// app.use('/upload', UploadRouter)


app.use(passport.initialize())

app.get('/', async (req, res) => {
  res.send('connected')
})

app.listen(PORT, () => console.log(`Server Started On Port ${PORT}`))
