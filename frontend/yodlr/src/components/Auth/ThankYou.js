// components/Auth/ThankYou.js

import React from "react";
import { Container, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function ThankYou() {
    //const navigate = useNavigate()

    return (
        <Container className="d-flex justify-content-center align-items-center signup-container">
            <Card className="signup-card shadow p-4 text-center">
                <h1 className="mb-4">🎉 Thank You for Registering!</h1>
                <p className="lead">We’re excited to have you on board.</p>
                <h5>You can now exit the page</h5>
                <Link to="/">
                    <Button variant="info" size="lg" className="hero-btn">
                        Home Page
                    </Button>
                </Link>
            </Card>
        </Container>
    );
}

export default ThankYou;
