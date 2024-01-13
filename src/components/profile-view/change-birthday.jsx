import React, { useState, useEffect } from 'react';
import { Button, Form, Card, CardGroup, Container, Col, Row } from "react-bootstrap";
import { Link, useOutletContext } from "react-router-dom"
import moment from 'moment';
import InfoCard from './info-card';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./change-birthday.scss";
import "./profile-view.scss";


export default ChangeBirthday = () => {

    const [onBackClick, user, oldBirth] = useOutletContext();

    const [oldBirthday, setOldBirthday] = useState(oldBirth);
    const [newBirthday, setNewBirthday] = useState(oldBirth);

    const [success, setSuccess] = useState("")
    const [submitButton, setSubmitButton] = useState(false);

    const notify = () => {

        toast.success("You've successfully updated your birthday!", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 99999
        });

    };

    useEffect(() => {

        console.log("old bd:", oldBirthday);
        console.log("new bd fancy:", new Date(newBirthday).toISOString());
        console.log("new bd:", newBirthday);
        console.log("new birthday is equal to old birthday:", new Date(newBirthday).toISOString() == oldBirthday);

        if (new Date(newBirthday).toISOString() != new Date(oldBirthday).toISOString()) {
            console.log("enable submit btn");
            setSubmitButton(true)
        } else {
            console.log("disable submit btn");
            setSubmitButton(false)
        }

        if (success) {
            console.log("success!!");
            notify()
        }

    }, [newBirthday, success])



    const handleSubmit = (event) => {

        event.preventDefault()

        async function fetchData() {

            fetch(`https://fathomless-everglades-10625-ad628eacb5b5.herokuapp.com/https://ifdbase-c6a1086fce3e.herokuapp.com/users/${user.Username}`, {
                method: "PUT",
                body: JSON.stringify({
                    Birthday: newBirthday //YYYY-MM-DD
                }),
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json"
                }
            }).then((response) => response.json())
                .then((data) => {
                    console.log(data)
                    setOldBirthday(newBirthday)
                    setSuccess(true)

                })
        }

        fetchData()

    }

    return (
        <Container>

            <ToastContainer />

            <Row>
                <Col>
                    <CardGroup>
                        <Card>
                            <Card.Body>
                                <Card.Title className='mb-3'>Change Birthday</Card.Title>

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

                                    <Form.Group controlId='oldBirthday'>
                                        <Form.Label className='mb-0'>
                                            Old birthday
                                        </Form.Label>
                                        <Form.Control
                                            type='date'
                                            max={new Date()}
                                            value={new Date(oldBirthday).toISOString().split('T', 1)[0]}
                                            disabled
                                        />
                                    </Form.Group>

                                    <Form.Group controlId='newBirthday'>
                                        <Form.Label className='mb-0 mt-3'>
                                            New birthday
                                        </Form.Label>
                                        <Form.Control
                                            type='date'
                                            max={new Date().toISOString().split('T', 1)[0]}
                                            value={new Date(newBirthday).toISOString().split('T', 1)[0]}
                                            onClick={(e) => e.currentTarget.showPicker()}
                                            onChange={(e) => {
                                                setSuccess(false)
                                                setNewBirthday(e.target.value)
                                            }}
                                        />
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
                                            onClick={onBackClick}>
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