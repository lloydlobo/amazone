import mongoose from 'mongoose'

// Create models to deal with database.

// Define schema for each user.
const userScheme = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        isAdmin: { type: Boolean, required: true, default: false },
    },
    {
        timestamps: true,
    }
)

// If User is already created, no need to go for model func.
// Except for the first time.
const User = mongoose.models.User || mongoose.model('User', userScheme)

export default User

