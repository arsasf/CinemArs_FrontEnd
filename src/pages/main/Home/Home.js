import React, { Component } from "react";
import axiosApiIntances from "../../../utils/axios";
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
      form: {
        movieId: "",
        movieName: "",
        movieCategory: "",
        movieImg: "",
        movieReleaseDate: "",
      },
      data: [],
      dataNowMonth: [],
      dataMonth: [],
      dataUpcoming: [],
      pagination: {},
      paginationUpcoming: {},
      page: 1,
      limit: 5,
      limitShowing: 5,
      sort: "movie_id ASC",
      searchByName: "",
      month: "month(now())",
      monthUpcoming: "month(now())",
      isClick: false,
      id: "",
    };
  }

  componentDidMount() {
    this.handleMovieUpcomingClick();
    this.getData();
    this.getDataNowMonth();
  }

  getData = () => {
    console.log("Get Data !");
    const { page, limit, sort, searchByName, monthUpcoming } = this.state;
    axiosApiIntances
      .get(
        `movie?page=${page}&limit=${limit}&sort= ${sort}&searchByName=${searchByName}&month=${monthUpcoming}`
      )
      .then((res) => {
        console.log(res.data.data);
        this.setState({
          data: res.data.data,
          paginationUpcoming: res.data.pagination,
        });
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  getDataNowMonth = () => {
    console.log("Get Data !");
    const { page, limit, sort, searchByName, month } = this.state;
    axiosApiIntances
      .get(
        `movie?page=${page}&limit=${limit}&sort= ${sort}&searchByName=${searchByName}&month=${month}`
      )
      .then((res) => {
        this.setState({
          dataNowMonth: res.data.data,
          pagination: res.data.pagination,
        });
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  handleMovieShowingClick = () => {
    this.setState(
      {
        ...this.state.from,
        limit: 5,
        month: "month(now())",
      },
      () => {
        this.getDataNowMonth();
      }
    );
  };

  handleMovieShowingAllClick = (event, totalDataShowing) => {
    event.preventDefault();
    this.setState(
      {
        ...this.state.from,
        limit: totalDataShowing,
        month: "month(now())",
      },
      () => {
        this.getDataNowMonth();
      }
    );
  };

  handleMovieUpcomingClick = () => {
    this.setState(
      {
        ...this.state.from,
        monthUpcoming: 5,
        limit: 5,
      },
      () => {
        this.getData();
      }
    );
  };

  handleMovieUpcomingAllClick = (event, totalDataUpcoming) => {
    event.preventDefault();
    this.setState(
      {
        ...this.state.from,
        limit: totalDataUpcoming,
      },
      () => {
        this.getData();
      }
    );
  };

  handleMovieUpcomingMonthClick = (params) => {
    this.setState(
      {
        ...this.state.from,
        monthUpcoming: params,
        limit: 5,
        data: [],
      },
      () => {
        this.getData();
      }
    );
  };

  render() {
    console.log(this.state.month);
    console.log(this.state.monthUpcoming);
    const totalDataShowing = this.state.pagination.totalData;
    const totalDataUpcoming = this.state.paginationUpcoming.totalData;

    return (
      <>
        <NavBar />
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
                    <Link
                      to="#"
                      className={styles.titleShowingText}
                      onClick={() => this.handleMovieShowingClick()}
                    >
                      Now Showing
                    </Link>
                    <span className={styles.activeBar}></span>
                  </Row>
                  <Link
                    to="#"
                    onClick={(event) =>
                      this.handleMovieShowingAllClick(event, totalDataShowing)
                    }
                    className={styles.viewAllShowing}
                  >
                    View All
                  </Link>
                </Row>
                <Row className={styles.rowCardImage}>
                  {this.state.dataNowMonth.map((item, index) => {
                    return (
                      <Col md={2} key={index} className={styles.colCardImage}>
                        <CardImage dataNowMonth={item} />
                      </Col>
                    );
                  })}
                </Row>
              </Container>
            </Container>
            {/* Content-3 */}
            <Container fluid className={styles.containerContent3}>
              <Container className={styles.containerForm}>
                <Row className={styles.showingText} sticky="top">
                  <Link
                    className={styles.titleUpcomingText}
                    to="#"
                    onClick={() => this.handleMovieUpcomingClick()}
                  >
                    Upcoming Movies
                  </Link>
                  <Link
                    to="#"
                    onClick={(event) =>
                      this.handleMovieUpcomingAllClick(event, totalDataUpcoming)
                    }
                    className={styles.viewAll}
                  >
                    View All
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
                  </ToggleButtonGroup>
                </Row>
                <Row className={styles.rowCard}>
                  {this.state.data.map((item, index) => {
                    return (
                      <Col md={2} key={index} className={styles.colCard}>
                        <Cards data={item} />
                      </Col>
                    );
                  })}
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

export default Home;
