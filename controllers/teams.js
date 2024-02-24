const teamsRouter = require('express').Router();
const Team = require('../models/team');
const User = require('../models/user');

const { userExtractor } = require('../utils/middleware');

teamsRouter.get('/', async (request, response) => {
    const teams = await Team.find({}).populate('members', { username: 1, name: 1 });
    response.json(teams);
    })

    teamsRouter.get('/:id', async (request, response) => {
        const team = await Team.find({}).populate('user', { username: 1, name: 1 })
        response.json(team)
    })

    teamsRouter.get('/:id', async (request, response) => {
        const team = await Team.findById(request.params.id)
        if (team) {
            response.json(team)
        } else {
            request.statusCode(404).end()   

