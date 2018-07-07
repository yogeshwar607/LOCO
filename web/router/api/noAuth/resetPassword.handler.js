const jwt = require('jsonwebtoken');
const {
    jwtSecret
} = rootRequire('config').server;
const {
    QueryBuilder,
    database: pg,
} = rootRequire('db');

const {
    getTableName
} = rootRequire('commons').TABLES;
const {
    verifyToken,
    generateSecret,
    trimObject,
    postgresDateString,
} = rootRequire('commons').UTILS;


async function logic({
    context,
    params
}) {
    let custId
    try {
        // validate this token as same to otp validation
        const token = params.id;
        jwt.verify(token, jwtSecret, async function (err, decoded) {
            if (err) {
                logger.error(`The error while decoding token ${err}`);
                return {
                    "msg": "Error in verifying email",
                    "is_email_verified": false
                };
            }
            custId = [decoded.sub.id];
            return {
                "msg":"email verified successfully",
                "is_email_verified": true
            };
        })

    } catch (e) {
        logger.error(e);
        throw e;
    } finally {
    
    }
}

function handler(req, res, next) {

    logic(req)
        .then(data => {
            // res.json({
            //     success: true,
            //     data,
            // });
            res.status(301).redirect("http://www.xwapp.com")

        })
        .catch(err => next(err));
}
module.exports = handler;