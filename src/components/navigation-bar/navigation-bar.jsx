import { Navbar, Container, Nav } from "react-bootstrap";
import { clearProfile } from "../../redux/reducers/profile";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setUser, setToken } from "../../redux/reducers/user";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'

export default NavigationBar = () => {

  const dispatch = useDispatch()

  const user = useSelector(state => state.user.userObj)
  
  const onLoggedOut = () => {
    dispatch(setUser(null));
    dispatch(setToken(null));
  };

  return (
    <Navbar className="rounded-bottom" style={{ backgroundColor: "SeaGreen" }} data-bs-theme="dark" expand="lg">
      <Container>
        <Navbar.Brand style={{ fontSize: "1.75rem" }} as={Link} to="/">
          <FontAwesomeIcon
            icon={icon({ name: 'film', family: 'classic', style: 'solid' })}
            className="me-1"
          />
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
                <Nav.Link data-toggle="button" as={Link} to="/">
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
