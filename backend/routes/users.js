const jsonschema = require("jsonschema");

const express = require("express");
const router = express.Router();
const logger = require("../lib/logger");
const log = logger();
const User = require("../models/userModels");
const userNewSchema = require("../schemas/userNew.json")
const userUpdateSchema = require("../schemas/userUpdate.json")


router.post("/login", async function (req, res, next) {
  try {
    const user = await User.authenticate(req.body.username, req.body.password);
    return res.json({ user });
  } catch (err) {
    return next(err);
  }
});

/** GET /users => { users: [ ... ] } */
router.get("/", async function (req, res, next) {

  try {
    const users = await User.findAll();

    res.json({ users });
  } catch (err) {
    return next(err);
  }
});

/** POST /users => { user } */
router.post("/", async function (req, res, next) {

  try {
    const validator = jsonschema.validate(req.body, userNewSchema);

    if (!validator.valid) {

      const errs = validator.errors.map(e => e.stack);
      throw new Error(errs);
    }

    const user = await User.register(req.body);
    log.info("Created user", user);
    res.status(201).json({ user });
  } catch (err) {
    return next(err);
  }
});

/** GET /users/:id => { user } */
router.get("/:id", async function (req, res, next) {
  try {
    const user = await User.get(req.params.id);
    res.json({ user });
  } catch (err) {
    return next(err);
  }
});

/** PUT /users/:id => { user } */
router.patch("/edit/:id", async function (req, res, next) {
  try {
    // if (+req.params.id !== +req.body.id) {
    //   return next(new Error("ID parameter does not match body"));
    // }

    const validator = jsonschema.validate(req.body, userUpdateSchema);
    if (!validator.valid) {
      const errs = validator.errors.map(e => e.stack);
      throw new Error(errs);
    }

    const user = await User.update(req.params.id, req.body);
    log.info("Updated user", user);
    res.json({ user });
  } catch (err) {
    return next(err);
  }
});

/** DELETE /users/delete/:id => { deleted: id } */
router.delete("/delete/:id", async function (req, res, next) {

  try {
    await User.remove(req.params.id);
    log.info("Deleted user with id", req.params.id);
    return res.status(204).json({ message: "Deleted" });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
