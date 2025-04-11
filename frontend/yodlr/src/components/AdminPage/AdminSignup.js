import React, { useState, useEffect } from "react";
import UserApi from "../../Api/UserApi";
import { useNavigate } from "react-router-dom";
import { Spinner, Card, Button, Form, Container, Alert } from "react-bootstrap";
import "../Auth/SignUp.css";

function AdminSignup() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(null)
    const [error, setError] = useState(null);

    const [formData, setFormData] = useState({
        username: "",
        password: "",
        firstName: "",
        lastName: "",
        email: ""
    });


    useEffect(() => {
        setLoading(false)
    }, [])

    // Handles form in put change
    function handleChange(evt) {
        const { name, value } = evt.target;
        setFormData(f => ({ ...f, [name]: value }));
    }

    // Function that handles user's registration.
    // Make API call to register user.
    async function addUser(evt) {
        evt.preventDefault();
        try {

            const data = await UserApi.signup(formData);
            navigate("/admin-dashboard") // Navigate to admin dashboard.

            console.log("Admin", data.user)

            return data // Return the registered admin user

        } catch (err) {
            console.error("Signup failed:", err);
            setError(err.message)
        };
    }

    if (loading) {
        return <Spinner animation="border" className="d-block mx-auto mt-5" />;
    }

    return (
        <Container className="d-flex justify-content-center align-items-center signup-container">
            <Card className="signup-card shadow">
                <div>{error && <Alert variant="danger">{error}</Alert>}</div>
                <Card.Body>
                    <h1 className="text-center mb-4">Yodlr Registration Portal</h1>

                    <Form onSubmit={addUser}>

                        <Form.Group className="mb-3">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                placeholder="Enter your username"
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Enter your password"
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                placeholder="Enter your first name"
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                placeholder="Enter your last name"
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter your email"
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-4">
                            <Form.Check
                                type="checkbox"
                                label="Register as Admin"
                                name="isAdmin"
                                checked={formData.isAdmin}
                                onChange={(e) =>
                                    setFormData((f) => ({ ...f, isAdmin: e.target.checked }))
                                }
                                required
                            />
                        </Form.Group>

                        <Button type="submit" variant="primary" className="w-100 signup-button">
                            Sign Up
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );

}

export default AdminSignup;
