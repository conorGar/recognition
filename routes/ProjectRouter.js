const express = require('express')
const { User, Project } = require('../database/models')
const ProjectRouter = express.Router()

/********* GET -- localhost:PORT/restaurants *********/
ProjectRouter.get('/', async (request, response) => {
  try {
    const projects = await Project.findAll()
    response.send(projects)
  } catch (e) {
    response.status(500).json({ msg: e.message })
  }
})

/********* GET -- localhost:PORT/restaurants/2 *********/
ProjectRouter.get('/:id', async (request, response) => {
  try {
    const id = request.params.id
    const project = await Project.findByPk(id, {
      include: [User]
    })
    response.send(project)
  } catch (e) {
    response.status(404).json({ msg: e.message })
  }
})

/********* CREATE -- localhost:PORT/restaurants *********/
ProjectRouter.post('/create/user/:id', async (request, response) => {
  try {
    const project = await Project.create(request.body)
    const user = await User.findByPk(request.params.id)
    project.setUsers(user)
    response.json(project)
  } catch (e) {
    response.status(500).json({ msg: e.message })
  }
})

/********* UPDATE -- localhost:PORT/restaurants/2 *********/
ProjectRouter.put('/:id', async (request, response) => {
  try {
    const id = request.params.id
    const project = await Project.findByPk(id)

    if (project) await project.update(request.body)
    response.json({
      project
    })
  } catch (e) {
    response.status(304).json({
      message: e.message
    })
  }
})

/********* DELETE -- localhost:PORT/restaurants/2 *********/
ProjectRouter.delete('/:id', async (request, response) => {
  try {
    const id = request.params.id

    await Project.destroy({
      where: {
        id: id
      }
    })

    response.json({
      message: `Project with id ${id} deleted`
    })
  } catch (e) {
    response.json({ msg: e.message })
  }
})

module.exports = ProjectRouter
