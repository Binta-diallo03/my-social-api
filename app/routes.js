const express = require('express')
const models = require('./models')
const makeController = require('./controllers/factory')

module.exports = (app) => {
    app.get('/', (req, res) => res.status(200).json({ message: 'Bienvenue sur My Social Networks API' }))
    app.get('/health', (req, res) => res.status(200).json({ status: 'OK' }))

    const resources = {
        users: 'user',
        events: 'event',
        groups: 'group',
        discussions: 'discussion',
        messages: 'message',
        albums: 'album',
        photos: 'photo',
        polls: 'poll',
        questions: 'question',
        tickets: 'ticket',
        purchases: 'purchase',
        'shopping-list': 'shopping',
        carpooling: 'carpooling'
    }

    for (const [path, modelKey] of Object.entries(resources)) {
        const controller = makeController(models[modelKey])
        app.post('/' + path, controller.create)
        app.get('/' + path, controller.getAll)
        app.get('/' + path + '/:id', controller.showById)
        app.put('/' + path + '/:id', controller.update)
        app.delete('/' + path + '/:id', controller.delete)
    }

    app.post('/photos/:id/comments', async (req, res, next) => {
        try {
            const photo = await models.photo.findByIdAndUpdate(
                req.params.id,
                { $push: { comments: { author: req.body.author, content: req.body.content } } },
                { new: true, runValidators: true }
            )
            if (!photo) return res.status(404).json({ error: 'Photo introuvable' })
            res.status(201).json(photo)
        } catch (error) { next(error) }
    })

    app.post('/questions/:id/answers', async (req, res, next) => {
        try {
            const question = await models.question.findById(req.params.id)
            if (!question) return res.status(404).json({ error: 'Question introuvable' })
            if (!question.options.includes(req.body.option)) {
                return res.status(400).json({ error: 'Option de réponse invalide' })
            }
            question.answers.push({ participant: req.body.participant, option: req.body.option })
            await question.save()
            res.status(201).json(question)
        } catch (error) { next(error) }
    })
}
