const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const compression = require('compression')
const cors = require('cors')
const helmet = require('helmet')
const rateLimit = require('express-rate-limit')
const config = require('./config')
const routes = require('./routes')

module.exports = class Server {
    constructor() {
        this.app = express()
        this.config = config.development
    }

    middleware() {
        this.app.use(compression())
        this.app.use(helmet())
        this.app.use(cors())
        this.app.use(bodyParser.urlencoded({ extended: true }))
        this.app.use(bodyParser.json())
    }

    security() {
        this.app.disable('x-powered-by')
        this.app.use(rateLimit({
            windowMs: 60 * 60 * 1000,
            limit: 200,
            standardHeaders: 'draft-7',
            legacyHeaders: false
        }))
    }

    registerRoutes() {
        routes(this.app)
        this.app.use((req, res) => {
            res.status(404).json({ error: 'Route introuvable', method: req.method, path: req.originalUrl })
        })
        this.app.use((err, req, res, next) => {
            console.error(err)
            res.status(err.status || 500).json({ error: err.message || 'Erreur serveur' })
        })
    }

    async run() {
        this.security()
        this.middleware()
        this.registerRoutes()

        try {
            if (!this.config.mongodb) {
                throw new Error('MONGODB_URI absent. Configure le fichier .env.')
            }
            await mongoose.connect(this.config.mongodb)
            console.log('Connexion MongoDB réussie')

            const port = this.config.port
            this.app.listen(port, () => {
                console.log(`Serveur démarré : http://localhost:${port}`)
            })
        } catch (error) {
            console.error('Impossible de démarrer le serveur :', error.message)
            process.exit(1)
        }
    }
}
