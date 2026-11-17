const mongoose = require('mongoose')

const { Schema } = mongoose
const id = { type: Schema.Types.ObjectId, ref: 'User' }

const schemas = {
    user: new Schema({
        firstName: { type: String, required: true, trim: true },
        lastName: { type: String, required: true, trim: true },
        email: { type: String, required: true, unique: true, lowercase: true, trim: true },
        password: { type: String, required: true },
        avatar: String
    }, { timestamps: true }),

    event: new Schema({
        name: { type: String, required: true },
        description: { type: String, default: '' },
        startDate: { type: Date, required: true },
        endDate: { type: Date, required: true },
        location: { type: String, required: true },
        coverPhoto: String,
        isPublic: { type: Boolean, default: true },
        organizers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
        participants: [{ type: Schema.Types.ObjectId, ref: 'User' }],
        shoppingListEnabled: { type: Boolean, default: false },
        carpoolingEnabled: { type: Boolean, default: false }
    }, { timestamps: true }),

    group: new Schema({
        name: { type: String, required: true },
        description: String,
        type: { type: String, enum: ['public', 'private', 'secret'], default: 'public' },
        icon: String,
        coverPhoto: String,
        membersCanPost: { type: Boolean, default: true },
        membersCanCreateEvents: { type: Boolean, default: false },
        members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
        admins: [{ type: Schema.Types.ObjectId, ref: 'User' }]
    }, { timestamps: true }),

    discussion: new Schema({
        title: { type: String, required: true },
        group: { type: Schema.Types.ObjectId, ref: 'Group' },
        event: { type: Schema.Types.ObjectId, ref: 'Event' }
    }, { timestamps: true }),

    message: new Schema({
        discussion: { type: Schema.Types.ObjectId, ref: 'Discussion', required: true },
        author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        content: { type: String, required: true }
    }, { timestamps: true }),

    album: new Schema({
        name: { type: String, required: true },
        event: { type: Schema.Types.ObjectId, ref: 'Event', required: true }
    }, { timestamps: true }),

    photo: new Schema({
        album: { type: Schema.Types.ObjectId, ref: 'Album', required: true },
        event: { type: Schema.Types.ObjectId, ref: 'Event', required: true },
        author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        url: { type: String, required: true },
        comments: [{ author: { type: Schema.Types.ObjectId, ref: 'User' }, content: String, createdAt: { type: Date, default: Date.now } }]
    }, { timestamps: true }),

    poll: new Schema({
        event: { type: Schema.Types.ObjectId, ref: 'Event', required: true },
        organizer: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        title: { type: String, required: true }
    }, { timestamps: true }),

    question: new Schema({
        poll: { type: Schema.Types.ObjectId, ref: 'Poll', required: true },
        text: { type: String, required: true },
        options: [{ type: String, required: true }],
        answers: [{ participant: { type: Schema.Types.ObjectId, ref: 'User' }, option: String }]
    }, { timestamps: true }),

    ticket: new Schema({
        event: { type: Schema.Types.ObjectId, ref: 'Event', required: true },
        name: { type: String, required: true },
        price: { type: Number, required: true, min: 0 },
        quantity: { type: Number, required: true, min: 1 },
        remaining: { type: Number, required: true, min: 0 }
    }, { timestamps: true }),

    purchase: new Schema({
        ticket: { type: Schema.Types.ObjectId, ref: 'Ticket', required: true },
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        email: { type: String, required: true, lowercase: true },
        address: { type: String, required: true },
        purchaseDate: { type: Date, default: Date.now }
    }, { timestamps: true }),

    shopping: new Schema({
        event: { type: Schema.Types.ObjectId, ref: 'Event', required: true },
        itemName: { type: String, required: true },
        quantity: { type: Number, required: true, min: 1 },
        arrivalTime: Date
    }, { timestamps: true }),

    carpooling: new Schema({
        event: { type: Schema.Types.ObjectId, ref: 'Event', required: true },
        departureLocation: { type: String, required: true },
        departureTime: { type: Date, required: true },
        price: { type: Number, default: 0, min: 0 },
        availableSeats: { type: Number, required: true, min: 1 },
        maxTimeDeviation: { type: Number, default: 0, min: 0 }
    }, { timestamps: true })
}

const modelNames = {
    user: 'User', event: 'Event', group: 'Group', discussion: 'Discussion',
    message: 'Message', album: 'Album', photo: 'Photo', poll: 'Poll',
    question: 'Question', ticket: 'Ticket', purchase: 'Purchase',
    shopping: 'ShoppingItem', carpooling: 'Carpooling'
}

const models = {}
for (const key of Object.keys(schemas)) {
    models[key] = mongoose.models[modelNames[key]] || mongoose.model(modelNames[key], schemas[key])
}

module.exports = models
