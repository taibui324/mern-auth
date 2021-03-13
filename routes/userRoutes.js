const router = require ('express').Router()

const userControllers = ('../controllers/userControllers')
router.post('/register', userControllers.register)

module.exports = router 
