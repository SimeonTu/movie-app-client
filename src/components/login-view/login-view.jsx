import { useState } from "react";
import { Button, Form, Card, CardGroup, Container, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setUser, setToken } from "../../redux/reducers/user";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const LoginView = () => {

    const dispatch = useDispatch();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const invalidToast = () => {
        toast.error("Invalid username or password.", {
            position: toast.POSITION.TOP_CENTER,
        });
    }

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
                    dispatch(setUser(data.user));
                    dispatch(setToken(data.token));
                    localStorage.setItem("user", JSON.stringify(data.user));
                    localStorage.setItem("token", data.token)

                    // console.log(userr, tokenn);
                } else {
                    invalidToast();
                    // alert("Invalid username or password.");
                }
            })
            .catch((e) => {
                console.log(e);
            });
    }

    return (
        <Container>

            <ToastContainer limit={3} />

            <Row>
                <Col>
                    <CardGroup>
                        <Card className="mt-5">
                            <Card.Body>
                                <Card.Title className="mb-3">Login</Card.Title>
                                <Form onSubmit={handleSubmit}>
                                    <Form.Group controlId="formUsernameLogin">
                                        <Form.Label className="m-0">
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
                                        <Form.Label className="mb-0 mt-2">
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
                                    <Button className="mt-3 mb-2" variant="primary" type="submit">Submit</Button>
                                </Form>
                            </Card.Body>
                        </Card>
                    </CardGroup>
                </Col>
            </Row>
        </Container>
    );
};
