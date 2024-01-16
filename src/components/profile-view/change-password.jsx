import React, { useState, useEffect } from 'react';
import { Button, Form, Card, CardGroup, Container, Col, Row } from "react-bootstrap";
import { Link, useOutletContext } from "react-router-dom"
import bcrypt from 'bcryptjs'
import InfoCard from './info-card';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./profile-view.scss";
import { clearProfile } from "../../redux/reducers/profile";
import { useDispatch } from 'react-redux';


export default ChangePassword = () => {

    const dispatch = useDispatch()

    const [onBackClick, onLoggedOut, user] = useOutletContext();

    const [inputPassword, setInputPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [newPasswordConfirm, setNewPassConfirm] = useState("");

    const [oldPassError, setOldPassError] = useState("");
    const [wrongPassError, setWrongPassError] = useState("");
    const [mismatchPassError, setMismatchPassError] = useState("");
    const [samePassError, setSamePassError] = useState("");

    const [success, setSuccess] = useState("")
    const [submitButton, setSubmitButton] = useState(true);
    const [errors, setErrors] = useState("");

    useEffect(() => {

        console.log("current value of newEmail:", newPassword)
        console.log("current length of newEmail:", newPassword.length)
        console.log("current value of newEmailConfirm:", newPasswordConfirm)
        console.log("current length of newEmailConfirm:", newPasswordConfirm.length)
        console.log("newEmail regex match:", newPassword.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g));
        console.log("newEmailConfirm regex match:", newPasswordConfirm.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g));
        console.log("current errors:", errors)
        console.log("breakpoint")

        checkPassword();
        checkNewPass();

        if (success) {
            console.log("success!!!");
            setSuccess(false)
            successToast();
            clearErrors()
        }
        if (wrongPassError) {
            console.log("old password error");
            wrongPassToast();
            clearErrors()
        }
        if (mismatchPassError) {
            console.log("mismatch pass error");
            mismatchPasswordsToast();
            clearErrors()
        }
        if (samePassError) {
            console.log("same pass error");
            samePassAsOldToast();
            clearErrors()
        }

        // if (inputPassword
        //     && newPassword
        //     && newPasswordConfirm
        //     && oldPassError == null
        //     && errors.newPass == null
        //     && errors.newPassConfirm == null) {
        //     setSubmitButton(true)
        // } else {
        //     console.log("errors within useEffect():", errors);
        //     setSubmitButton(false)
        // }

    }, [inputPassword, newPassword, newPasswordConfirm, success, oldPassError, wrongPassError, mismatchPassError, samePassError, errors.newPass, errors.newPassConfirm])

    function clearErrors() {
        setWrongPassError(false)
        setMismatchPassError(false)
        setSamePassError(false)
    }

    const successToast = () => {
        toast.success(<p>You've successfully updated your password!<br />
            You'll be logged out shortly...</p>, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3500
        });
    };

    const wrongPassToast = () => {
        toast.warn("You've entered a wrong password.", {
            position: toast.POSITION.TOP_CENTER,
        });
    };

    const mismatchPasswordsToast = () => {
        toast.warn("Please make sure that both passwords match.", {
            position: toast.POSITION.TOP_CENTER
        });
    };

    const samePassAsOldToast = () => {
        toast.warn("New password can't be the same as your old password.", {
            position: toast.POSITION.TOP_CENTER
        });
    };

    function checkPassword() {
        if (inputPassword.length > 0 && inputPassword.length < 6) {
            setOldPassError("Please enter a valid password")
            return
        }
        if (inputPassword.length == 0 || inputPassword.length >= 6) {
            setOldPassError(null)
            return
        }
    }

    function checkNewPass() {

        if (newPassword != newPasswordConfirm && newPasswordConfirm.length == 0 && newPassword.length < 6) {
            setErrors({ ...errors, newPass: "Please use a valid password" })
            console.log("errors:", errors)
            return
        }

        if (newPassword != newPasswordConfirm && newPasswordConfirm.length == 0) {
            setErrors({ ...errors, newPass: "Please make sure that both passwords match" })
            console.log("errors:", errors)
            return
        }

        if (newPassword != newPasswordConfirm && newPassword.length == 0 && newPasswordConfirm.length < 6) {
            setErrors({ ...errors, newPassConfirm: "Please use a valid password" })
            console.log("errors:", errors)
            return
        }

        if (newPasswordConfirm != newPassword && newPassword.length == 0) {
            setErrors({ ...errors, newPassConfirm: "Please make sure that both passwords match" })
            console.log("errors:", errors)
            return
        }

        if (newPasswordConfirm != newPassword && newPassword.length > 0 && newPasswordConfirm.length > 0) {
            setErrors({ ...errors, newPass: "Please make sure that both passwords match", newPassConfirm: "Please make sure that both passwords match" })
            console.log("errors:", errors)
            return
        }

        // Check if newEmailConfirm is a valid email address
        if (newPassword.length > 0 && newPasswordConfirm.length == 0 && newPassword.length < 6) {
            setErrors({ ...errors, newPass: "Please use a valid password", newPassConfirm: null })
            console.log("breakpoint 4");
            return
        }
        if (newPasswordConfirm.length > 0 && newPassword.length == 0 && newPasswordConfirm.length < 6) {
            setErrors({ ...errors, newPass: null, newPassConfirm: "Please use a valid password" })
            console.log("breakpoint 3");
            return
        }
        if (newPassword.length > 0 && newPasswordConfirm.length > 0 && newPassword.length < 6 && newPasswordConfirm.length < 6) {
            setErrors({ ...errors, newPass: "Please use a valid password", newPassConfirm: "Please use a valid password" })
            console.log("breakpoint 2");
            return
        }

        // Check if everything is valid and both emails match
        if (newPassword.length > 0 && newPassword == newPasswordConfirm) {
            setErrors({ ...errors, newPass: null, newPassConfirm: null })
            console.log("all fixed errors:", errors)
            return
        }
        if (newPasswordConfirm.length > 0 && newPassword == newPasswordConfirm) {
            setErrors({ ...errors, newPass: null, newPassConfirm: null })
            // setErrors({ ...errors, newEmailConfirm: null })
            console.log("all fixed errors:", errors)
            return
        }

        if (newPassword.length == 0 && newPasswordConfirm.length == 0) {
            setErrors({ ...errors, newPass: null, newPassConfirm: null })
            console.log("breakpoint 1");
            return

        }

        console.log("end breakpoint");
    }

    const handleSubmit = (event) => {

        event.preventDefault()

        async function fetchData() {
            //heroku own CORS Anywhere server prefixed before API url
            let newPass = await fetch(`https://fathomless-everglades-10625-ad628eacb5b5.herokuapp.com/https://ifdbase-c6a1086fce3e.herokuapp.com/users/${user.Username}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            })
                .then((response) => {
                    return response.json()
                })
                .then((data) => {
                    // Compare old/current password with hashed password in database
                    // and return newPassword if both newPassword fields match

                    if (bcrypt.compareSync(inputPassword, data.Password) == false) {
                        setWrongPassError(true)
                    } else if (newPassword != newPasswordConfirm) {
                        setMismatchPassError(true)
                    } else if (inputPassword == newPassword) {
                        setSamePassError(true)
                    } else if (bcrypt.compareSync(inputPassword, data.Password) == true
                        && newPassword == newPasswordConfirm) {
                        console.log("success!");
                        return newPassword
                    }

                })

            if (newPass) {
                fetch(`https://fathomless-everglades-10625-ad628eacb5b5.herokuapp.com/https://ifdbase-c6a1086fce3e.herokuapp.com/users/${user.Username}`, {
                    method: "PUT",
                    body: JSON.stringify({
                        Password: newPass
                    }),
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                        "Content-Type": "application/json"
                    }
                }).then((response) => response.json())
                    .then((data) => {
                        console.log(data)
                        clearErrors()
                        setSuccess(true)
                        setTimeout(onLoggedOut, 3000)
                    })
            }

        }

        fetchData()

    }

    return (
        <Container>

            <ToastContainer
                limit={3}
            />

            <Row>
                <Col>
                    <CardGroup>
                        <Card>
                            <Card.Body>
                                <Card.Title className='mb-3'>Change Password</Card.Title>

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
                                            value={inputPassword}
                                            onChange={(e) => {
                                                setInputPassword(e.target.value);
                                                // validateForm('currentPass', e);
                                            }}
                                            isInvalid={!!oldPassError}
                                            placeholder='Please enter your old password'
                                        />
                                        <Form.Control.Feedback type='invalid'>
                                            {oldPassError}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group controlId='newPassword'>
                                        <Form.Label className='mb-0 mt-3'>
                                            New password
                                        </Form.Label>
                                        <Form.Control
                                            value={newPassword}
                                            onChange={(e) => {
                                                setNewPassword(e.target.value);
                                                // validateForm('newEmail', e);
                                            }}
                                            isInvalid={!!errors.newPass}
                                            placeholder='Please enter your new password'
                                        />
                                        <Form.Control.Feedback type='invalid'>
                                            {errors.newPass}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group controlId='newPasswordConfirm'>
                                        <Form.Label className='mb-0 mt-3'>
                                            Confirm new password
                                        </Form.Label>
                                        <Form.Control
                                            value={newPasswordConfirm}
                                            onChange={(e) => {
                                                setNewPassConfirm(e.target.value);
                                            }}
                                            isInvalid={!!errors.newPassConfirm}
                                            placeholder='Please confirm your new password'
                                        />
                                        <Form.Control.Feedback type='invalid'>
                                            {errors.newPassConfirm}
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