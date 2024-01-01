import { useState } from "react";
import { Button, Form, Card, CardGroup, Container, Col, Row } from "react-bootstrap";

const SignupView = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [birthday, setBirthday] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();

        const data = {
            Username: username,
            Password: password,
            Email: email,
            Birthday: birthday
        };

        fetch("https://ifdbase-c6a1086fce3e.herokuapp.com/users", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        }).then((response) => {
            if (response.ok) {
                alert("Signup successful");
                window.location.reload();
            } else {
                alert("Signup failed");
            }
        });
    };

    return (
        <Container>
            <Row>
                <Col>
                    <CardGroup>
                        <Card>
                            <Card.Body>
                                <Card.Title>Register</Card.Title>
                                <Form onSubmit={handleSubmit}>
                                    <Form.Group controlId="formUsernameRegister">
                                        <Form.Label>
                                            Username:
                                        </Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                            required
                                            minLength="3"
                                            placeholder="Enter your username"
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="formPassword">
                                        <Form.Label>
                                            Password:
                                        </Form.Label>
                                        <Form.Group
                                            type="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                            pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$"
                                            placeholder="Enter your password"
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="formEmail">
                                        <Form.Label>
                                            Email:
                                        </Form.Label>
                                        <Form.Control
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                            placeholder="Enter your email address"
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="formBirthday">
                                        <Form.Label>
                                            Birthday:
                                        </Form.Label>
                                        <Form.Control className="mb-2"
                                            type="date"
                                            value={birthday}
                                            onChange={(e) => setBirthday(e.target.value)}
                                            required
                                        />
                                    </Form.Group>
                                    <Button className="mb-2" variant="primary" type="submit">Submit</Button>
                                </Form>
                            </Card.Body>
                        </Card>
                    </CardGroup>
                </Col>
            </Row>
        </Container>
    )
}

export default SignupView;