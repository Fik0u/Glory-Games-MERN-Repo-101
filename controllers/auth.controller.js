// Importing required modules
const User = require('../model/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Register
exports.register = async (req, res) => {
    try {
        const { fullName, email, password, address, country, phone } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne( { email });
        if (existingUser) {
            return res.status(400).json({ errors: [{ msg : 'User already exists' }]});
        }

        const saltRounds = 10;
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = await User({ fullName, email, password: hashedPassword, address, country, phone });

        await newUser.save();

        // Token generation
        const token = jwt.sign({ id: newUser._id }, process.env.SECRET_KEY, { expiresIn: '24h'});
        

        res.status(201).json({ success : [{msg: 'User registered successfully'}], user: newUser, token });
    } catch (error) {
        res.status(400).json({ errors: [{msg: 'Registration failed'}], error });
    }
};

// Login
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        // Check if user exists
        const foundUser = await User.findOne({ email });
        if (!foundUser) {
            return res.status(400).json({ errors: [{ msg: 'Invalid credentials I' }]});
        }
        // Check password
        const isMatch = await bcrypt.compare(password, foundUser.password);
        if (!isMatch) {
            return res.status(400).json({ errors: [{ msg: 'Invalid credentials II' }]});
        }
        // Token generation
        const token = jwt.sign({ id: foundUser._id }, process.env.SECRET_KEY, { expiresIn: '24h'});
        // Send response
        res.status(200).json({ success: [{ msg: 'Login successfully' }], user: foundUser, token });
    } catch (error) {
        res.status(400).json({ errors: [{ msg: 'Login failed' }], error });
    }
}