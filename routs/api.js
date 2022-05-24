const router=require('express').Router()
const adminController=require('../controller/adminController')
const userController=require('../controller/userController')
const weatherController=require('../controller/weatherController')

//admin
router.post('/createAdmin',adminController.createAdmin);
router.post('/loginAdmin',adminController.loginAdmin)
router.delete('/deleteUser/:uid',adminController.deleteUser)
router.put('/updateAdmin/:name',adminController.updateAdmin);
router.get('/getAllUsers',adminController.getAllUsers)
//user
router.post('/createUser',userController.createUser);
router.post('/loginUser',userController.loginUser)
router.put('/updateUserEmail/:name',userController.updateUserEmail);
router.get('/getUserById/:uid',userController.getUserById)

//weather
router.post('/createWeather/:uid/:city',weatherController.createWeather);
router.delete('/deleteWeather/:wid',weatherController.deleteWeather)
router.get('/getWeathersByUserId/:uid',weatherController.getWeathersByUserId)
router.get('/getWeatherById/:wid',weatherController.getWeatherById)


module.exports=router;