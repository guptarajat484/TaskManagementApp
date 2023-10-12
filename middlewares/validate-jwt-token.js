const jwt = require('jsonwebtoken')

function decodejwttoken(req,res,next) {
   
    const token = req.headers['authorization']?.split(' ')[1]
    if (!token) {
        return res.send('Accesses Denied')
    }
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        if(!decoded){
          next(err)
        }
        req.body.email = decoded.email
        req.body.userId = decoded.userId
        next()
    }
    catch (err) {
      next(err)
    }
    
}


module.exports = decodejwttoken