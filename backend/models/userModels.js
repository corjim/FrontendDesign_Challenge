"use strict";

const db = require("../db.js");
const bcrypt = require("bcrypt");
const { sqlForPartialUpdate } = require("../helperFunctions/sql.js");
const { BCRYPT_WORK_FACTOR } = require("../config.js");
class User {

    /** Register user with data.
     *
     * Returns { firstName, lastName, email, state }
     *
     * Throws BadRequestError on duplicates.
     **/

    static async register(data) {
        const { username, password, firstName, lastName, email, state = "pending", isAdmin = "FALSE" } = data;

        console.log("DETAILS models:", data)

        const duplicateCheck = await db.query(
            `SELECT username
           FROM users
           WHERE email = $1`,
            [username],
        );

        if (duplicateCheck.rows[0]) {
            throw new Error(`Duplicate username: ${username}`);
        }

        const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);

        const result = await db.query(
            `INSERT INTO users
           (username,
            password,
            first_name,
            last_name,
            email,
            state,
            is_admin)
           VALUES ($1, $2, $3, $4, $5, $6, $7)
           RETURNING id, username, first_name AS "firstName", last_name AS "lastName", email, state, is_admin AS isAdmin`,
            [
                username,
                hashedPassword,
                firstName,
                lastName,
                email,
                state,
                isAdmin
            ],
        );
        const user = result.rows[0];
        return user;
    }


    /** Authenticate user with username & password. Returns admin or throws error. */
    static async authenticate(username, password) {
        const result = await db.query(
            `SELECT id, username, password, first_name, email, is_admin FROM users WHERE username = $1`,
            [username]
        );
        //console.log("Logging in User:", result.rows[0])


        const user = result.rows[0];
        if (user) {
            const isValid = await bcrypt.compare(password, user.password);
            if (isValid === true) {
                delete user.password;
                return user;
            }
        }

        throw new Error("Invalid username/password");
    }

    /** Find all users except the admins.
     * Purposely for admin use.
     * Returns [{ first_name, last_name, email, state}, ...]
     **/
    static async findAll() {
        const result = await db.query(
            `SELECT id,
                first_name AS "firstName",
                last_name AS "lastName",
                email,
                state AS "state"
         FROM users
         WHERE is_admin = false OR is_admin IS NULL
         ORDER BY id`
        );

        return result.rows;
    }

    /** Given an id, return data about user.
     * Throws an Error if user not found.
     **/
    static async get(id) {
        const userRes = await db.query(
            `SELECT id,
                  first_name AS "firstName",
                  last_name AS "lastName",
                  email,
                  state AS "state"
           FROM users
           WHERE id = $1`,
            [id],
        );

        const user = userRes.rows[0];

        if (!user) throw new Error(`No user: ${id}`);

        return user;
    }

    /** Update user data with `data`.
     *
     * Returns {firstName, lastName, email, state }
     */

    static async update(id, data) {

        const { setCols, values } = sqlForPartialUpdate(
            data,
            {
                username: "username",
                password: "password",
                firstName: "first_name",
                lastName: "last_name",
                state: "state",
            });
        const usernameVarIdx = "$" + (values.length + 1);

        const querySql = `UPDATE users 
                      SET ${setCols} 
                      WHERE id = ${usernameVarIdx} 
                      RETURNING id,
                                username,
                                first_name AS "firstName",
                                last_name AS "lastName",
                                email,
                                state AS "state"`;
        const result = await db.query(querySql, [...values, id]);
        const user = result.rows[0];

        if (!user) throw new Error(`No user with ID: ${id}`);

        //delete user.password;
        return user;
    }

    /** Delete given user from database; returns undefined. */

    static async remove(id) {
        let result = await db.query(
            `DELETE
           FROM users
           WHERE id = $1
           RETURNING id`,
            [id],
        );
        const user = result.rows[0];

        if (!user) throw new Error(`No user: ${id}`);
    }
}

module.exports = User;
