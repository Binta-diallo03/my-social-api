require('dotenv').config()

module.exports = {
    development: {
        port: process.env.PORT || 3000,
        mongodb: process.env.MONGODB_URI,
        jwtSecret: process.env.JWT_SECRET || 'change_this_secret_key'
    }
}
