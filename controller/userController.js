const User = require("../models/user")
const Admin = require('../models/admin')
const { findById } = require("../models/user")

const createUser = async (req, res) => {
    console.log('in create user')
    const user = new User(req.body)
    try {
        let admin = await Admin.findById(req.body.admin)
        if (admin) {
            console.log(admin)
            admin.users.push(user._id)
            await admin.save()
            await user.save()
            res.status(200).send(`user craeted ${user}`)
        }
        else {
            throw 'admin not found'
        }

    }
    catch (err) {
        console.log(`err: ${err.message}`)
        res.status(400).send(err.message)
    }

}

const loginUser = async (req, res) => {
    try {
        console.log('in login')
        let user = await User.findOne({ name: req.body.name })
        if (user) {
            let submittedPass = req.body.password;
            let storedPass = user.password;
            const passwordMatch = submittedPass === storedPass//await bcrypt.compare(submittedPass, storedPass);
            if (passwordMatch) {
                res.status(200).send(`welcome ${user.name}!`)
            } else {
                res.status(401).send('invalid passsword')
            }
        }
        else {
            res.status(404).send('user name not found')
        }
    } catch (err) {
        console.log(`err: ${err.message}`)
        res.status(400).send(err.message)
    }
}
const updateUserEmail = async (req, res) => {
    try {
        console.log(`user with name: ${req.params.name}`)
        let preUser = User.findOne(req.params.name)
        let user = await User.findOneAndUpdate(
            { name: req.params.name },
            {
                name: req.body.name || preUser.name,
                password: req.body.password || preUser.password,
                email: req.body.email || preUser.email,
                weather: req.body.weather || preUser.weather,
                admin: req.body.admin || preUser.admin,
            },
            { new: true })
        if (user) {
            res.status(200).send(user)
        }
        else {
            res.status(400).send(`not found user with name: ${req.params.name}`)
        }
    }
    catch (err) {
        res.status(400).send(err.message)
    }

}

const getUserById = async (req, res) => {
    try {
        let user = await User.findById(req.params.uid)
        if (user) {
            res.status(200).send(user)
        }
        else {
            res.status(400).send("not found !")
        }
    }
    catch (err) {
        res.status(400).send(err.message)
    }
}

module.exports = {
    createUser,    
    loginUser,
    updateUserEmail,
    getUserById
}