const jwt = require("jsonwebtoken");
const { config } = require("../config/index");
const { BadRequestError } = require("./errors");

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return next(new BadRequestError(401, "Unauthorized"));
    }

    const token = authHeader.replace("Bearer ", "");

    jwt.verify(token, config.jwt.secret, (error, decoded) => {
        if (error) {
            console.log(error);
            return next(new BadRequestError(401, "Unauthorized"));
        }

        req.user = decoded;
        next();
    });
};

module.exports = {
    verifyToken
}