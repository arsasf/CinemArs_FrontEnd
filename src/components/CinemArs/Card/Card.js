import { Component } from "react";
import { Button, Card } from "react-bootstrap";
import styles from "./Card.module.css";
import { withRouter } from "react-router-dom";

class Cards extends Component {
  handleMovieDetail = (id) => {
    this.props.history.push(`/cinemars/movie-detail/${id}/`);
  };
  render() {
    const { movie_id, movie_name, movie_category, movie_image } =
      this.props.data;
    return (
      <>
        <Card className={`${styles.cardBody} shadow`}>
          <Card.Img
            variant="top"
            src={`${process.env.REACT_APP_IMAGE_URL}${movie_image}`}
            className={styles.cardImage}
          />
          <Card.Body>
            <Card.Title className={styles.title}>{movie_name}</Card.Title>
            <Card.Text className={styles.text}>{movie_category}</Card.Text>
            <Button
              variant="secondary"
              className={styles.detail}
              onClick={() => this.handleMovieDetail(movie_id)}
            >
              Detail
            </Button>
          </Card.Body>
        </Card>
      </>
    );
  }
}

export default withRouter(Cards);
