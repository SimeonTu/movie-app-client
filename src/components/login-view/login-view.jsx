import { useState } from "react";
import { Button, Form, Card, CardGroup, Container, Col, Row } from "react-bootstrap";

const LoginView = ({ onLoggedIn }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (event) => {
        // this prevents the default behavior of the form which is to reload the entire page
        event.preventDefault();

        const data = {
            username: username,
            password: password,
        };

        fetch("https://fathomless-everglades-10625-ad628eacb5b5.herokuapp.com/https://ifdbase-c6a1086fce3e.herokuapp.com/login", { //heroku own CORS Anywhere server prefixed before API url
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                console.log("Login response: ", data);
                if (data.user) {
                    localStorage.setItem("user", JSON.stringify(data.user));
                    localStorage.setItem("token", data.token)
                    onLoggedIn(data.user, data.token);
                } else {
                    alert("No such user");
                }
            })
            .catch((e) => {
                alert(e);
            });
    }

    return (
        <Container>
            <Row>
                <Col>
                    <CardGroup>
                        <Card>
                            <Card.Body>
                                <Card.Title>Login</Card.Title>
                                <Form onSubmit={handleSubmit}>
                                    <Form.Group controlId="formUsernameLogin">
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
                                        <Form.Control className="mb-2"
                                            type="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                            placeholder="Enter your password"
                                        />
                                    </Form.Group>
                                    <Button variant="primary" type="submit">Submit</Button>
                                </Form>
                            </Card.Body>
                        </Card>
                    </CardGroup>
                </Col>
            </Row>
        </Container>
    );
};

export default LoginView;
