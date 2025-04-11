const express = require("express");
const Admin = require("../models/admins");
const router = express.Router();

/** POST /admins/register => { admin } */
router.post("/register", async function (req, res, next) {
    try {
        const admin = await Admin.register(req.body);
        return res.status(201).json({ admin });
    } catch (err) {
        return next(err);
    }
});

/** POST /admins/login => { admin } */
router.post("/login", async function (req, res, next) {
    try {
        const admin = await Admin.authenticate(req.body.username, req.body.password);
        return res.json({ admin });
    } catch (err) {
        return next(err);
    }
});

/** GET /admins => [ { id, username, email }, ... ] */
router.get("/", async function (req, res, next) {
    try {
        const admins = await Admin.findAll();
        return res.json({ admins });
    } catch (err) {
        return next(err);
    }
});

/** DELETE /admins/:id => { deleted: id } */
router.delete("/:id", async function (req, res, next) {
    try {
        await Admin.remove(req.params.id);
        return res.json({ deleted: req.params.id });
    } catch (err) {
        return next(err);
    }
});

module.exports = router;
