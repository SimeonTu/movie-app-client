import { useState, useEffect } from "react";
import { Button, Form, Card, CardGroup, Container, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const SignupView = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [birthday, setBirthday] = useState("");

    const navigate = useNavigate();

    const successToast = () => {
        toast.success(<p className="m-0">You've successfully created your account!<br />You'll be redirected to the login page shortly.</p>, {
            position: toast.POSITION.TOP_CENTER,
            style: { width: "400px" }
        });
    }

    const ageToast = () => {
        toast.warn(<p className="m-0">You must be over 13 to register an account.</p>, {
            position: toast.POSITION.TOP_CENTER
        });
    }

    const userExistsToast = () => {
        toast.warn(<p className="m-0"><center>Username already registered.<br />Please choose a different username.</center></p>, {
            position: toast.POSITION.TOP_CENTER
        });
    }

    const emailExistsToast = () => {
        toast.warn(<p className="m-0">Email already registered.<br />Please choose a different email.</p>, {
            position: toast.POSITION.TOP_CENTER
        });
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        // Calculate user age
        let today = new Date();
        let birthDate = new Date(birthday);
        let age = today.getFullYear() - birthDate.getFullYear();
        let month = today.getMonth() - birthDate.getMonth();
        if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }

        // User is not old enough to register
        if (age < 13) {
            ageToast();
            return;
        }


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
        }).then((response) => response.json())
            .then(data => {
                console.log(data);
                if (data.error) {
                    if (data.error.includes("User")) {
                        userExistsToast()
                    } else if (data.error.includes("Email")) {
                        emailExistsToast()
                    }
                } else {
                    successToast()
                    setTimeout(() => {
                        navigate("/login")
                    }, 4000)
                }
            });
    };

    return (
        <Container>

            <ToastContainer />

            <Row>
                <Col>
                    <CardGroup>
                        <Card className="mt-5">
                            <Card.Body>
                                <Card.Title className="mb-3">Register</Card.Title>
                                <Form onSubmit={handleSubmit}>
                                    <Form.Group controlId="formUsernameRegister">
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
                                        <Form.Control
                                            type="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                            // pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$" USE THIS FORMAT LATAER
                                            minLength={6}
                                            placeholder="Enter your password"
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="formEmail">
                                        <Form.Label className="mb-0 mt-2">
                                            Email:
                                        </Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                            pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
                                            placeholder="Enter your email address"
                                            title="Invalid email address"
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="formBirthday">
                                        <Form.Label className="mb-0 mt-2">
                                            Birthday:
                                        </Form.Label>
                                        <Form.Control className="mb-2"
                                            type="date"
                                            value={birthday}
                                            max={new Date().toISOString().split('T', 1)[0]}
                                            onClick={(e) => e.currentTarget.showPicker()}
                                            onChange={(e) => setBirthday(e.target.value)}
                                            required
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
    )
}