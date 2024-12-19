// Los controladores se encargan de manejar las solicitudes HTTP

const bcrypt = require('bcrypt');
const {findUserByEmail, createUser,changePassword}= require('../models/userModel.js')
const passport = require('passport');
const pool = require('../config/dbConfig.js').pool;
const validator = require('validator');

const registerUser = async (req, res) => {
    try {
        const { name, email, password, password2 } = req.body;
        let errors = [];
        console.log("name:", name);
        console.log("email:", email);
        console.log("password:", password);
        console.log("password2:", password2);

        // Validate inputs
        if (!validator.isEmail(email)) {
            errors.push({ message: 'Email inválido' });
        }
        


        if (!name || !email || !password || !password2) {
            errors.push({ message: 'Campos incompletos!' });
        }
        if (password.length < 6) {
            errors.push({ message: 'Contraseña débil. Su longitud debe ser mayor a 5' });
        }
        if (password !== password2) {
            errors.push({ message: 'Contraseñas no coinciden' });
        }
        if (errors.length > 0) {
            console.log(errors);
            return res.status(400).json({ message: 'Register failed', errors });
        }

        // Check if email already exists
        const existingUser = await findUserByEmail(email);
        if (existingUser) {
            return res.status(409).json({ message: 'Email ya registrado' });
        }

        // Hash password and create user
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await createUser(name, email, hashedPassword);

        return res.status(201).json({
            message: 'Register successful!',
            user: { id: newUser.id, name: newUser.name, email: newUser.email },
        });
    } catch (error) {
        console.error('Error registering user:', error);
        return res.status(500).json({ message: 'An error occurred during registration.' });
    }
};



const loginUser = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            console.error('Authentication error:', err);
            return res.status(500).json({ message: 'An internal error occurred :(' });
        }
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Log in the user
        req.logIn(user, (err) => {
            if (err) {
                console.error('Login error:', err);
                return res.status(500).json({ message: 'Login failed' });
            }

            // On success
            console.log('Logeo satisfactorio')
            return res.json({
                message: 'Login successful!',
                user: { id: user.id, email: user.email }, 
            });
        });
    })(req, res, next); 
};

module.exports = loginUser;

    
const changeUserPassword = async (req, res) => {
    try {
        console.log(req.body);
        const { email, newpassword, newpassword2 } = req.body;
        let errors = [];

        // Validate inputs
        if (!email || !newpassword || !newpassword2) {
            errors.push({ message: 'Campos incompletos!' });
        }
        if (newpassword !== newpassword2) {
            errors.push({ message: 'Contraseñas no coinciden' });
        }
        if (errors.length > 0) {
            console.log(errors);
            return res.status(400).json({ message: 'Change Password Failed', errors });
        }
        console.log("Buscando si existe usuario...")
        // Find user by email
        const existingUser = await findUserByEmail(email);
        if (!existingUser) {
            return res.status(404).json({ message: 'Email not found' });
        }

        console.log("Hasheando contraseña nueva...")
        // Hash new password and update user
        const hashedPassword = await bcrypt.hash(newpassword, 10);
        const response = await changePassword(email, hashedPassword);
        console.log("Cambiando contraseña....")
        
        return res.json({
            message: 'Password updated successfully!',
            user: { id: existingUser.id, email: existingUser.email },
        });
    } catch (error) {
        console.error('Error changing password:', error);
        return res.status(500).json({ message: 'An error occurred while changing password.' });
    }
};


module.exports = {registerUser,loginUser,changeUserPassword};

