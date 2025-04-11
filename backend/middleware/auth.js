const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY || "dev-secret";

/** Middleware to authenticate JWT in Authorization header. */
function authenticateJWT(req, res, next) {
    try {
        const authHeader = req.headers && req.headers.authorization;

        if (authHeader) {
            const token = authHeader.replace(/^[Bb]earer /, "").trim();
            res.locals.user = jwt.verify(token, SECRET_KEY);
        }

        return next();
    } catch (err) {
        return res.status(401).json({ error: "Unauthorized: Invalid token" });
    }
}

/** Middleware to ensure the user is an admin. */
function ensureAdmin(req, res, next) {
    if (!res.locals.user || !res.locals.user.isAdmin) {
        return res.status(403).json({ error: "Forbidden: Admins only" });
    }

    return next();
}

module.exports = {
    authenticateJWT,
    ensureAdmin
};
