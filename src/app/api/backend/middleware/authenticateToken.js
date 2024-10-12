import jwt from "jsonwebtoken"

const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (token == null)
        return res.sendStatus(401).send({
            error: true,
            message: "Token not found"
        });

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) return res.status(401).send({
            error: true,
            message: "Wrong Token or expired Token"
        });

        user = { userId: decoded.userId };
        req.user = user;
        next();
    });
}

module.exports = authenticateToken;