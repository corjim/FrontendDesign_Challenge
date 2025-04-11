import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Spinner, Card, Button, Form, Container, Alert } from "react-bootstrap";
import User from "../../Api/UserApi";
import "./LoginForm.css"

function LoginForm({ setCurrAdmin }) {
    const INITIAL_STATE = { username: "", password: "" };
    const [formData, setFormData] = useState(INITIAL_STATE);

    // const [admin, setAdmin] = useState(null)
    const [loading, setLoading] = useState(null)
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);

    const navigate = useNavigate();

    function handleChange(evt) {
        const { name, value } = evt.target;
        setFormData(f => ({ ...f, [name]: value }));
    }

    async function handleSubmit(evt) {
        evt.preventDefault();

        setLoading(true);
        setError(null);
        setMessage(null);

        try {
            const user = await User.login(formData.username, formData.password);

            if (!user.user.is_admin) {
                setError("Only admins are allowed to log in.");
                localStorage.removeItem("currentAdmin");
                return;
            }

            // Set admin and store in local storage
            setCurrAdmin(user);
            localStorage.setItem("currentAdmin", JSON.stringify(user));

            setMessage(`Welcome back ${user.username || user.username}!`);

            // Navigate immediately to dashboard
            navigate("/admin-dashboard");

        } catch (err) {
            console.error("Login Failed", err);
            setError("Invalid username or password. Please try again.");
        } finally {
            setLoading(false);
        }
    }


    if (loading) {
        return <Spinner animation="border" className="d-block mx-auto mt-5" />;
    }

    return (
        <Container className="d-flex justify-content-center align-items-center login-container">
            <Card className="login-card shadow">
                <div>
                    {message && <Alert variant="success">{message}</Alert>}
                    {error && <Alert variant="danger">{error}</Alert>}
                </div>
                <Card.Body>
                    <h2 className="text-center mb-4">Welcome Back</h2>
                    <p className="text-muted text-center">Sign in to access your account</p>
                    <Form onSubmit={handleSubmit}>
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

                        <Button type="submit" variant="primary" className="w-100 login-button">
                            Login
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default LoginForm;
