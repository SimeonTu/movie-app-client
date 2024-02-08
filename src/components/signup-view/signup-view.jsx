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
    const emailRegex = /^[a-zA-Z0-9!#\\&$%'*+=?^`{}|~_-](\.?[a-zA-Z0-9\\!#$&%'*+=?^`{}|~_-]){0,}@[a-zA-Z0-9]+\.(?!-)([a-zA-Z0-9]?((-?[a-zA-Z0-9]+)+\.(?!-))){0,}[a-zA-Z0-9]{2,8}$/g

    const [errors, setErrors] = useState("");
    const [invalidEmailError, setInvalidEmailError] = useState("");

    useEffect(() => {

        console.log(email, email.match(emailRegex));

        if (email && email.match(emailRegex) === null) {
            console.log(errors);
            setErrors({ ...errors, email: "Please enter a valid email" })
        } else {
            setErrors({ ...errors, email: null })
        }

    }, [email, errors.email])

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
        toast.warn(<p className="m-0">Username already registered.<br />Please choose a different username.</p>, {
            position: toast.POSITION.TOP_CENTER
        });
    }

    const emailExistsToast = () => {
        toast.warn(<p className="m-0">Email already registered.<br />Please choose a different email.</p>, {
            position: toast.POSITION.TOP_CENTER
        });
    }

    const invalidEmailToast = () => {
        toast.warn(<p className="m-0">Please enter a valid email address.</p>, {
            position: toast.POSITION.TOP_CENTER
        });
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        // User has entered an invalid email
        if (!!errors.email) {
            invalidEmailToast();
            return
        }

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
                                            isInvalid={!!errors.email}
                                            required
                                            // pattern="^\[a\-zA\-Z0\-9!#\\&$%'*+=?^`\{\}|~_\-]\(\.?\[a\-zA\-Z0\-9\\!#$&%'*+=?^`\{\}|~_\-]\)\{0,\}@\[a\-zA\-Z0\-9]+\.\(?!\-\)\(\[a\-zA\-Z0\-9]?\(\(\-?\[a\-zA\-Z0\-9]+\)+\.\(?!\-\)\)\)\{0,\}\[a\-zA\-Z0\-9]\{2,8\}$"
                                            placeholder="Enter your email address"
                                            title="Invalid email address"
                                        />
                                        <Form.Control.Feedback type='invalid'>
                                            {errors.email}
                                        </Form.Control.Feedback>
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