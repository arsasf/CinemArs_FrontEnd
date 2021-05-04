import { Component } from "react";
// import { Link } from "react-router-dom";
import NavBar from "../../../components/CinemArs/Navbar/Navbar";
import Footer from "../../../components/CinemArs/Footer/Footer";
import {
  Container,
  Row,
  Col,
  Button,
  // ButtonGroup,
  Card,
} from "react-bootstrap";
import styles from "./Order.module.css";
import Seat from "../../../components/CinemArs/Seat/Seat";

class Order extends Component {
  constructor() {
    super();
    this.state = {
      selectedSeat: [],
      reservedSeat: ["A1", "A7", "A14"],
    };
  }

  bookingSeat = (seat) => {
    this.setState({
      selectedSeat: [...this.state.selectedSeat, seat],
    });
    console.log(seat);
  };

  booking = () => {
    console.log("booking");
    const booking = JSON.stringify(this.state.selectedSeat);
    localStorage.setItem("bookingSeat", booking);
  };

  render() {
    const { reservedSeat, selectedSeat } = this.state;
    return (
      <>
        <NavBar />
        <section as={Container} fluid="true" className={styles.orderPage}>
          <Container className={styles.sectionAsideCombine}>
            <Row>
              {/*Kolom Conten Kiri Halaman */}
              <Col lg={8} className={styles.colLeft}>
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
                      Spider-Man: Homecoming
                    </Row>
                    <Row>
                      <Button type="button" className={styles.buttonChange}>
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
                  <Row className={styles.rowContent1Left2}>
                    <Col className={styles.titleContent1Left2}>Screen</Col>
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
                    </Col>
                  </Row>
                  <Row className={styles.rowContent2Left2}>
                    <Col className={styles.titleContent2Left2}>
                      <Row className={styles.setAngkaSeat}>
                        <Col className={styles.seat}></Col>
                        <Col className={styles.seat}>1</Col>
                        <Col className={styles.seat}>2</Col>
                        <Col className={styles.seat}>3</Col>
                        <Col className={styles.seat}>4</Col>
                        <Col className={styles.seat}>5</Col>
                        <Col className={styles.seat}>6</Col>
                        <Col className={styles.seat}>7</Col>
                        <Col className={styles.seat}></Col>
                        <Col className={styles.seat}>8</Col>
                        <Col className={styles.seat}>9</Col>
                        <Col className={styles.seat}>10</Col>
                        <Col className={styles.seat}>11</Col>
                        <Col className={styles.seat}>12</Col>
                        <Col className={styles.seat}>13</Col>
                        <Col className={styles.seat}>14</Col>
                      </Row>
                    </Col>
                  </Row>
                  <Row>
                    <Col className={styles.titleContent1Left2}>
                      <Button
                        variant="primary"
                        size="md"
                        block
                        onClick={this.booking}
                      >
                        Booking
                      </Button>
                    </Col>
                  </Row>
                </Container>

                {/* Content Choose Order */}
                <Container className={styles.content3}>
                  <Row className={`${styles.checkout} d-lg-flex d-sm-grid`}>
                    <Button type="button" className={`${styles.btnChange1}`}>
                      Change your movie
                    </Button>
                    <Button
                      type="button"
                      className={`${styles.btnCheckout} shadow`}
                    >
                      Checkout now
                    </Button>
                  </Row>
                </Container>
              </Col>
              {/* <!-- Akhir Content3================= --> */}
              {/* <!-- Akhir section ================= --> */}

              {/* <!-- =====================Content4 aside================== --> */}

              <Col lg={4}>
                <Container fluid="true" className={styles.content4}>
                  <Container className={styles.cont41}>
                    <h1 className={styles.infoOrder}>Order Info</h1>
                  </Container>
                  <Container>
                    <Card
                      className={`${styles.payment} d-grid justify-content-around shadow`}
                    >
                      <Card.Body>
                        <Card.Img
                          className={styles.nameTheater}
                          src="https://cinemarsticketbooking.netlify.app/img/[V1]%20-%20Movie%20Details/Vector.png"
                          alt=""
                        />
                        <Card.Title>
                          <h1>CineOne21 Cinema</h1>
                        </Card.Title>
                      </Card.Body>
                      <div
                        className={`${styles.nameMovie} d-flex justify-content-between`}
                      >
                        <h5>Movie selected</h5>
                        <h6>Spider-man: Homecoming</h6>
                      </div>
                      <div
                        className={`${styles.dateMovie} d-flex justify-content-between`}
                      >
                        <h5>Tuesday, 07 July 2020</h5>
                        <h6>02:00pm</h6>
                      </div>
                      <div
                        className={`${styles.priceTicket} d-flex justify-content-between`}
                      >
                        <h5>One ticket price</h5>
                        <h6>$10</h6>
                      </div>
                      <div
                        className={`${styles.seatChoosed} d-flex justify-content-between`}
                      >
                        <h5>Seat choosed</h5>
                        <h6>C4,C5,C6</h6>
                      </div>
                      <span></span>
                      <div
                        className={`${styles.totalPayment} d-flex justify-content-between`}
                      >
                        <h1>Total Payment</h1>
                        <h6>$30</h6>
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

export default Order;
