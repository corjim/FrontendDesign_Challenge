import React from "react";
import { Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./HomePage.css";

function HomePage() {
    return (
        <div className="homepage">

            {/* Hero Section */}
            <div className="hero">
                <Container className="text-center">
                    <h1 className="hero-title">This is Yodlr Design Challenge</h1>
                    <p className="hero-subtitle">Please sign up as a user or as an admin</p>

                    <Link to="/signup">
                        <Button variant="info" size="lg" className="hero-btn">
                            User Registration
                        </Button>
                    </Link>

                    <Link to="/admin">
                        <Button variant="info" size="lg" className="hero-btn">
                            Admin register here
                        </Button>
                    </Link>
                </Container>
            </div>
        </div>
    );
}

export default HomePage;
