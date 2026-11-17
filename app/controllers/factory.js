function makeController(Model, options = {}) {
    return {
        create: async (req, res, next) => {
            try {
                const doc = await Model.create(req.body)
                res.status(201).json(doc)
            } catch (error) { next(error) }
        },
        getAll: async (req, res, next) => {
            try {
                const docs = await Model.find().sort({ createdAt: -1 })
                res.status(200).json(docs)
            } catch (error) { next(error) }
        },
        showById: async (req, res, next) => {
            try {
                const doc = await Model.findById(req.params.id)
                if (!doc) return res.status(404).json({ error: 'Ressource introuvable' })
                res.status(200).json(doc)
            } catch (error) { next(error) }
        },
        update: async (req, res, next) => {
            try {
                const doc = await Model.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
                if (!doc) return res.status(404).json({ error: 'Ressource introuvable' })
                res.status(200).json(doc)
            } catch (error) { next(error) }
        },
        delete: async (req, res, next) => {
            try {
                const doc = await Model.findByIdAndDelete(req.params.id)
                if (!doc) return res.status(404).json({ error: 'Ressource introuvable' })
                res.status(200).json({ message: 'Ressource supprimée', id: doc._id })
            } catch (error) { next(error) }
        }
    }
}
module.exports = makeController
