import React, { useState, useEffect } from 'react';
import { Button, Form, Card, CardGroup, Container, Col, Row } from "react-bootstrap";
import { Link, useOutletContext } from "react-router-dom"
import bcrypt from 'bcryptjs'
import InfoCard from './info-card';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./profile-view.scss";
import { clearProfile } from "../../redux/reducers/profile";
import { useDispatch, useSelector } from 'react-redux';
import { setUser, setToken } from '../../redux/reducers/user';

const clearProf = clearProfile;

export default ChangeUsername = () => {

    const dispatch = useDispatch()

    // const [onBackClick, onLoggedOut, user] = useOutletContext();

    const user = useSelector(state => state.user.userObj)

    const [currentPassword, setCurrentPassword] = useState("");
    const [newUsername, setNewUsername] = useState("");

    const [currentPassError, setCurrentPassError] = useState("");

    const [success, setSuccess] = useState("")
    const [warn, setWarn] = useState("")
    const [submitButton, setSubmitButton] = useState(false);

    const [passError, setPassError] = useState("");
    const [usernameError, setUsernameError] = useState("");

    const successToast = () => {

        toast.success(<p>You've successfully updated your username!<br />
            You'll be logged out shortly.</p>, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3500
        });

    };


    const wrongPassToast = () => {

        toast.warn("You've entered a wrong password.", {
            position: toast.POSITION.TOP_CENTER
        });

    };

    function checkPassword(value) {
        if (value.length > 0 && value.length < 6) {
            setPassError("Password mumst be at least 6 characters long")
            return
        }
        if (value.length == 0 || value.length >= 6) {
            setPassError(null)
            return
        }
    }

    function checkUsername(value) {
        if (value.length > 0 && value.length < 3) {
            setUsernameError("Username must be at least 3 characters long")
            return
        }
        if (value == user.Username) {
            setUsernameError("Please choose a different username than your current one")
            return
        }
        if (value.length == 0 || value.length >= 3) {
            setUsernameError(null)
            return
        }
    }

    // Function to log the user out after changing password
    const onLoggedOut = () => {
        dispatch(setUser(null));
        dispatch(setToken(null));
        localStorage.clear()
    }

    // Handle form submit
    const handleSubmit = (event) => {

        event.preventDefault()

        async function fetchData() {
            //heroku own CORS Anywhere server prefixed before API url
            let newUsernameVar = await fetch(`https://fathomless-everglades-10625-ad628eacb5b5.herokuapp.com/https://ifdbase-c6a1086fce3e.herokuapp.com/users/${user.Username}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            })
                .then((response) => {
                    return response.json()
                })
                .then((data) => {
                    // Compare old/current password with hashed password in database
                    // and return newPassword if both newPassword fields match

                    if (bcrypt.compareSync(currentPassword, data.Password) == false) {
                        console.log("Old password doesn't match")
                        wrongPassToast()
                    } else if (bcrypt.compareSync(currentPassword, data.Password) == true) {
                        console.log("success!");
                        return newUsername
                    }

                })

            if (newUsernameVar) {
                fetch(`https://fathomless-everglades-10625-ad628eacb5b5.herokuapp.com/https://ifdbase-c6a1086fce3e.herokuapp.com/users/${user.Username}`, {
                    method: "PUT",
                    body: JSON.stringify({
                        Username: newUsernameVar
                    }),
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                        "Content-Type": "application/json"
                    }
                }).then((response) => response.json())
                    .then((data) => {
                        console.log(data)
                        // setCurrentPassError(false)
                        // setSuccess(true)
                        successToast()
                        setTimeout(() => {
                            onLoggedOut()
                            dispatch(clearProfile())
                        }, 4000)
                    })
            }

        }

        fetchData()

    }

    useEffect(() => {

        if (currentPassword && newUsername && !usernameError && !passError && user.Username != newUsername) {
            console.log("current pass:", currentPassword);
            console.log("new username:", newUsername);
            console.log("user.Username:", user.Username);
            console.log("username err:", usernameError);

            setSubmitButton(true)
        } else {
            setSubmitButton(false)
        }

        // if (success) {
        //     console.log("success!!");
        //     successToast()
        // }

        // if (warn) {
        //     console.log("warn!!");
        //     wrongPassToast()
        // }

    }, [currentPassword, newUsername])

    return (
        <Container>

            <ToastContainer />

            <Row>
                <Col>
                    <CardGroup>
                        <Card>
                            <Card.Body>
                                <Card.Title className='mb-3'>Change Username</Card.Title>

                                <Form onSubmit={handleSubmit}>

                                    <Form.Group>
                                        <Form.Label className='mb-0'>
                                            Username
                                        </Form.Label>
                                        <Form.Control
                                            className='mb-3'
                                            id='disabledUsername'
                                            placeholder={user.Username}
                                            disabled
                                        />
                                    </Form.Group>

                                    <Form.Group controlId='currentPassword'>
                                        <Form.Label className='mb-0'>
                                            Password
                                        </Form.Label>
                                        <Form.Control
                                            value={currentPassword}
                                            onChange={(e) => {
                                                checkPassword(e.target.value)
                                                setCurrentPassword(e.target.value)
                                            }}
                                            isInvalid={!!passError}
                                            placeholder='Please enter your old password'
                                        />
                                        <Form.Control.Feedback type='invalid'>
                                            {passError}
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group controlId='newUsername'>
                                        <Form.Label className='mb-0 mt-3'>
                                            New Username
                                        </Form.Label>
                                        <Form.Control
                                            value={newUsername}
                                            onChange={(e) => {
                                                checkUsername(e.target.value)
                                                setNewUsername(e.target.value)
                                            }}
                                            isInvalid={!!usernameError}
                                            placeholder='Please enter your new username'
                                        />
                                        <Form.Control.Feedback type='invalid'>
                                            {usernameError}
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    {!submitButton ? (
                                        <Button
                                            className='ms-2 me-3 mt-4'
                                            variant='primary'
                                            type='submit'
                                            disabled
                                        >Submit
                                        </Button>
                                    ) : submitButton ? (
                                        <Button
                                            className='ms-2 me-3 mt-4'
                                            variant='primary'
                                            type='submit'
                                        >Submit
                                        </Button>
                                    ) : (
                                        <div></div>
                                    )}
                                    <Link to="/profile">
                                        <Button
                                            className='mt-4'
                                            variant='secondary'
                                            onClick={() => dispatch(clearProfile())}>
                                            Back
                                        </Button>
                                    </Link>
                                </Form>
                            </Card.Body>
                        </Card>
                    </CardGroup>
                </Col>
            </Row>
        </Container >
    )


}