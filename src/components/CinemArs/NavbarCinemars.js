import { Component } from "react";
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
import Logo from "../../assets/img/NavBar/Tickitz.png";
import Search from "../../assets/img/NavBar/Search.png";
import style from "./NavBar.module.css";

class NavbarCinemars extends Component {
  render() {
    return (
      <>
        <Navbar className="shadow" expand="lg">
          <Container className={style.containerNav} fixed="top">
            <Navbar.Brand>
              <Link to="#">
                <Image src={Logo} />
              </Link>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse className={style.toggle} id="basic-navbar-nav">
              <Nav className={style.navLeft}>
                <Nav.Link>
                  <Link className={style.textNav} to="/learning/basic-home">
                    Movies
                  </Link>
                </Nav.Link>
                <Nav.Link>
                  <Link
                    className={style.textNav}
                    to="/learning/basic-movie-detail"
                  >
                    Cinemas
                  </Link>
                </Nav.Link>
                <Nav.Link>
                  <Link className={style.textNav} to="/learning/basic-home">
                    Buy Ticket
                  </Link>
                </Nav.Link>
              </Nav>
              <Nav className={style.menuRightSm}>
                <NavDropdown
                  className={style.textNavRight}
                  title="Location"
                  id="basic-nav-dropdown"
                >
                  <NavDropdown.Item>
                    <Link className={style.textRightItem} to="#">
                      Banjarmasin
                    </Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    <Link className={style.textRightItem} to="#">
                      BanjarBaru
                    </Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    <Link className={style.textRightItem} to="#">
                      Barito Kuala
                    </Link>
                  </NavDropdown.Item>
                </NavDropdown>
                <Form inline className={style.form}>
                  <FormControl
                    type="text"
                    placeholder="Search"
                    className="mr-sm-2"
                  />
                </Form>
                <Nav.Link>
                  <Link className={style.textNav1} to="#">
                    Sign Up
                  </Link>
                </Nav.Link>
              </Nav>
              <Nav className={style.menuRightLg}>
                <NavDropdown
                  className={style.textNavRight}
                  title="Location"
                  id="basic-nav-dropdown"
                >
                  <NavDropdown.Item>
                    <Link className={style.textRightItem} to="#">
                      Banjarmasin
                    </Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    <Link className={style.textRightItem} to="#">
                      BanjarBaru
                    </Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    <Link className={style.textRightItem} to="#">
                      Barito Kuala
                    </Link>
                  </NavDropdown.Item>
                </NavDropdown>
                <Navbar.Brand>
                  <Link to="#">
                    <Image className={style.menuRightImage} src={Search} />
                  </Link>
                </Navbar.Brand>
                <Button className={style.menuRightButton}>Sign Up</Button>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </>
    );
  }
}

export default NavbarCinemars;
