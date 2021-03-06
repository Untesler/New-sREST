const jwt             = require('jsonwebtoken'),
      { authenticate } = require('./Authenication'),
      fs              = require('fs'),
      path            = require('path'),
      PRIVATE_KEY     = fs.readFileSync(path.resolve(__dirname, '../config/private.key')),
      validator       = require('validator')

const verifyToken = async (req, res) => {
    const accessToken = await authenticate(req.body.accessToken)
    let   result      = accessToken ? 'Valid token' : 'Invalid token'

    return res.status(200).json({
        result: result
    })
}

const genToken = async (req, res) => {
    let   signToken = '',
          payload   = req.body

    if (!(payload.name || payload.dt)) return res.sendStatus(400)
    else {
        if (!validator.isRFC3339(payload.dt)) return res.sendStatus(400)
        signToken = jwt.sign(payload, PRIVATE_KEY, {}) // Permanent access token
    }
    return res.status(200).json({
        token: signToken
    })
}

module.exports = {
    verifyToken,
    genToken
}