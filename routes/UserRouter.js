const express = require('express')
const { User, Project } = require('../database/models')
const UserRouter = express.Router()

/********* GET -- localhost:PORT/restaurants *********/
UserRouter.get('/', async (request, response) => {
  try {
    const users = await User.findAll()
    response.send(users)
  } catch (e) {
    response.status(500).json({ msg: e.message })
  }
})

/********* GET -- localhost:PORT/restaurants/2 *********/
UserRouter.get('/:id', async (request, response) => {
  try {
    const id = request.params.id
    const user = await User.findByPk(id, {
      include: [Project]
    })
    if (!user) throw Error('User not found')
    response.json({
      user
    })
  } catch (e) {
    response.status(404).json({ msg: e.message })
  }
})

/********* CREATE -- localhost:PORT/restaurants *********/
UserRouter.post('/signup', async (request, response) => {
  try {
    const newUser = await User.create(request.body)
    response.json({
      newUser
    })
  } catch (e) {
    response.status(500).json({ msg: e.message })
  }
})

/********* UPDATE -- localhost:PORT/restaurants/2 *********/
UserRouter.put('/:id', async (request, response) => {
  try {
    const id = request.params.id
    const updatedUser = await User.findByPk(id)

    if (updatedUser) await updatedUser.update(request.body)
    response.json({
      updatedUser
    })
  } catch (e) {
    response.status(304).json({
      message: e.message
    })
  }
})

/********* DELETE -- localhost:PORT/restaurants/2 *********/
UserRouter.delete('/:id', async (request, response) => {
  try {
    const id = request.params.id

    await User.destroy({
      where: {
        id: id
      }
    })

    response.json({
      message: `User with id ${id} deleted`
    })
  } catch (e) {
    response.json({ msg: e.message })
  }
})

module.exports = UserRouter
