import axios from "axios";
import { use } from "react";
const API_BASE_URL = "http://localhost:5050";

class UserApi {

    static async request(endpoint, data = {}, method = "get") {

        console.debug("API Call:", "endpoint:", endpoint, "data", data, "method", method);
        const url = `${API_BASE_URL}/${endpoint}`;

        console.log("Sending request to", url, "with", data);

        const params = method === "get" ? data : {};

        try {
            const res = await axios({ url, method, data, params });

            if (res.status === 204) return { message: "Deleted" };

            if (!res || !res.data) {
                throw new Error("Response is undefined or missing data property.");
            }

            return res.data;

        } catch (err) {
            console.error("API Error:", err.response ? err.response.data : err.message);
            let message = err.response?.data?.message || err.message || "Unknown error";
            throw Array.isArray(message) ? message : [message];
        }
    }

    static async signup(userData) {

        console.log("this is userdata", userData)
        try {
            let res = await this.request("users", userData, "post");

            if (!res) {
                throw new Error("API did not return a response.");
            }
            console.log("THIS IS RES", res)

            return res;

        } catch (error) {
            console.error("Error during signup:", error);
            throw error;
        }
    }

    static async login(username, password) {
        try {
            let res = await this.request("users/login", { username, password }, "post")

            if (!res) {
                throw new Error("Invalid response: Wrong credentials")
            }

            return res;

        } catch (err) {
            console.error("Login failed", err);
            throw err;
        }

    }

    // Get all the users
    static async getUsers() {
        try {
            let res = await this.request("users");
            return res.users;
        } catch (error) {
            console.error("Error getting users:", error);
            throw error;
        }
    };

    /** Get a user */
    static async getUser(id) {

        if (!id) {
            console.error("Username is undefined. Ensure it is being passed correctly.");
            return null;
        }

        try {
            const res = await this.request(`users/${id}`);
            return res;

        } catch (err) {
            console.error("Error fetching user:", err);
            return null;
        }
    }

    static async editProfile(userData, id) {
        console.log("USERDATA:", userData, id);

        try {
            // Make the API request to update user data
            let res = await this.request(`users/edit/${id}`, userData, "patch");

            return res.user;

        } catch (error) {
            console.error("Error editing profile:", error);
            throw error;
        }
    };

    static async deleteUser(id) {
        console.log("DELETING USER WITH ID:", id);

        if (!id) {
            console.error("Username is undefined. Ensure it is being passed correctly.");
            return null;
        }

        try {
            const res = await this.request(`users/delete/${id}`, {}, "delete");

            console.log("DELETED RES:", res);

            return res;

        } catch (err) {
            console.error("Error deleting user:", err);
            throw err;
        }
    }

}
export default UserApi;