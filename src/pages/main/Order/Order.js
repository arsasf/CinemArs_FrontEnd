import { Component } from "react";
import NavBar from "../../../components/CinemArs/Navbar/Navbar";
import Footer from "../../../components/CinemArs/Footer/Footer";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import styles from "./Order.module.css";
import Seat from "../../../components/CinemArs/Seat/Seat";
import { getBooking, getBookingSeat } from "../../../redux/actions/order";
import { connect } from "react-redux";

class Order extends Component {
  constructor() {
    super();
    this.state = {
      selectedSeat: localStorage.getItem("booking")
        ? localStorage.getItem("booking").split(",")
        : [],
      reservedSeat: [],
      data: {},
      seat: [],
    };
  }

  componentDidMount() {
    this.getDataBooking();
    this.getDataBookingSeat();
  }

  getDataBookingSeat = () => {
    this.props
      .getBookingSeat()
      .then((res) => {
        console.log(res);
        let seat = [];
        res.value.data.data
          .map((e) => {
            return seat.push(e.booking_set_location);
          })
          .concat();

        this.setState({
          ...this.state,
          reservedSeat: seat,
        });
      })
      .catch((err) => {
        console.log(err);
        if (err) {
          return [];
        }
      });
  };

  getDataBooking = () => {
    const form = {
      movieId: localStorage.getItem("movie_id"),
      premiereId: localStorage.getItem("premiere_id"),
      showTimeId: localStorage.getItem("show_time_id"),
    };
    console.log(form);
    this.props
      .getBooking(form.movieId, form.premiereId, form.showTimeId)
      .then((res) => {
        console.log(res);
        this.setState({
          ...this.state,
          data: res.value.data.data[0],
        });
      })
      .catch((err) => {
        console.log(err);
        if (err) {
          return [];
        }
      });
  };
  bookingSeat = (seat) => {
    if (this.state.reservedSeat.includes(seat) === true) {
      console.log("");
    } else if (this.state.selectedSeat.includes(seat) === false) {
      this.setState({
        selectedSeat: [...this.state.selectedSeat, seat],
      });
    } else {
      this.setState({
        selectedSeat: [seat],
      });
    }

    console.log(seat);
  };

  booking = () => {
    console.log("booking");
    const booking = this.state.selectedSeat;
    this.setState({
      ...this.state,
      seat: this.state.selectedSeat,
    });
    localStorage.setItem("booking", booking);
    if (booking.length > 0) {
      this.props.history.push("/payment");
    }
  };

  hanldeResetSeat = () => {
    this.setState({
      selectedSeat: [],
    });
    localStorage.removeItem("booking");
  };

  handleChangeMovie = () => {
    localStorage.removeItem("movie_id");
    localStorage.removeItem("premiere_id");
    localStorage.removeItem("show_time_id");
    localStorage.removeItem("booking");
    this.props.history.push("/cinemars/home");
  };

  render() {
    console.log(this.state.reservedSeat);
    const totalPrice =
      this.state.selectedSeat.length * parseInt(this.state.data.premiere_price);
    const formatDate = (dateString) => {
      const options = { year: "numeric", month: "long", day: "numeric" };
      return new Date(dateString).toLocaleDateString(undefined, options);
    };
    const formatDay = (dateString) => {
      const options = { weekday: "long" };
      return new Date(dateString).toLocaleDateString(undefined, options);
    };
    const { reservedSeat, selectedSeat, data } = this.state;
    return (
      <>
        <NavBar />
        <section as={Container} fluid="true" className={styles.orderPage}>
          <Container className={styles.sectionAsideCombine}>
            <Row>
              {/*Kolom Conten Kiri Halaman */}
              <Col lg={8} md={12} sm={12} xs={12} className={styles.colLeft}>
                {/* <!-- ===========Content Movie ============== --> */}
                <Container className={styles.contentLeft1}>
                  <Col className={styles.rowContent1Left1}>
                    <Row className={styles.titleContentLeft1}>
                      Movie Selected
                    </Row>
                  </Col>
                </Container>
                <Container className={styles.contentLeft1}>
                  <Col lg={12} className={styles.rowContent2Left1}>
                    <Row className={styles.titleContentLeft1}>
                      {data.movie_name}
                    </Row>
                    <Row>
                      <Button
                        type="button"
                        variant="light"
                        className={styles.buttonChange}
                        onClick={() => this.handleChangeMovie()}
                      >
                        Change Movie
                      </Button>
                    </Row>
                  </Col>
                </Container>
                <Container className={styles.contentLeft1}>
                  <Col className={styles.rowContent3Left1}>
                    <Row className={styles.titleContentLeft1}>
                      Choose Your Seat
                    </Row>
                  </Col>
                </Container>
                {/* Content Seat*/}
                <Container className={styles.contentLeft2}>
                  <Col className={styles.boxContentLeft2}>
                    <Row className={styles.rowContent1Left2}>
                      <Col className={styles.titleContent1Left2}>Screen</Col>
                      <span className={styles.line}></span>
                    </Row>
                    <Row className={styles.rowContent2Left2}>
                      <Col className={styles.titleContent2Left2}>
                        <Seat
                          seatAlphabet="A"
                          reserved={reservedSeat}
                          selected={selectedSeat}
                          bookingSeat={this.bookingSeat.bind(this)}
                        />
                        <Seat
                          className={styles.seat}
                          seatAlphabet="B"
                          reserved={reservedSeat}
                          selected={selectedSeat}
                          bookingSeat={this.bookingSeat.bind(this)}
                        />
                        <Seat
                          seatAlphabet="C"
                          reserved={reservedSeat}
                          selected={selectedSeat}
                          bookingSeat={this.bookingSeat.bind(this)}
                        />
                        <Seat
                          seatAlphabet="D"
                          reserved={reservedSeat}
                          selected={selectedSeat}
                          bookingSeat={this.bookingSeat.bind(this)}
                        />
                        <Seat
                          seatAlphabet="E"
                          reserved={reservedSeat}
                          selected={selectedSeat}
                          bookingSeat={this.bookingSeat.bind(this)}
                        />
                        <Seat
                          seatAlphabet="F"
                          reserved={reservedSeat}
                          selected={selectedSeat}
                          bookingSeat={this.bookingSeat.bind(this)}
                        />
                        <Seat
                          seatAlphabet="G"
                          reserved={reservedSeat}
                          selected={selectedSeat}
                          bookingSeat={this.bookingSeat.bind(this)}
                        />
                        <Seat
                          seatAlphabet="0"
                          reserved={reservedSeat}
                          selected={selectedSeat}
                        />
                      </Col>
                      <div className={styles.boxSeatingKey}>
                        <h5>
                          <b>Seating Key</b>
                        </h5>
                        <Col className={styles.rowBoxSeat}>
                          <div className={styles.boxSeat}>
                            <div className={styles.seatAvailable}></div>
                            <h6>Available</h6>
                          </div>
                          <div className={styles.boxSeat}>
                            <div className={styles.seatSelected}></div>
                            <h6>Selected</h6>
                          </div>
                          <div className={styles.boxSeat}>
                            <div className={styles.seatSold}></div>
                            <h6>Sold</h6>
                          </div>
                        </Col>
                      </div>
                    </Row>
                  </Col>
                </Container>

                {/* Content Choose Order */}
                <Container className={styles.content3}>
                  <Col className={`${styles.checkout} d-lg-flex d-sm-grid`}>
                    <Button
                      type="button"
                      variant="dark"
                      className={`${styles.btnChange1}`}
                      onClick={() => this.hanldeResetSeat()}
                    >
                      Reset seat
                    </Button>
                    <Button
                      type="button"
                      variant="dark"
                      className={`${styles.btnCheckout} shadow`}
                      onClick={() => this.booking(totalPrice)}
                    >
                      {selectedSeat.length > 0
                        ? "Booking now"
                        : "Choose your seat"}
                    </Button>
                  </Col>
                </Container>
              </Col>
              {/* <!-- Akhir Content3================= --> */}
              {/* <!-- Akhir section ================= --> */}

              {/* <!-- =====================Content4 aside================== --> */}

              <Col lg={4} md={12} sm={12} xs={12} className={styles.colLeft}>
                <Container fluid="true" className={styles.content4}>
                  <Container className={styles.cont41}>
                    <h1 className={styles.infoOrder}>Order Info</h1>
                  </Container>
                  <Container className={styles.boxOrderInfo}>
                    <Card
                      className={`${styles.payment} d-grid justify-content-around`}
                    >
                      <div className={styles.boxTheater}>
                        <Card.Img
                          className={styles.nameTheater}
                          src={`${process.env.REACT_APP_IMAGE_URL}${data.premiere_image}`}
                          alt=""
                        />
                        <h1 className={styles.textTheater}>
                          {data.premiere_name} Cinema
                        </h1>
                      </div>
                      <div
                        className={`${styles.nameMovie} d-flex justify-content-between`}
                      >
                        <h5 className={styles.textMovie}>Movie selected</h5>
                        <h6 className={styles.textInfo}>{data.movie_name}</h6>
                      </div>
                      <div
                        className={`${styles.dateMovie} d-flex justify-content-between`}
                      >
                        <h5>
                          {formatDay(data.show_time_date)},{" "}
                          {formatDate(data.show_time_date)}
                        </h5>
                        <h6>{data.show_time_clock}</h6>
                      </div>
                      <div
                        className={`${styles.priceTicket} d-flex justify-content-between`}
                      >
                        <h5>One ticket price</h5>
                        <h6>${data.premiere_price}</h6>
                      </div>
                      <div
                        className={`${styles.seatChoosed} d-flex justify-content-between`}
                      >
                        <h5>Seat choosed</h5>
                        <h6>
                          {this.state.selectedSeat.map((e) => {
                            return e;
                          })}
                        </h6>
                      </div>
                      <span></span>
                      <div
                        className={`${styles.totalPayment} d-flex justify-content-between`}
                      >
                        <h1>Total Payment</h1>
                        <h6>${totalPrice}</h6>
                      </div>
                    </Card>
                  </Container>
                </Container>
              </Col>
              {/* <!-- Akhir Content4 aside=================== --> */}
            </Row>
          </Container>
        </section>
        <Footer />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  movie: state.movie,
  auth: state.auth,
  premiere: state.premiere,
  order: state.order,
});

const mapDispatchToProps = { getBooking, getBookingSeat };

export default connect(mapStateToProps, mapDispatchToProps)(Order);
