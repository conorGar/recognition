const express = require('express')
const { Restaurant, Review } = require('../database/models')
const RestaurantRouter = express.Router()

/********* GET -- localhost:PORT/restaurants *********/
RestaurantRouter.get('/', async (request, response) => {
	try {
		const restaurants = await Restaurant.findAll()
		const restaurant = []
		for (let i = 0; i < restaurants.length; i++) {
			const findReviews = await Review.findAndCountAll({
				where: { restaurantId: restaurants[i].dataValues.id }
			})
			let restaurantData = {
				restaurant: restaurants[i],
				reviews: findReviews.count
			}
			restaurant.push(restaurantData)
		}
		response.send(restaurant)
	} catch (e) {
		response.status(500).json({ msg: e.message })
	}
})

/********* GET -- localhost:PORT/restaurants/2 *********/
RestaurantRouter.get('/:id', async (request, response) => {
	try {
		const id = request.params.id
		const restaurant = await Restaurant.findByPk(id, {
			include: [Review]
		})

		if (!restaurant) throw Error('Restaurant not found')

		response.json({
			restaurant
		})
	} catch (e) {
		response.status(404).json({ msg: e.message })
	}
})

/********* CREATE -- localhost:PORT/restaurants *********/
RestaurantRouter.post('/', async (request, response) => {
	try {
		const restaurant = await Restaurant.create(request.body)
		response.json({
			restaurant
		})
	} catch (e) {
		response.status(500).json({ msg: e.message })
	}
})

/********* UPDATE -- localhost:PORT/restaurants/2 *********/
RestaurantRouter.put('/:id', async (request, response) => {
	try {
		const id = request.params.id
		const restaurant = await Restaurant.findByPk(id)

		if (restaurant) await restaurant.update(request.body)
		response.json({
			restaurant
		})
	} catch (e) {
		response.status(304).json({
			message: e.message
		})
	}
})

/********* DELETE -- localhost:PORT/restaurants/2 *********/
RestaurantRouter.delete('/:id', async (request, response) => {
	try {
		const id = request.params.id

		await Restaurant.destroy({
			where: {
				id: id
			}
		})

		await Review.destroy({
			where: {
				restaurantId: id
			}
		})

		response.json({
			message: `Restaurant with id ${id} deleted`
		})
	} catch (e) {
		response.json({ msg: e.message })
	}
})

module.exports = RestaurantRouter
