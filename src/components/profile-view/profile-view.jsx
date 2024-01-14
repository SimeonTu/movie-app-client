import React, { useState, useEffect } from 'react';
import { Form, Button, Placeholder, Card, Row, Col, Modal } from 'react-bootstrap';
import { Link, Outlet } from 'react-router-dom';
import moment from 'moment';
import MovieCard from '../movie-card/movie-card';
import MovieCardPlaceholder from '../placeholders/movie-card-placeholder';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./profile-view.scss";


export default ProfileView = ({ user, onLoggedOut, movieData, onMovieClick, token, movieFetch }) => {


    const [birthday, setBirthday] = useState(null);
    const [movies, setMovies] = useState(movieData)

    const [fetchedUser, setFetchedUser] = useState("")
    const [changeUsername, setChangeUsername] = useState(null);
    const [changePassword, setChangePassword] = useState(null);
    const [changeEmail, setChangeEmail] = useState(null);
    const [changeBirthday, setChangeBirthday] = useState(null);
    const [loading, setLoading] = useState(true);
    const [refresh, setRefresh] = useState(true);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleDeleteAcc = () => {
        fetch(`https://fathomless-everglades-10625-ad628eacb5b5.herokuapp.com/https://ifdbase-c6a1086fce3e.herokuapp.com/users/${user.Username}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setShow(false)
                deleteAccToast()
                setTimeout(onLoggedOut, 4000)
            })
    }

    const deleteAccToast = () => {
        toast.success(<p>Your account has been deleted and you'll be logged out shortly...</p>, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3500
        });
    }


    useEffect(() => {


        async function bruh() {
            let userdata = await fetchUserData()

            let movieDataFiltered = movieData.filter(movie => {
                if (userdata.FavoriteMovies.includes(movie.id)) {
                    console.log("yep")
                    return movie
                }
            })

            setMovies(movieDataFiltered)

            // if movie data has loaded, remove placeholders
            if (movieData.length != 0) {
                setLoading(false)
            }

        }

        bruh();



        console.log(movies);
        // console.log(movieData)
        // console.log(moviee)

        if (refresh) {
            bruh();
        }


    }, [movieData, refresh])




    async function fetchUserData() {

        let userData = await fetch(`https://fathomless-everglades-10625-ad628eacb5b5.herokuapp.com/https://ifdbase-c6a1086fce3e.herokuapp.com/users/${user.Username}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
            .then((response) => response.json())
            .then((data) => {
                setFetchedUser(data)
                // setLoading(false)
                setBirthday(data.Birthday)
                return data
            })

        return userData

    }

    // fetchUserData()


    const onBackClick = () => {
        setChangeUsername(false)
        setChangeEmail(false)
        setChangePassword(false)
        setChangeBirthday(false)
        setLoading(true)
        setRefresh(true)
    }

    return (

        <>
            <ToastContainer />

            <h1 className='profile-header mb-4'>User Profile of <b>{user.Username}</b></h1>

            {changeUsername ? (
                <Outlet context={[onBackClick, onLoggedOut, user]} />
            ) : changeEmail ? (
                <Outlet context={[onBackClick, user]} />
            ) : changePassword ? (
                <Outlet context={[onBackClick, onLoggedOut, user]} />
            ) : changeBirthday ? (
                <Outlet context={[onBackClick, user, birthday]} />
            ) : (

                <>

                    <div>
                        <Link className='me-3' to="change-username">
                            <Button onClick={() => {
                                setRefresh(false)
                                setChangeUsername(true)
                            }} variant="primary">
                                Change Username
                            </Button>
                        </Link>
                        <Link className='me-3' to="change-password">
                            <Button onClick={() => {
                                setRefresh(false)
                                setChangePassword(true)
                            }} variant="primary">
                                Change Password
                            </Button>
                        </Link>
                        <Link className='me-3' to="change-email">
                            <Button onClick={() => {
                                setRefresh(false)
                                setChangeEmail(true)
                            }} variant="primary">
                                Change Email
                            </Button>
                        </Link>
                        <Link className='me-3' to="change-birthday">
                            <Button onClick={() => {
                                setRefresh(false)
                                setChangeBirthday(true)
                            }} variant="primary">
                                Change Birthday
                            </Button>
                        </Link>

                        <Button variant="danger" onClick={handleShow}>
                            Delete Account
                        </Button>

                        <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Warning</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <center>
                                    <p>
                                        Are you sure you want to delete your account?<br />This decision is permanent .&deg;(ಗдಗ。)&deg;.
                                    </p>
                                </center>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose}>
                                    Take me back
                                </Button>
                                <Button variant="danger" onClick={handleDeleteAcc}>
                                    Yes, I'm sure
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </div>

                    {loading ? (
                        <>
                            <Form>
                                <Form.Group className='mt-3'>
                                    <Placeholder as='label' animation='wave'>
                                        <Placeholder style={{ opacity: "0.25", backgroundColor: 'SeaGreen', width: '2.5rem', height: '1rem' }} />
                                    </Placeholder>
                                    <Placeholder as='div' animation='wave'>
                                        <Placeholder style={{ opacity: "0.25", backgroundColor: 'SeaGreen', width: '100%', height: '38px', borderRadius: '5px' }} />
                                    </Placeholder>
                                </Form.Group>

                                <Form.Group>
                                    <Placeholder className='mt-2' as='label' animation='wave'>
                                        <Placeholder style={{ opacity: "0.25", backgroundColor: 'SeaGreen', width: '2.5rem', height: '1rem' }} />
                                    </Placeholder>
                                    <Placeholder as='div' animation='wave'>
                                        <Placeholder style={{ opacity: "0.25", backgroundColor: 'SeaGreen', width: '100%', height: '38px', borderRadius: '5px' }} />
                                    </Placeholder>
                                </Form.Group>
                            </Form>
                            <Card className="p-0 mt-4" style={{}} >
                                <Card.Header>
                                    <h4>Favorite movies</h4>
                                </Card.Header>
                                <Card.Body>
                                    <Row>
                                        <Col md={3} className='mb-5'>
                                            <MovieCardPlaceholder></MovieCardPlaceholder>
                                        </Col>
                                        <Col md={3} className='mb-5'>
                                            <MovieCardPlaceholder></MovieCardPlaceholder>
                                        </Col>
                                        <Col md={3} className='mb-5'>
                                            <MovieCardPlaceholder></MovieCardPlaceholder>
                                        </Col>
                                        <Col md={3} className='mb-5'>
                                            <MovieCardPlaceholder></MovieCardPlaceholder>
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                        </>
                    ) : (
                        <>
                            <Form>
                                <Form.Group className='mt-3'>
                                    <Form.Label className='mb-0'>
                                        Email
                                    </Form.Label>
                                    <Form.Control
                                        id='disabledEmail'
                                        placeholder={fetchedUser.Email}
                                        disabled
                                    />
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label className='mb-0 mt-2'>
                                        Birthday
                                    </Form.Label>
                                    <Form.Control
                                        id='disabledBirthday'
                                        // Using the moment.js library to format birthday date
                                        placeholder={moment(new Date(birthday)).format('DD-MMM-YYYY')}
                                        disabled
                                    />
                                </Form.Group>
                            </Form>
                            <Card className="p-0 mt-4" style={{}} >
                                <Card.Header>
                                    <h4>Favorite movies</h4>
                                </Card.Header>
                                <Card.Body>
                                    <Row>
                                        {movies.length == 0 ? (
                                            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "435px" }}>
                                                <span style={{ color: "gray", opacity: "0.5", fontSize: "2rem" }}>
                                                    <i><u>Nothing but crickets here...</u></i>
                                                </span>
                                            </div>
                                        ) : (
                                            <>
                                                {
                                                    movies.map(movie => (
                                                        <Col key={movie.id} md={3} className="mb-5">
                                                            <MovieCard
                                                                key={movie.id}
                                                                movieData={movie}
                                                                onMovieClick={onMovieClick}
                                                            />
                                                        </Col>
                                                    ))
                                                }
                                            </>
                                        )}

                                    </Row>
                                </Card.Body>
                            </Card>
                        </>
                    )}
                </>


            )
            }
        </>
    )
};