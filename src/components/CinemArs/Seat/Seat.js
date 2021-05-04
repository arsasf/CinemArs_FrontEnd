import React, { Component } from "react";
import styles from "./Seat.module.css";
import { Row, Col } from "react-bootstrap";

class Seat extends Component {
  constructor() {
    super();
    this.state = {
      seatA: [1, 2, 3, 4, 5, 6, 7],
      seatB: [8, 9, 10, 11, 12, 13, 14],
    };
  }

  componentDidMount() {
    this.setAlphabetSeat();
  }

  setAlphabetSeat = () => {
    const { seatAlphabet } = this.props;
    const seatA = this.state.seatA.map((item) => `${seatAlphabet}${item}`);
    const seatB = this.state.seatB.map((item) => `${seatAlphabet}${item}`);
    this.setState({
      seatA: seatA,
      seatB: seatB,
    });
  };

  render() {
    const { seatAlphabet, selected, reserved, bookingSeat } = this.props;
    console.log(this.state);
    console.log(this.props.seatAngka);
    return (
      <>
        <Row className={styles.rowSeat}>
          <Col className={styles.colSeat}>{seatAlphabet}</Col>
          <Col></Col>
          {this.state.seatA.map((item, index, e) => {
            return (
              <Col className={styles.colSeat} key={index}>
                <div
                  onClick={() => bookingSeat(item)}
                  className={`${styles.seat} ${
                    reserved.indexOf(item) > -1
                      ? styles.seatSold
                      : selected.indexOf(item) > -1
                      ? styles.seatSelected
                      : styles.seatAvailable
                  }`}
                ></div>
              </Col>
            );
          })}

          <span></span>
          {this.state.seatB.map((item, index) => {
            return (
              <Col className={styles.colSeat} key={index}>
                <div
                  onClick={() => bookingSeat(item)}
                  className={`${styles.seat} ${
                    reserved.indexOf(item) > -1
                      ? styles.seatSold
                      : selected.indexOf(item) > -1
                      ? styles.seatSelected
                      : styles.seatAvailable
                  }`}
                ></div>
              </Col>
            );
          })}
        </Row>
      </>
    );
  }
}

export default Seat;
