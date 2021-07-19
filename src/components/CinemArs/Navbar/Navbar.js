import React, { useState } from "react";
import {
  Navbar,
  Container,
  Nav,
  Dropdown,
  Form,
  Button,
  Image,
  Modal,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import Logo from "../../../assets/img/NavBar/Tickitz.png";
import imgDefault from "../../../assets/img/img-not-found.png";
import Search from "../../../assets/img/NavBar/Search.png";
import SearchActive from "../../../assets/img/loupe.png";
import style from "../Navbar/Navbar.module.css";
import {} from "phosphor-react";
function NavbarCinemars(props) {
  const [active, setActive] = useState(false);
  const login = props.login ? props.login : false;
  const admin = props.user
    ? props.user.user_role === "admin"
      ? true
      : false
    : false;

  const handleLogout = () => {
    console.log(true);
    localStorage.clear();
    window.location.href = "/signin";
  };
  return (
    <>
      <Modal
        show={active}
        className={style.modal}
        size="lg"
        onHide={() => setActive(false)}
      >
        <Modal.Header>
          <Dropdown className={style.selectMovieActive}>
            <Dropdown.Toggle
              variant="fff"
              className={style.dropdownSelectMovieActive}
            >
              Location
            </Dropdown.Toggle>
            <Dropdown.Menu className={style.menuListMovie}>
              <Dropdown.Item className={style.listMovie}>
                All Location
              </Dropdown.Item>
              <Dropdown.Item className={style.listMovie}>
                Banjarmasin
              </Dropdown.Item>
              <Dropdown.Item className={style.listMovie}>
                Banjarbaru
              </Dropdown.Item>
              <Dropdown.Item className={style.listMovie}>
                Barito Kuala
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <Form.Group className={style.boxForm}>
            <Form.Control
              type="text"
              placeholder="Search movie here..."
              className={style.placeholder}
            />
            <Button className={style.buttonSearchActive} variant="fff">
              <Image className={style.iconSearch} src={SearchActive} />
            </Button>
          </Form.Group>
        </Modal.Header>
        <Modal.Body>ini Body</Modal.Body>
        <Modal.Footer>
          <Button
            onClick={() => setActive(false)}
            className={style.buttonClose}
            variant="fff"
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <Navbar className="shadow" bg="light" expand="lg" fixed="top">
        {login === true ? (
          admin === true ? (
            <Container className={style.containerNav}>
              <Navbar.Brand as={Link} to="/cinemars/home">
                <Image src={Logo} />
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse className={style.toggle} id="basic-navbar-nav">
                <Nav className={`${style.navLeft} mr-auto`}>
                  <Nav.Link
                    as={Link}
                    className={style.textNav}
                    to="/cinemars/dashboard"
                  >
                    Dashboard
                  </Nav.Link>
                  <Nav.Link
                    as={Link}
                    className={style.textNav}
                    to="/cinemars/manage-movie/1"
                  >
                    Manage Movies
                  </Nav.Link>
                  <Nav.Link
                    as={Link}
                    className={style.textNav}
                    to="/cinemars/manage-premiere/1"
                  >
                    Manage Schedules
                  </Nav.Link>
                </Nav>
                <Dropdown className={style.selectMovie}>
                  <Dropdown.Toggle
                    variant="fff"
                    className={style.dropdownSelectMovie}
                    onClick={() => setActive(true)}
                  >
                    Location
                  </Dropdown.Toggle>
                </Dropdown>
                <Button
                  className={style.buttonSearch}
                  variant="fff"
                  onClick={() => setActive(true)}
                >
                  <Image className={style.iconSearch} src={Search} />
                </Button>
                <Dropdown className={style.dropdown}>
                  <Dropdown.Toggle
                    variant="#fff"
                    className={style.toggleProfile}
                  >
                    {props.user ? (
                      <Image
                        src={`${process.env.REACT_APP_IMAGE_URL}${props.user.user_image}`}
                        className={style.imgDefault}
                      />
                    ) : (
                      <Image src={imgDefault} className={style.imgDefault} />
                    )}
                  </Dropdown.Toggle>
                  <Dropdown.Menu align="right" className={style.menuDropdown}>
                    <Dropdown.Item
                      className={style.listToggle}
                      as={Link}
                      to="/cinemars/profile"
                    >
                      My Profile
                    </Dropdown.Item>
                    <Dropdown.Item
                      className={style.listToggle}
                      onClick={() => handleLogout()}
                    >
                      Logout
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>

                <h1
                  className={style.deviceMobile}
                  onClick={() => setActive(true)}
                >
                  Location
                </h1>
                <h1
                  className={style.deviceMobile}
                  onClick={() => setActive(true)}
                >
                  Search
                </h1>
                <h1
                  className={style.deviceMobile}
                  as={Link}
                  to="/cinemars/profile"
                >
                  My Profile
                </h1>
                <h1
                  className={style.deviceMobile}
                  onClick={() => handleLogout()}
                >
                  Logout
                </h1>
              </Navbar.Collapse>
            </Container>
          ) : (
            <Container className={style.containerNav}>
              <Navbar.Brand as={Link} to="/cinemars/home">
                <Image src={Logo} />
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse className={style.toggle} id="basic-navbar-nav">
                <Nav className={`${style.navLeft} mr-auto`}>
                  <Nav.Link
                    as={Link}
                    className={style.textNav}
                    to="/cinemars/home"
                  >
                    Home
                  </Nav.Link>
                  <Nav.Link as={Link} className={style.textNav} to="/payment">
                    Payment
                  </Nav.Link>
                  <Nav.Link
                    as={Link}
                    className={style.textNav}
                    to="/cinemars/profile"
                  >
                    Profile
                  </Nav.Link>
                </Nav>
                <Dropdown className={style.selectMovie}>
                  <Dropdown.Toggle
                    variant="fff"
                    className={style.dropdownSelectMovie}
                    onClick={() => setActive(true)}
                  >
                    Location
                  </Dropdown.Toggle>
                </Dropdown>
                <Button
                  className={style.buttonSearch}
                  variant="fff"
                  onClick={() => setActive(true)}
                >
                  <Image className={style.iconSearch} src={Search} />
                </Button>
                <Dropdown className={style.dropdown}>
                  <Dropdown.Toggle
                    variant="#fff"
                    className={style.toggleProfile}
                  >
                    {props.user ? (
                      <Image
                        src={`${process.env.REACT_APP_IMAGE_URL}${props.user.user_image}`}
                        className={style.imgDefault}
                      />
                    ) : (
                      <Image src={imgDefault} className={style.imgDefault} />
                    )}
                  </Dropdown.Toggle>
                  <Dropdown.Menu align="right" className={style.menuDropdown}>
                    <Dropdown.Item
                      className={style.listToggle}
                      onClick={() => handleLogout()}
                    >
                      Logout
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>

                <h1
                  className={style.deviceMobile}
                  onClick={() => setActive(true)}
                >
                  Location
                </h1>
                <h1
                  className={style.deviceMobile}
                  onClick={() => setActive(true)}
                >
                  Search
                </h1>
                <h1
                  className={style.deviceMobile}
                  onClick={() => handleLogout()}
                >
                  Logout
                </h1>
              </Navbar.Collapse>
            </Container>
          )
        ) : (
          <Container className={style.containerNavNotLogin}>
            <Navbar.Brand as={Link} to="/cinemars/home">
              <Image src={Logo} />
            </Navbar.Brand>
            <div>
              <Button
                className={style.buttonSignIn}
                variant="fff"
                as={Link}
                to="/signin"
              >
                Sign In
              </Button>
              <Button
                className={style.buttonSignUp}
                variant="fff"
                as={Link}
                to="/signup"
              >
                Sign Up
              </Button>
            </div>
          </Container>
        )}
      </Navbar>
    </>
  );
}

export default NavbarCinemars;
