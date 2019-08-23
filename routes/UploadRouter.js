const express = require('express')
const { User, Project } = require('../database/models')
const UploadRouter = express.Router()



// UploadRouter.get('/', async (request, response) => {

//     try {
//       console.log("request")
//     //   const projects = await Project.findAll()
  
//     //   response.send(projects)
//     } catch (e) {
//       response.status(500).json({ msg: e.message })
//     }
//   })


UploadRouter.post('/', async(req,res) => {
    console.log("Reached Upload Router POST")
    try {
        const newProject = await Project.create(req.body)

        response.json({
          newProject
        })
      } catch (e) {
        response.status(500).json({ msg: e.message })
      }
})

module.exports = UploadRouter;