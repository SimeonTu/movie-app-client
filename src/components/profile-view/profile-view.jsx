import React, { useState, useEffect } from 'react';
import { Form, Button, Placeholder, Card, Row, Col, Modal } from 'react-bootstrap';
import { Link, Outlet } from 'react-router-dom';
import moment from 'moment';
import { MovieCard } from '../movie-card/movie-card';
import { MovieCardPlaceholder } from '../placeholders/movie-card-placeholder';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./profile-view.scss";
import { useSelector, useDispatch } from 'react-redux';
import { clearProfile, setChangeUsername, setChangePassword, setChangeEmail, setChangeBirthday } from "../../redux/reducers/profile";
import { setUser, setToken } from '../../redux/reducers/user';


export const ProfileView = ({ onMovieClick }) => {

    const dispatch = useDispatch()
    // dispatch(clearProfile())

    const user = useSelector(state => state.user.userObj)
    const token = useSelector(state => state.user.token)
    const [birthday, setBirthday] = useState(null);
    const [fetchedUser, setFetchedUser] = useState("")

    const [favoriteMovies, setFavoriteMovies] = useState([])
    const movies = useSelector((state) => state.movies.list)
    let movieData = movies

    const changeUsername = useSelector(state => state.profile.changeUsername);
    const changePassword = useSelector(state => state.profile.changePassword);
    const changeEmail = useSelector(state => state.profile.changeEmail);
    const changeBirthday = useSelector(state => state.profile.changeBirthday);

    const [loading, setLoading] = useState(true);
    const [refresh, setRefresh] = useState(false);
    const [show, setShow] = useState(false);

    console.log("refresh:", refresh);

    console.log(movies, movieData, favoriteMovies, "log", changeUsername, changePassword, changeEmail, changeBirthday);

    useEffect(() => {




        async function bruh() {
            // let userdata = await fetchUserData()

            let favMovies = movies.filter(movie => {
                if (user.FavoriteMovies.includes(movie.id)) {
                    console.log("yep")
                    return movie
                }
            })


            setFavoriteMovies(favMovies)

            // if movie data has loaded, remove placeholders
            if (movieData.length != 0) {
                // setFavoriteMovies([])
                setLoading(false)
            }

            console.log("favoriteMovies:",favoriteMovies);

        }

        bruh();

        // console.log(movieData)
        // console.log(moviee)

        if (refresh) {
            bruh();
        }


    }, [movieData, refresh, user])


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

    const onLoggedOut = () => {
        dispatch(setUser(null));
        dispatch(setToken(null));
        localStorage.clear()
    }

    const onBackClick = () => {
        clearProfile()
        setLoading(true)
        setRefresh(true)
    }

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

    return (

        <>
            <ToastContainer />

            <h1 className='profile-header mb-3 mt-2'>User Profile of <b>{user.Username}</b></h1>

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
                                dispatch(setChangeUsername(true))
                            }} variant="primary">
                                Change Username
                            </Button>
                        </Link>
                        <Link className='me-3' to="change-password">
                            <Button onClick={() => {
                                setRefresh(false)
                                dispatch(setChangePassword(true))
                            }} variant="primary">
                                Change Password
                            </Button>
                        </Link>
                        <Link className='me-3' to="change-email">
                            <Button onClick={() => {
                                setRefresh(false)
                                dispatch(setChangeEmail(true))
                            }} variant="primary">
                                Change Email
                            </Button>
                        </Link>
                        <Link className='me-3' to="change-birthday">
                            <Button onClick={() => {
                                setRefresh(false)
                                dispatch(setChangeBirthday(true))
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
                                        placeholder={user.Email}
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
                                        placeholder={moment(new Date(user.Birthday)).format('DD-MMM-YYYY')}
                                        disabled
                                    />
                                </Form.Group>
                            </Form>
                            <Card className="p-0 mt-4">
                                <Card.Header>
                                    <h4>Favorite movies</h4>
                                </Card.Header>
                                <Card.Body>
                                    <Row>
                                        {favoriteMovies.length == 0 ? (
                                            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "435px" }}>
                                                <span style={{ color: "gray", opacity: "0.5", fontSize: "2rem" }}>
                                                    <i><u>Nothing but crickets here...</u></i>
                                                </span>
                                            </div>
                                        ) : (
                                            <>
                                                {
                                                    favoriteMovies.map(movie => (
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