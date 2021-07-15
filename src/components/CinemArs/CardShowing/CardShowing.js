import { Component } from "react";
import { Button, Card } from "react-bootstrap";
import styles from "./CardShowing.module.css";
import { withRouter } from "react-router-dom";

class Cards extends Component {
  handleMovieDetail = (id) => {
    this.props.history.push(`/cinemars/movie-detail/${id}`);
  };
  render() {
    const { movie_id, movie_name, movie_category, movie_image } =
      this.props.data;
    return (
      <>
        <Card className={`${styles.cardBody} `}>
          <Card.Img
            variant="top"
            src={`http://localhost:3001/api/${movie_image}`}
            className={styles.cardImage}
          />
          <Card.Body className={styles.cardContent}>
            <Card.Title className={styles.title}>{movie_name}</Card.Title>
            <Card.Text className={styles.text}>{movie_category}</Card.Text>
            <Card></Card>
            <Card>
              <Button
                className={styles.bookingShowing}
                onClick={() => this.handleMovieDetail(movie_id)}
              >
                Book Now
              </Button>
            </Card>
          </Card.Body>
        </Card>
      </>
    );
  }
}

export default withRouter(Cards);
