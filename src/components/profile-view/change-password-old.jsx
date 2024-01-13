import React, { useState, useEffect } from 'react';
import { Button, Form, Card, CardGroup, Container, Col, Row } from "react-bootstrap";
import { useOutletContext } from "react-router-dom"
import bcrypt from 'bcryptjs'
import InfoCard from './info-card';


export default ChangePassword = () => {

    const [onBackClick, onLoggedOut, user] = useOutletContext();

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [newPasswordConfirm, setNewPasswordConfirm] = useState("");
    const [currentPassError, setCurrentPassError] = useState("");
    const [newPassError, setNewPassError] = useState("");
    const [samePassError, setSamePassError] = useState("");
    const [success, setSuccess] = useState("")
    const [submitButton, setSubmitButton] = useState(false);
    const username = user.Username

    useEffect(() => {

        if (currentPassword && newPassword && newPasswordConfirm) {
            setSubmitButton(true)
        } else {
            setSubmitButton(false)
        }

    }, [currentPassword, newPassword, newPasswordConfirm])


    const handleSubmit = (event) => {
        event.preventDefault();

        async function fetchData() {
            //heroku own CORS Anywhere server prefixed before API url
            let newPass = await fetch(`https://fathomless-everglades-10625-ad628eacb5b5.herokuapp.com/https://ifdbase-c6a1086fce3e.herokuapp.com/users/${username}`, {
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
                        setCurrentPassError(true)
                    } else if (newPassword != newPasswordConfirm) {
                        console.log("New passwords don't match")
                        setCurrentPassError(false)
                        setNewPassError(true)
                    } else if (currentPassword == newPassword) {
                        console.log("New password can't be same as old")
                        setCurrentPassError(false)
                        setNewPassError(false)
                        setSamePassError(true)
                    } else if (bcrypt.compareSync(currentPassword, data.Password) == true
                        && newPassword == newPasswordConfirm) {
                        console.log("success!");
                        return newPassword
                    }

                })

            if (newPass) {
                fetch(`https://fathomless-everglades-10625-ad628eacb5b5.herokuapp.com/https://ifdbase-c6a1086fce3e.herokuapp.com/users/${username}`, {
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
                        setCurrentPassError(false)
                        setNewPassError(false)
                        setSamePassError(false)
                        setSuccess(true)
                        setInterval(onLoggedOut, 3000)
                    })
            }

        }

        fetchData()

    }

    return (
        <Container>
            <Row>
                <Col>
                    <CardGroup>
                        <Card>
                            <Card.Body>
                                <Card.Title className='mb-3'>Change password</Card.Title>

                                {currentPassError ? (
                                    <InfoCard
                                        bgColor={'rgb(220, 53, 69)'}
                                        headerText={'There was a problem'}
                                        bodyText={"You've entered an incorrect password."}>
                                    </InfoCard>
                                ) : newPassError ? (
                                    <InfoCard
                                        bgColor={'rgb(220, 53, 69)'}
                                        headerText={'There was a problem'}
                                        bodyText={"New passwords don't match."}>
                                    </InfoCard>
                                ) : samePassError ? (
                                    <InfoCard
                                        bgColor={'rgb(220, 53, 69)'}
                                        headerText={'There was a problem'}
                                        bodyText={"New password can't be the same as old password."}>
                                    </InfoCard>
                                ) : success ? (
                                    <InfoCard
                                        bgColor={'SeaGreen'}
                                        headerText={'Success'}
                                        bodyText={"You've successfully updated your password! You'll be logged out shortly."}>
                                    </InfoCard>
                                ) : (
                                    <div></div>
                                )}


                                <Form onSubmit={handleSubmit}>
                                    <Form.Group>
                                        <Form.Label className='mb-0'>
                                            Username
                                        </Form.Label>
                                        <Form.Control
                                            className='mb-3'
                                            id='disabledUsername'
                                            placeholder={username}
                                            disabled
                                        />
                                        <Form.Label className='mb-0'>
                                            Old password
                                        </Form.Label>
                                        <Form.Control
                                            className='mb-3'
                                            id='oldPassword'
                                            value={currentPassword}
                                            onChange={(e) => setCurrentPassword(e.target.value)}
                                            placeholder='Please enter your old password'
                                        />
                                        <Form.Label className='mb-0'>
                                            New password
                                        </Form.Label>
                                        <Form.Control
                                            className='mb-3'
                                            id='newPassword'
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                            placeholder='Please enter your new password'
                                        />
                                        <Form.Label className='mb-0'>
                                            Confirm new password
                                        </Form.Label>
                                        <Form.Control
                                            className='mb-4'
                                            id='newPasswordConfirm'
                                            value={newPasswordConfirm}
                                            onChange={(e) => setNewPasswordConfirm(e.target.value)}
                                            placeholder='Please confirm your new password'
                                        />
                                        {!submitButton ? (
                                            <Button
                                                className='ms-2 me-3'
                                                variant='primary'
                                                type='submit'
                                                disabled
                                            >Submit
                                            </Button>
                                        ) : submitButton ? (
                                            <Button
                                                className='ms-2 me-3'
                                                variant='primary'
                                                type='submit'
                                            >Submit
                                            </Button>
                                        ) : (
                                            <div></div>
                                        )}
                                        <Button
                                            variant='secondary'
                                            onClick={onBackClick}>Back</Button>
                                    </Form.Group>
                                </Form>
                            </Card.Body>
                        </Card>
                    </CardGroup>
                </Col>
            </Row>
        </Container>
    )


}

