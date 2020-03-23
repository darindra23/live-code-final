const {verify} = require('../helpers/jwt')
module.exports = {
    authentication(req,res,next){
        try {
            let {token} = req.headers
            req.user = verify(token)
            next()
        } catch (error) {
            next(error)
        }
    }
}