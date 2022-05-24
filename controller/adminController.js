//const bcrypt = require('bcrypt')
//const req = require("express/lib/request")
const Admin = require("../models/admin")
const User = require('../models/user')
const weatherController = require('../controller/weatherController')

const createAdmin = async (req, res) => {
    console.log('in create admin')
    const admin = new Admin(req.body)
    try {
        await admin.save()
        res.status(200).send(`admin craeted ${admin}`)
    }
    catch (err) {
        console.log(`err: ${err.message}`)
        res.status(400).send(err.message)
    }

}
const loginAdmin = async (req, res) => {
    try {
        console.log('in login')
        let admin = await Admin.findOne({ name: req.body.name })
        if (admin) {
            let submittedPass = req.body.password;
            let storedPass = admin.password;
            const passwordMatch = submittedPass === storedPass//await bcrypt.compare(submittedPass, storedPass);
            if (passwordMatch) {
                res.status(200).send(`welcome ${admin.name}!`)
            } else {
                res.status(401).send('invalid passsword')
            }
        }
        else {
            res.status(404).send('admin name not found')
        }
    } catch (err) {
        console.log(`err: ${err.message}`)
        res.status(400).send(err.message)
    }
}
const deleteUser = async (req, res) => {
    try {
        let user = await User.findById(req.params.uid)
        console.log(user)
        if (user) {
            let admin = await Admin.findById(user.admin)//צריך לעשות כשאין JWT
            if (admin) {
                // admin.users = admin.users.filter(userId => userId != user._id)
                // console.log(admin.users)
                // await admin.save()
                // Admin.findByIdAndUpdate(
                //     {}
                // )
                await User.remove(user)
                res.status(200).send("delete")

                // TemplateDoc.findOneAndUpdate(
                //     { userId: _id },
                //     { $pull: { templates: { _id: templateid } } },
                //     { new: true }
                //   )
            }
            else{
                res.status(400).send("admin not found !")
            }
        }
        else {
            res.status(400).send("user not found !")
        }
    }
    catch (err) {
        res.status(400).send(err.message)
    }
}
const updateAdmin = async (req, res) => {
    console.log('in update admin')

    try {
        let preAdmin = Admin.findOne(req.params.name)
        let admin = await Admin.findOneAndUpdate(
            { name: req.params.name },
            {
                name: req.body.name || preAdmin.name,
                password: req.body.password || preAdmin.password,
                email: req.body.email || preAdmin.email,
                users: req.body.users || preAdmin.users,
            },
            { new: true })
        if (admin) {
            res.status(200).send(admin)
        }
        else {
            res.status(400).send(`not found admin with name: ${req.params.name}`)
        }
    }
    catch (err) {
        console.log(`err: ${err.message}`)
        res.status(400).send(err.message)
    }
}
const getAllUsers = async (req, res) => {
    try {
        let users = await Admin.find()
        if (users) {
            res.status(200).send(users)
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
    createAdmin,
    loginAdmin,
    updateAdmin,
    deleteUser,
    getAllUsers
}
/////to del
const t = {
    "coord": { "lon": 35.2163, "lat": 31.769 },
    "weather": [{ "id": 800, "main": "Clear", "description": "clear sky", "icon": "01n" }],
    "base": "stations",
    "main": { "temp": 287.18, "feels_like": 286.94, "temp_min": 282.65, "temp_max": 287.43, "pressure": 1008, "humidity": 88 },
    "visibility": 10000,
    "wind": { "speed": 1.06, "deg": 280, "gust": 1.28 },
    "clouds": { "all": 0 },
    "dt": 1649539414,
    "sys": { "type": 2, "id": 2004982, "country": "IL", "sunrise": 1649560598, "sunset": 1649606637 },
    "timezone": 10800,
    "id": 281184,
    "name": "Jerusalem",
    "cod": 200
}
