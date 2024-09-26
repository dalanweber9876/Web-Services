const routes = require('express').Router();
const lesson1Controller = require('../controllers/lesson1');

routes.get('/dan', lesson1Controller.danRoute);
routes.get('/', lesson1Controller.jenniferRoute);
routes.get('/lily', lesson1Controller.lilyRoute);
routes.get('/lana', lesson1Controller.lanaRoute);

module.exports = routes;