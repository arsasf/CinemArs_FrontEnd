import { Component } from "react";
import { Card, Button } from "react-bootstrap";
import styles from "./Bioskop.module.css";
import { withRouter } from "react-router-dom";

class Bioskop extends Component {
  render() {
    let {
      premiere_name,
      location_address,
      premiere_price,
      premiere_img,
    } = this.props.dataPremiere;
    console.log(this.props);

    return (
      <>
        <Card className={styles.card}>
          <div className={styles.name}>
            <img className={styles.logoBioskop} src={premiere_img} alt="" />
            <div className={styles.address}>
              <h1>{premiere_name}</h1>
              <h6>{location_address}</h6>
            </div>
          </div>
          <span></span>
          <div>
            {this.props.dataPremiere.show_time_clock.split(", ").map((e, i) => {
              return (
                <Button key={i} className={styles.time1}>
                  {e}
                </Button>
              );
            })}
          </div>
          <div className={styles.price}>
            <h6>Price</h6>
            <h1>{premiere_price}/Seat</h1>
          </div>
          <div className={styles.booking}>
            <Button type="button" className={`${styles.btn1} mb-3 shadow`}>
              Book Now
            </Button>
          </div>
        </Card>
      </>
    );
  }
}

export default withRouter(Bioskop);
