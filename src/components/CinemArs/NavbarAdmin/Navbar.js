import React, { Component } from "react";
import {
  Navbar,
  Container,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Button,
  Image,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import Logo from "../../../assets/img/NavBar/Tickitz.png";
import Search from "../../../assets/img/NavBar/Search.png";
import style from "../Navbar/Navbar.module.css";

class NavbarCinemars extends Component {
  handleLogout = (params) => {
    if (params) {
      alert("you are logout");
      localStorage.clear();
      window.location.href = "/signin";
    }
  };
  render() {
    console.log("ini navbar");
    return (
      <>
        <Navbar className="shadow" bg="light" expand="lg" fixed="top">
          <Container className={style.containerNav}>
            <Navbar.Brand as={Link} to="/cinemars/home">
              <Image src={Logo} />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse className={style.toggle} id="basic-navbar-nav">
              <Nav className={`${style.navLeft} mr-auto`}>
                <Nav.Link as={Link} className={style.textNav} to="#">
                  Dashboard
                </Nav.Link>
                <Nav.Link as={Link} className={style.textNav} to="#">
                  Manage Movie
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  className={style.textNav}
                  to="/cinemars/manage-movie/1"
                >
                  Manage Premiere
                </Nav.Link>
              </Nav>
              <NavDropdown
                className={` ${style.textNavRight}`}
                title="Location"
                id="basic-nav-dropdown"
              >
                <NavDropdown.Item
                  as={Link}
                  className={style.textRightItem}
                  to="#action/3.1"
                >
                  Banjarmasin
                </NavDropdown.Item>
                <NavDropdown.Item
                  as={Link}
                  className={style.textRightItem}
                  to="#action/3.2"
                >
                  Banjarbaru
                </NavDropdown.Item>
              </NavDropdown>
              <Navbar.Brand as={Link} className={style.menuRightLg} to="#">
                <Image className={style.menuRightImage} src={Search} />
              </Navbar.Brand>
              <Button
                className={`${style.menuRightLg} ${style.menuRightButton}`}
                variant="outline-dark"
                onClick={() => {
                  this.handleLogout(localStorage.getItem("user_id"));
                }}
              >
                Sign Out
              </Button>
              <Form inline className={style.menuRightSm}>
                <FormControl
                  type="text"
                  placeholder="Search"
                  className="mr-sm-2"
                />
                <Button variant="outline-success">Search</Button>
              </Form>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </>
    );
  }
}

export default NavbarCinemars;
