const Users = require('../models/userModel')

//setting up controllers (mvc models)
const  userControllers = {
    register: async (req, res) => {
        try {
            res.json ({msg: "user test"})
        }catch(err){
            return res.status(500).json({msg:err.message})
        }
    }
}

module.exports = userControllers;