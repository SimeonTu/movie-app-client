import React, { useState, useEffect } from 'react';
import { Form, Button, Placeholder, Card, Row, Col } from 'react-bootstrap';
import { Link, Outlet } from 'react-router-dom';
import moment from 'moment';
import MovieCard from '../movie-card/movie-card';
import MovieCardPlaceholder from '../placeholders/movie-card-placeholder';
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


    useEffect(() => {


        async function bruh() {
            let userdata = await fetchUserData()

            movieData = movieData.filter(movie => {
                if (userdata.FavoriteMovies.includes(movie.id)) {
                    console.log("yep")
                    return movie
                }
            })
            setMovies(movieData)

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
                setLoading(false)
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
                        <Link to="change-username">
                            <Button onClick={() => {
                                setRefresh(false)
                                setChangeUsername(true)
                            }} className='me-3' variant="primary">
                                Change Username
                            </Button>
                        </Link>
                        <Link to="change-password">
                            <Button onClick={() => {
                                setRefresh(false)
                                setChangePassword(true)
                            }} className='me-3' variant="primary">
                                Change Password
                            </Button>
                        </Link>
                        <Link to="change-email">
                            <Button onClick={() => {
                                setRefresh(false)
                                setChangeEmail(true)
                            }} className='me-3' variant="primary">
                                Change Email
                            </Button>
                        </Link>
                        <Link to="change-birthday">
                            <Button onClick={() => {
                                setRefresh(false)
                                setChangeBirthday(true)
                            }} className='me-3' variant="primary">
                                Change Birthday
                            </Button>
                        </Link>
                    </div>

                    {loading || movieData.length == 0 ? (
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
                                        {movies.map(movie => (
                                            <Col key={movie.id} md={3} className="mb-5">
                                                <MovieCard
                                                    key={movie.id}
                                                    movieData={movie}
                                                    onMovieClick={onMovieClick}
                                                />
                                            </Col>
                                        ))
                                        }
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