import { Component } from "react";
import { Card, Button } from "react-bootstrap";
import styles from "./Bioskop.module.css";
import { Link, withRouter } from "react-router-dom";

class Bioskop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showTime: "",
      index: null,
    };
  }
  handleSetTime = (show_time_id, movie_id, premiere_id, index, iShowTimes) => {
    this.props.handleChoose(index);
    this.setState({
      showTime: show_time_id,
      index: iShowTimes,
    });
    localStorage.setItem("movie_id", movie_id);
    localStorage.setItem("premiere_id", premiere_id);
    localStorage.setItem("show_time_id", show_time_id);
  };

  render() {
    let {
      premiere_id,
      premiere_name,
      location_address,
      premiere_price,
      premiere_image,
      show_time_clock,
    } = this.props.dataPremiere;
    const { movie_id } = this.props.data;
    return (
      <>
        <Card className={`${styles.card} shadow`}>
          <div className={styles.name}>
            <img
              className={styles.logoBioskop}
              src={`${process.env.REACT_APP_IMAGE_URL}${premiere_image}`}
              alt=""
            />
            <div className={styles.address}>
              <h1>{premiere_name}</h1>
              <h6>{location_address}</h6>
            </div>
          </div>
          <span></span>
          <div>
            {show_time_clock.map((e, i) => {
              return (
                <Button
                  key={i}
                  className={
                    this.state.showTime !== "" &&
                    this.props.length === this.props.oldItem &&
                    this.state.index === i
                      ? styles.timeActive
                      : styles.time1
                  }
                  onClick={() =>
                    this.handleSetTime(
                      e.show_time_id,
                      movie_id,
                      premiere_id,
                      this.props.length,
                      i
                    )
                  }
                >
                  {e.show_time_clock}
                </Button>
              );
            })}
          </div>
          <div className={styles.price}>
            <h6>Price</h6>
            <h1>${premiere_price}/Seat</h1>
          </div>
          <div className={styles.booking}>
            <Button
              as={Link}
              to={
                this.state.showTime !== "" &&
                this.props.length === this.props.oldItem
                  ? "/cinemars/order"
                  : `/cinemars/movie-detail/${movie_id}`
              }
              type="button"
              variant="fff"
              className={`${styles.btn1} mb-3 shadow`}
            >
              {this.state.showTime !== "" &&
              this.props.length === this.props.oldItem
                ? "Booking Now"
                : "Choose Schedule"}
            </Button>
          </div>
        </Card>
      </>
    );
  }
}

export default withRouter(Bioskop);
