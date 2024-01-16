import { Navbar, Container, Nav } from "react-bootstrap";
import { clearProfile } from "../../redux/reducers/profile";

import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setUser, setToken } from "../../redux/reducers/user";

export default NavigationBar = () => {

  const dispatch = useDispatch()

  const storedUser = JSON.parse(localStorage.getItem("user"));
  const user = useSelector(state => state.user.userObj)
  const onLoggedOut = () => {
    dispatch(setUser(null));
    dispatch(setToken(null));
  };

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          IFDb
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {!user && (
              <>
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/signup">
                  Signup
                </Nav.Link>
              </>
            )}
            {user && (
              <>
                <Nav.Link as={Link} to="/">
                  Home
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  onClick={() => {
                    clearProfile()
                  }}
                  to="/profile">
                  Profile
                </Nav.Link>
                <Nav.Link onClick={() => {

                  localStorage.clear()
                  onLoggedOut()
                }}>Logout</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar >
  );
};
