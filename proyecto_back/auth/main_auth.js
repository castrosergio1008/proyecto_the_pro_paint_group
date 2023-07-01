const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    try{
        console.log("pro");
        const token = req.headers.authorization.split(' ')[1]
        const decoded = jwt.verify(token, "__recret__")
        req.user = decoded
        next()
    } catch(error) {
        res.status(401)
        res.json({code: 4, msg:"no tienes permiso para acceder"})
    }
}

module.exports = auth;