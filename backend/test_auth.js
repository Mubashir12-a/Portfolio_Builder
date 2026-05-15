require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const jwt = require('jsonwebtoken');

mongoose.connect(process.env.MONGO_URI).then(async () => {
    let user = await User.findOne({ email: 'test@example.com' });
    if (!user) {
        user = await User.create({
            name: 'Test User',
            email: 'test@example.com',
            password: 'password123',
            profileCompleted: false
        });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || 'secret_key', { expiresIn: '7d' });
    console.log("TOKEN=" + token);
    process.exit(0);
}).catch(console.error);
