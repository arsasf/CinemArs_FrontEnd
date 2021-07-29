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
import { getDataSearch } from "../../../redux/actions/userProfile";
import { connect } from "react-redux";
function NavbarCinemars(props) {
  const [active, setActive] = useState(false);
  const login = props.login ? props.login : false;
  const admin = props.user
    ? props.user.user_role === "admin"
      ? true
      : false
    : false;
  const [location, setLocation] = useState("All Location");
  const [movie, setMovie] = useState("");
  const [data, setData] = useState([]);

  const handleLogout = () => {
    console.log(true);
    localStorage.clear();
    window.location.href = "/";
  };
  const handleSearch = (param1, param2) => {
    console.log(param2);
    if (param1 === "All Location") {
      props
        .getDataSearch("", param2)
        .then((res) => {
          setMovie("");
          setData(res.value.data.data);
        })
        .catch((err) => {
          setData([]);
          setMovie("");
          return [];
        });
    } else {
      props
        .getDataSearch(param1, param2)
        .then((res) => {
          setMovie("");
          setData(res.value.data.data);
          return res.value.data.data;
        })
        .catch((err) => {
          setData([]);
          setMovie("");
          return [];
        });
    }
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
              {location}
            </Dropdown.Toggle>
            <Dropdown.Menu className={style.menuListMovie}>
              <Dropdown.Item
                className={style.listMovie}
                onClick={() => setLocation("All Location")}
              >
                All Location
              </Dropdown.Item>
              <Dropdown.Item
                className={style.listMovie}
                onClick={() => setLocation("Banjarmasin")}
              >
                Banjarmasin
              </Dropdown.Item>
              <Dropdown.Item
                className={style.listMovie}
                onClick={() => setLocation("Banjarbaru")}
              >
                Banjarbaru
              </Dropdown.Item>
              <Dropdown.Item
                className={style.listMovie}
                onClick={() => setLocation("Barito Kuala")}
              >
                Barito Kuala
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <Form.Group className={style.boxForm}>
            <Form.Control
              type="text"
              placeholder="Search movie here..."
              className={style.placeholder}
              name="movie"
              value={movie}
              onChange={(e) => setMovie(e.target.value)}
            />
            <Button
              className={style.buttonSearchActive}
              variant="fff"
              onClick={() => handleSearch(location, movie)}
            >
              <Image className={style.iconSearch} src={SearchActive} />
            </Button>
          </Form.Group>
        </Modal.Header>
        <Modal.Body className={style.modalBody}>
          {data.length > 0 ? (
            data.map((item, index) => {
              return (
                <div key={index} className={style.boxSearchMovie}>
                  <Image
                    src={`${process.env.REACT_APP_IMAGE_URL}${item.movie_image}`}
                    className={style.imgMovie}
                  />
                  <div className={style.boxInfoSearch}>
                    <div className={style.infoSearch}>
                      <h5>
                        <b>{item.movie_name}</b>
                      </h5>
                    </div>
                    <div className={style.infoSearch}>
                      <h5>Premiere</h5>
                      <h5>{item.premiere_name}</h5>
                    </div>
                    <div className={style.infoSearch}>
                      <h5>Location</h5>
                      <h5>{item.location_address}</h5>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className={style.notFound}>
              Sorry, <br /> movie not available...
            </div>
          )}
        </Modal.Body>
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
                    to="/cinemars/manage-movie/0"
                  >
                    Manage Movies
                  </Nav.Link>
                  <Nav.Link
                    as={Link}
                    className={style.textNav}
                    to="/cinemars/manage-premiere/0"
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
                      props.userProfile.data.length > 0 ? (
                        props.userProfile.data[0].user_image === "" ||
                        props.userProfile.data[0].user_image === undefined ||
                        props.userProfile.data[0].user_image === null ? (
                          <Image
                            src={imgDefault}
                            className={style.imgDefault}
                          />
                        ) : (
                          <Image
                            src={`${process.env.REACT_APP_IMAGE_URL}${props.userProfile.data[0].user_image}`}
                            className={style.imgDefault}
                          />
                        )
                      ) : (
                        <Image
                          src={`${process.env.REACT_APP_IMAGE_URL}${props.user.user_image}`}
                          className={style.imgDefault}
                        />
                      )
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
                      props.userProfile.data.length > 0 ? (
                        props.userProfile.data[0].user_image === "" ||
                        props.userProfile.data[0].user_image === undefined ||
                        props.userProfile.data[0].user_image === null ? (
                          <Image
                            src={imgDefault}
                            className={style.imgDefault}
                          />
                        ) : (
                          <Image
                            src={`${process.env.REACT_APP_IMAGE_URL}${props.userProfile.data[0].user_image}`}
                            className={style.imgDefault}
                          />
                        )
                      ) : (
                        <Image
                          src={`${process.env.REACT_APP_IMAGE_URL}${props.user.user_image}`}
                          className={style.imgDefault}
                        />
                      )
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

const mapStateToProps = (state) => ({
  userProfile: state.userProfile,
});

const mapDispatchToProps = {
  getDataSearch,
};
export default connect(mapStateToProps, mapDispatchToProps)(NavbarCinemars);
