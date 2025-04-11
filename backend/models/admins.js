"use strict";


// FOR FUTURE PROJECT!


const db = require("../db.js");
const bcrypt = require("bcrypt");
const { BCRYPT_WORK_FACTOR } = require("../config.js");

class Admin {
    /** Register a new admin */
    static async register({ username, password, email }) {
        const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);

        const result = await db.query(
            `INSERT INTO admins (username, password, email)
       VALUES ($1, $2, $3)
       RETURNING id, username, email`,
            [username, hashedPassword, email]
        );

        return result.rows[0];
    }

    /** Authenticate admin with username & password. Returns admin or throws error. */
    static async authenticate(username, password) {
        const result = await db.query(
            `SELECT id, username, password, email FROM admins WHERE username = $1`,
            [username]
        );

        const admin = result.rows[0];
        if (admin) {
            const isValid = await bcrypt.compare(password, admin.password);
            if (isValid) {
                delete admin.password;
                return admin;
            }
        }

        throw new Error("Invalid username/password");
    }

    /** Get all admins (for admin control panel etc.) */
    static async findAll() {
        const result = await db.query(
            `SELECT id, username, email FROM admins ORDER BY id`
        );
        return result.rows;
    }

    /** Delete admin */
    static async remove(id) {
        const result = await db.query(
            `DELETE FROM admins WHERE id = $1 RETURNING id`,
            [id]
        );

        if (!result.rows.length) throw new Error(`No admin with id: ${id}`);
    }
}

module.exports = Admin;
