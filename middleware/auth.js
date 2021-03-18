const jwt = require('jsonwebtoken')


const auth = (req, res, next) => { 

    //const auth = (req,res,next) ={ { try {
    // catch(err) return res.status(400).json
    
    try {
        const token = req.header("Authorization") //verify the authorization 
        if(!token) return res.status(400).json({msg: "Invalid Authentication."}) 

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if(err) return res.status(400).json({msg: "Invalid Authentication."}) //if token ssecrete isn't verify 

            req.user = user
            next()
        })
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
}

module.exports = auth