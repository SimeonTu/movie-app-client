import React, { useState, useEffect } from 'react';
import { Button, Form, Card, CardGroup, Container, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom"
import bcrypt from 'bcryptjs'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./profile-view.scss";
import { clearProfile } from "../../redux/reducers/profile";
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../redux/reducers/user';


export const ChangeEmail = () => {

    const dispatch = useDispatch()

    // const [onBackClick, user] = useOutletContext();

    const user = useSelector(state => state.user.userObj)

    const [inpurPassword, setInputPassword] = useState("");
    const [updatedEmail, setUpdatedEmail] = useState("");
    const [newEmail, setNewEmail] = useState("");
    const [newEmailConfirm, setNewEmailConfirm] = useState("");

    const [oldPassError, setOldPassError] = useState("");
    const [wrongPassError, setWrongPassError] = useState("");
    const [invalidEmailError, setInvalidEmailError] = useState("");
    const [mismatchEmailError, setMismatchEmailError] = useState("");
    const [sameEmailError, setSameEmailError] = useState("");

    const [success, setSuccess] = useState("")
    const [errors, setErrors] = useState("");
    const [submitButton, setSubmitButton] = useState(false);

    useEffect(() => {

        console.log("current value of newEmail:", newEmail)
        console.log("current length of newEmail:", newEmail.length)
        console.log("current value of newEmailConfirm:", newEmailConfirm)
        console.log("current length of newEmailConfirm:", newEmailConfirm.length)
        console.log("newEmail regex match:", newEmail.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g));
        console.log("newEmailConfirm regex match:", newEmailConfirm.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g));
        console.log("current errors:", errors)
        console.log("breakpoint")

        checkPassword();
        checkEmail();

        // if (success) {
        //     console.log("success!!!");
        //     setSuccess(false)
        //     successToast();
        //     clearErrors()
        // }
        // if (wrongPassError) {
        //     console.log("old password error");
        //     wrongPassToast();
        //     clearErrors()
        // }
        // if (invalidEmailError) {
        //     console.log("invalid email error");
        //     invalidEmailToast()
        //     clearErrors()
        // }
        // if (mismatchEmailError) {
        //     console.log("new email error");
        //     mismatchEmailsToast();
        //     clearErrors()
        // }
        // if (sameEmailError) {
        //     console.log("same email error");
        //     sameEmailAsOldToast();
        //     clearErrors()
        // }

        if (inpurPassword
            && newEmail
            && newEmailConfirm
            && newEmailConfirm != updatedEmail
            && oldPassError == null
            && errors.newEmail == null
            && errors.newEmailConfirm == null
            && newEmail != updatedEmail) {
            setSubmitButton(true)
        } else {
            setSubmitButton(false)
        }

    }, [updatedEmail,
        inpurPassword,
        newEmail,
        newEmailConfirm,
        // success,
        // oldPassError,
        // wrongPassError,
        // invalidEmailError,
        // mismatchEmailError,
        // sameEmailError,
        errors.newEmail,
        errors.newEmailConfirm,
    ])

    function clearErrors() {
        setWrongPassError(false)
        setInvalidEmailError(false)
        setMismatchEmailError(false)
        setSameEmailError(false)
    }

    const successToast = () => {
        toast.success("You've successfully updated your email!", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3500
        });
    };

    const wrongPassToast = () => {
        toast.warn("You've entered a wrong password.", {
            position: toast.POSITION.TOP_CENTER,
        });
    };

    const invalidEmailToast = () => {
        toast.warn("Please use a valid email format.", {
            position: toast.POSITION.TOP_CENTER,
        });
    };

    const mismatchEmailsToast = () => {
        toast.warn("Please make sure that both emails match.", {
            position: toast.POSITION.TOP_CENTER
        });
    };

    const sameEmailAsOldToast = () => {
        toast.warn("New email can't be the same as your old email.", {
            position: toast.POSITION.TOP_CENTER
        });
    };

    const emailInUseToast = () => {
        toast.warn("This email is already in use. Please use a different email address.", {
            position: toast.POSITION.TOP_CENTER
        });
    };



    function checkPassword() {
        if (inpurPassword.length > 0 && inpurPassword.length < 6) {
            setOldPassError("Please enter a valid password")
            return
        }
        if (inpurPassword.length == 0 || inpurPassword.length >= 6) {
            setOldPassError(null)
            return
        }
    }

    function checkEmail() {


        // Check if newEmail is not equal to newEmailConfirm
        if (newEmail != newEmailConfirm && newEmailConfirm.length == 0 && newEmail.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g) == null) {
            console.log("mismatch in newEmailconfirm!");
            console.log("newEmail:", newEmail)
            console.log("newEmailConfrim", newEmailConfirm);
            setErrors({ ...errors, newEmail: "Please use a valid email format" })
            console.log("errors:", errors)
            return
        }

        if (newEmail != newEmailConfirm && newEmailConfirm.length == 0) {
            console.log("mismatch in newEmailconfirm!");
            console.log("newEmail:", newEmail)
            console.log("newEmailConfrim", newEmailConfirm);
            setErrors({ ...errors, newEmail: "Please make sure that both emails match" })
            console.log("errors:", errors)
            return
        }

        if (newEmail != newEmailConfirm && newEmail.length == 0 && newEmailConfirm.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g) == null) {
            console.log("mismatch in newEmailconfirm!");
            console.log("newEmail:", newEmail)
            console.log("newEmailConfrim", newEmailConfirm);
            setErrors({ ...errors, newEmailConfirm: "Please use a valid email format" })
            console.log("errors:", errors)
            return
        }

        if (newEmailConfirm != newEmail && newEmail.length == 0) {
            console.log("mismatch in newEmailconfirm!");
            console.log("newEmail:", newEmail)
            console.log("newEmailConfrim", newEmailConfirm);
            setErrors({ ...errors, newEmailConfirm: "Please make sure that both emails match" })
            console.log("errors:", errors)
            return
        }

        if (newEmailConfirm != newEmail && newEmail.length > 0 && newEmailConfirm.length > 0) {
            console.log("mismatch in newEmailconfirm!");
            console.log("newEmail:", newEmail)
            console.log("newEmailConfrim", newEmailConfirm);
            setErrors({ ...errors, newEmail: "Please make sure that both emails match", newEmailConfirm: "Please make sure that both emails match" })
            console.log("errors:", errors)
            return
        }

        // Check if newEmailConfirm is a valid email address
        if (newEmail.length > 0 && newEmailConfirm.length == 0 && newEmail.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g) == null) {
            setErrors({ ...errors, newEmail: "Please use a valid email format", newEmailConfirm: null })
            console.log("breakpoint 4");
            return
        }
        if (newEmailConfirm.length > 0 && newEmail.length == 0 && newEmailConfirm.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g) == null) {
            setErrors({ ...errors, newEmail: null, newEmailConfirm: "Please use a valid email format" })
            console.log("breakpoint 3");
            return
        }
        if (newEmail.length > 0 && newEmailConfirm.length > 0 && newEmail.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g) == null && newEmailConfirm.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g) == null) {
            setErrors({ ...errors, newEmail: "Please use a valid email format", newEmailConfirm: "Please use a valid email format" })
            console.log("breakpoint 2");
            return
        }

        // Check if everything is valid and both emails match
        if (newEmail.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g) != null && newEmail == newEmailConfirm) {
            console.log("matches regex")
            setErrors({ ...errors, newEmail: null, newEmailConfirm: null })
            // setErrors({ ...errors, newEmailConfirm: null })
            console.log("all fixed errors:", errors)
            return
        }
        if (newEmailConfirm.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g) != null && newEmail == newEmailConfirm) {
            console.log("matches regex")
            setErrors({ ...errors, newEmail: null, newEmailConfirm: null })
            // setErrors({ ...errors, newEmailConfirm: null })
            console.log("all fixed errors:", errors)
            return
        }

        if (newEmail.length == 0 && newEmailConfirm.length == 0) {
            setErrors({ ...errors, newEmail: null, newEmailConfirm: null })
            console.log("breakpoint 1");
            return

        }

        console.log("end breakpoint");
    }

    
    const handleSubmit = (event) => {

        event.preventDefault()

        async function updateEmail() {
            //heroku own CORS Anywhere server prefixed before API url
            let newEmailVar = await fetch(`https://fathomless-everglades-10625-ad628eacb5b5.herokuapp.com/https://ifdbase-c6a1086fce3e.herokuapp.com/users/${user.Username}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            })
                .then((response) => {
                    return response.json()
                })
                .then((data) => {
                    // Compare old/current password with hashed password in database
                    // and return newPassword if both newPassword fields match

                    if (bcrypt.compareSync(inpurPassword, data.Password) == false) {
                        console.log("Old password doesn't match")
                        // setWrongPassError(true)
                        wrongPassToast();
                        return
                    } else if (newEmail != newEmailConfirm) {
                        console.log("New emails don't match")
                        // setMismatchEmailError(true)
                        mismatchEmailsToast()
                        return
                    } else if (errors.newEmail == "Please use a valid email format" || errors.newEmailConfirm == "Please use a valid email format") {
                        // setInvalidEmailError(true)
                        invalidEmailToast()
                        return
                    } else if (data.Email == newEmail && data.Email == newEmailConfirm) {
                        console.log("New email can't be same as old")
                        // setSameEmailError(true)
                        sameEmailAsOldToast()
                        return
                    } else if (bcrypt.compareSync(inpurPassword, data.Password) == true
                        && errors.newEmail == null && errors.newEmailConfirm == null && oldPassError == null) {
                        console.log("success!");
                        setUpdatedEmail(newEmail)
                        return newEmail
                    }

                })

            if (newEmailVar) {
                fetch(`https://fathomless-everglades-10625-ad628eacb5b5.herokuapp.com/https://ifdbase-c6a1086fce3e.herokuapp.com/users/${user.Username}`, {
                    method: "PUT",
                    body: JSON.stringify({
                        Email: newEmailVar
                    }),
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                        "Content-Type": "application/json"
                    }
                }).then((response) => response.json())
                    .then((data) => {
                        if (data.error) {
                            if (data.error.codeName == "DuplicateKey") {
                                emailInUseToast()
                                return
                            }
                        }
                        console.log(data)
                        clearErrors()
                        dispatch(setUser(data))
                        successToast();
                    })
            }

        }

        updateEmail()

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
                                <Card.Title className='mb-3'>Change Email</Card.Title>


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
                                            value={inpurPassword}
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
                                    <Form.Group controlId='newEmail'>
                                        <Form.Label className='mb-0 mt-3'>
                                            New email
                                        </Form.Label>
                                        <Form.Control
                                            value={newEmail}
                                            onChange={(e) => {
                                                setNewEmail(e.target.value);
                                                // validateForm('newEmail', e);
                                            }}
                                            isInvalid={!!errors.newEmail}
                                            placeholder='Please enter your new email'
                                        />
                                        <Form.Control.Feedback type='invalid'>
                                            {errors.newEmail}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group controlId='newEmailConfirm'>
                                        <Form.Label className='mb-0 mt-3'>
                                            Confirm new email
                                        </Form.Label>
                                        <Form.Control
                                            value={newEmailConfirm}
                                            onChange={(e) => {
                                                setNewEmailConfirm(e.target.value);
                                                // validateForm('newEmailConfirm', e);
                                            }}
                                            isInvalid={!!errors.newEmailConfirm}
                                            placeholder='Please confirm your new email'
                                        />
                                        <Form.Control.Feedback type='invalid'>
                                            {errors.newEmailConfirm}
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