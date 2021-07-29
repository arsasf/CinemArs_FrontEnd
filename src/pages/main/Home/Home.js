import React, { Component } from "react";
import { getAllMovie } from "../../../redux/actions/movie";
import { connect } from "react-redux";
import styles from "./Home.module.css";
import NavBar from "../../../components/CinemArs/Navbar/Navbar";
import Footer from "../../../components/CinemArs/Footer/Footer";
import Cards from "../../../components/CinemArs/Card/Card";
import CardImage from "../../../components/CinemArs/CardShowing/CardShowing";
import {
  Container,
  Row,
  Col,
  Image,
  Form,
  Button,
  ToggleButton,
  ToggleButtonGroup,
} from "react-bootstrap";
import { Link } from "react-router-dom";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataAllMovie: [],
      dataMovieMonthNow: [],
      id: "",
      page: 1,
      limit: 5,
      searchByName: "",
      sort: "movie_id ASC",
      month: "MONTH(movie_release_date)",
      viewAllShowing: false,
      viewAllUpcoming: false,
      totalDataMovieMonth: 0,
      totalDataMovie: 0,
    };
  }
  componentDidMount() {
    this.getDataMovie();
    this.getDataMovieMonthNow();
  }

  getDataMovie = () => {
    const { page, limit, searchByName, sort, month } = this.state;
    this.props
      .getAllMovie(page, limit, searchByName, sort, month)
      .then((res) => {
        this.setState({
          ...this.state,
          dataAllMovie: res.value.data.data,
          totalDataMovie: res.value.data.pagination.totalData,
        });
      })
      .catch((err) => {
        if (err) {
          return [];
        }
      });
  };

  getDataMovieMonthNow = () => {
    const month = "MONTH(now())";
    const { page, limit, searchByName, sort } = this.state;
    this.props
      .getAllMovie(page, limit, searchByName, sort, month)
      .then((res) => {
        this.setState({
          ...this.state,
          dataMovieMonthNow: res.value.data.data,
          totalDataMovieMonth: res.value.data.pagination.totalData,
        });
      })
      .catch((err) => {
        if (err) {
          return [];
        }
      });
  };

  handleViewLess = (event) => {
    event.preventDefault();
    this.setState(
      {
        ...this.state.from,
        viewAllShowing: false,
        limit: 5,
        month: "month(now())",
      },
      () => {
        this.getDataMovieMonthNow();
      }
    );
  };
  handleMovieShowingAllClick = (event, totalData) => {
    event.preventDefault();
    this.setState(
      {
        ...this.state,
        viewAllShowing: true,
        viewAllUpcoming: false,
        limit: totalData,
        month: "month(now())",
      },
      () => {
        this.getDataMovieMonthNow();
      }
    );
  };
  handleViewUpcomingLess = (event) => {
    event.preventDefault();
    this.setState(
      {
        ...this.state.from,
        viewAllUpcoming: false,
        limit: 5,
        month: "MONTH(movie_release_date)",
      },
      () => {
        this.getDataMovie();
      }
    );
  };
  handleMovieUpcomingAllClick = (event, totalData) => {
    event.preventDefault();
    this.setState(
      {
        ...this.state,
        viewAllUpcoming: true,
        viewAllShowing: false,
        limit: totalData,
        month: "MONTH(movie_release_date)",
      },
      () => {
        this.getDataMovie();
      }
    );
  };

  handleMovieUpcomingMonthClick = (params) => {
    this.setState(
      {
        ...this.state,
        limit: 5,
        month: params,
      },
      () => {
        this.getDataMovie();
      }
    );
  };

  render() {
    const {
      dataAllMovie,
      dataMovieMonthNow,
      viewAllShowing,
      viewAllUpcoming,
      totalDataMovie,
      totalDataMovieMonth,
    } = this.state;
    return (
      <>
        <NavBar
          login={true}
          user={this.props.auth.data ? this.props.auth.data : false}
        />
        <Container fluid className={styles.containerCenter}>
          <Row className={styles.rowHome}>
            {/* Content-1 */}
            <Container fluid className={styles.containerContent1}>
              <Container className={styles.containerForm}>
                <Row className={styles.rowContent1}>
                  <Col lg={6} className={styles.left}>
                    <h6>Nearest Cinema, Newest Movie,</h6>
                    <h1>Find out now!</h1>
                  </Col>
                  <Col lg={6} className={styles.right}>
                    <Image
                      className={`${styles.img1} shadow`}
                      src="https://cinemarsticketbooking.netlify.app/img/[V1]%20-%20Home%20Page/Rectangle%2033.png"
                      alt=""
                    />
                    <Image
                      className={`${styles.img2} shadow`}
                      src="https://cinemarsticketbooking.netlify.app/img/[V1]%20-%20Home%20Page/Rectangle%2033(1).png"
                      alt=""
                    />
                    <Image
                      className={`${styles.img3} shadow`}
                      src="https://cinemarsticketbooking.netlify.app/img/[V1]%20-%20Home%20Page/Rectangle%2033(2).png"
                      alt=""
                    />
                  </Col>
                </Row>
              </Container>
            </Container>
            {/* Content-2 */}
            <Container fluid className={styles.containerContent2}>
              <Container className={styles.containerForm}>
                <Row className={styles.showingText}>
                  <Row className={styles.bar}>
                    <Link to="#" className={styles.titleShowingText}>
                      Now Showing
                    </Link>
                    <span className={styles.activeBar}></span>
                  </Row>
                  <Link
                    to="#"
                    onClick={
                      viewAllShowing === false
                        ? (event) =>
                            this.handleMovieShowingAllClick(
                              event,
                              totalDataMovieMonth
                            )
                        : (event) => this.handleViewLess(event)
                    }
                    className={styles.viewAllShowing}
                  >
                    {viewAllShowing === true ? "View Less" : "View All"}
                  </Link>
                </Row>
                <Row
                  className={
                    dataMovieMonthNow.length > 4 &&
                    dataMovieMonthNow.length <= 5
                      ? styles.rowCardImage
                      : styles.rowCardImageLimit
                  }
                >
                  {dataMovieMonthNow.length > 0 ? (
                    dataMovieMonthNow.map((item, index) => {
                      return (
                        <Col md={2} key={index} className={styles.colCardImage}>
                          <CardImage data={item} />
                        </Col>
                      );
                    })
                  ) : (
                    <div className={styles.notFound}>
                      Sorry, <br /> there are no movies released this month...
                    </div>
                  )}
                </Row>
              </Container>
            </Container>
            {/* Content-3 */}
            <Container fluid className={styles.containerContent3}>
              <Container className={styles.containerForm}>
                <Row className={styles.showingText} sticky="top">
                  <Link className={styles.titleUpcomingText} to="#">
                    Upcoming Movies
                  </Link>
                  <Link
                    to="#"
                    onClick={
                      viewAllUpcoming === false
                        ? (event) =>
                            this.handleMovieUpcomingAllClick(
                              event,
                              totalDataMovie
                            )
                        : (event) => this.handleViewUpcomingLess(event)
                    }
                    className={styles.viewAll}
                  >
                    {viewAllUpcoming === false ? "View All" : "View Less"}
                  </Link>
                </Row>
                <Row className={styles.month}>
                  <ToggleButtonGroup
                    type="radio"
                    name="options"
                    defaultValue={1}
                    className={styles.overflow}
                  >
                    <ToggleButton
                      className={styles.Button}
                      variant="dark"
                      value="1"
                      onClick={() => this.handleMovieUpcomingMonthClick(1)}
                    >
                      Januari
                    </ToggleButton>
                    <ToggleButton
                      className={styles.Button}
                      variant="dark"
                      value="2"
                      onClick={() => this.handleMovieUpcomingMonthClick(2)}
                    >
                      Februari
                    </ToggleButton>
                    <ToggleButton
                      className={styles.Button}
                      variant="dark"
                      value="3"
                      onClick={() => this.handleMovieUpcomingMonthClick(3)}
                    >
                      Maret
                    </ToggleButton>
                    <ToggleButton
                      className={styles.Button}
                      variant="dark"
                      value="4"
                      onClick={() => this.handleMovieUpcomingMonthClick(4)}
                    >
                      April
                    </ToggleButton>
                    <ToggleButton
                      className={styles.Button}
                      value="5"
                      variant="dark"
                      onClick={() => this.handleMovieUpcomingMonthClick(5)}
                    >
                      May
                    </ToggleButton>
                    <ToggleButton
                      className={styles.Button}
                      value="6"
                      variant="dark"
                      onClick={() => this.handleMovieUpcomingMonthClick(6)}
                    >
                      June
                    </ToggleButton>
                    <ToggleButton
                      className={styles.Button}
                      variant="dark"
                      value="7"
                      onClick={() => this.handleMovieUpcomingMonthClick(7)}
                    >
                      July
                    </ToggleButton>
                    <ToggleButton
                      className={styles.Button}
                      variant="dark"
                      value="8"
                      onClick={() => this.handleMovieUpcomingMonthClick(8)}
                    >
                      August
                    </ToggleButton>
                    <ToggleButton
                      className={styles.Button}
                      variant="dark"
                      value="9"
                      onClick={() => this.handleMovieUpcomingMonthClick(9)}
                    >
                      September
                    </ToggleButton>
                    <ToggleButton
                      className={styles.Button}
                      variant="dark"
                      value="10"
                      onClick={() => this.handleMovieUpcomingMonthClick(10)}
                    >
                      October
                    </ToggleButton>
                    <ToggleButton
                      className={styles.Button}
                      variant="dark"
                      value="11"
                      onClick={() => this.handleMovieUpcomingMonthClick(11)}
                    >
                      November
                    </ToggleButton>
                    <ToggleButton
                      className={styles.Button}
                      variant="dark"
                      value="12"
                      onClick={() => this.handleMovieUpcomingMonthClick(12)}
                    >
                      Desember
                    </ToggleButton>
                  </ToggleButtonGroup>
                </Row>
                <Row
                  className={
                    dataAllMovie.length > 4 && dataAllMovie.length <= 5
                      ? styles.rowCard
                      : styles.rowCardLimit
                  }
                >
                  {dataAllMovie.length > 0 ? (
                    dataAllMovie.map((item, index) => {
                      return (
                        <Col md={2} key={index} className={styles.colCard}>
                          <Cards data={item} />
                        </Col>
                      );
                    })
                  ) : (
                    <div className={styles.notFound}>
                      Sorry, <br /> there are no movies released this month...
                    </div>
                  )}
                </Row>
              </Container>
            </Container>
            {/* Content-4 */}
            <Container fluid className={styles.containerContent4}>
              <Container className={styles.containerForm}>
                <Row bg="light" className={`${styles.rowContent4} shadow`}>
                  <div className={styles.boxForm}>
                    <div className={styles.titleText}>
                      <h6>Be the vanguard of the</h6>
                      <h1>Moviegoers</h1>
                    </div>
                    <Form>
                      <Form.Row className={styles.formEmail}>
                        <Form.Group controlId="formGridEmail">
                          <Form.Control
                            className="shadow"
                            type="email"
                            placeholder="Type your email"
                          />
                        </Form.Group>
                        <Form.Group controlId="formGridEmail">
                          <Button className="shadow" variant="outline-dark">
                            Join now
                          </Button>
                        </Form.Group>
                      </Form.Row>
                    </Form>
                    <div className={styles.titleTextFooter}>
                      <h6>
                        By joining you as a Tickitz member,
                        <br />
                        we will always send you the latest updates via email .
                      </h6>
                    </div>
                  </div>
                </Row>
              </Container>
            </Container>
          </Row>
        </Container>
        <Footer />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  movie: state.movie,
  auth: state.auth,
});

const mapDispatchToProps = { getAllMovie };

export default connect(mapStateToProps, mapDispatchToProps)(Home);
