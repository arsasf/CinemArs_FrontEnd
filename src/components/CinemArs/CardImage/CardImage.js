import { Component } from "react";
import { Card } from "react-bootstrap";
import styles from "./CardImage.module.css";
import { withRouter } from "react-router-dom";

class CardImage extends Component {
  handleMovieDetail = (id) => {
    this.props.history.push(`/learning/basic-movie-detail/${id}`);
  };
  render() {
    console.log(this.props);
    const { movie_img } = this.props.dataNowMonth;
    return (
      <>
        <Card.Img variant="top" src={movie_img} className={styles.cardImage} />
      </>
    );
  }
}

export default withRouter(CardImage);
