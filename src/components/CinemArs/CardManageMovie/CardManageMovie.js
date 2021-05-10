import { Component } from "react";
import { Button, Card, Row } from "react-bootstrap";
import styles from "./CardManageMovie.module.css";
import { withRouter } from "react-router-dom";

class CardManageMovie extends Component {
  // handleMovieDetail = (id) => {
  //   this.props.history.push(`/cinemars/manage-movie/${id}`);
  // };
  render() {
    const {
      movie_id,
      movie_name,
      movie_category,
      movie_image,
    } = this.props.data;
    const { handleUpdate, handleDelete, data } = this.props;

    return (
      <>
        <Row className={styles.dataCardMovie}>
          <Card className={`${styles.cardBody} shadow`}>
            <Card.Img
              variant="top"
              src={`http://localhost:3001/api/${movie_image}`}
              className={styles.cardImage}
            />
            <Card.Body>
              <Card.Title className={styles.title}>{movie_name}</Card.Title>
              <Card.Text className={styles.text}>{movie_category}</Card.Text>
              <Card.Text as={Row} className={styles.cardButton}>
                <Button
                  className={styles.update}
                  variant="#fff"
                  onClick={(event) =>
                    window.confirm(
                      `Are you sure you to update ${movie_name} by id ${movie_id}?`
                    ) && handleUpdate(data, event)
                  }
                >
                  Update
                </Button>
              </Card.Text>
              <Card.Text as={Row} className={styles.cardButton}>
                <Button
                  className={styles.delete}
                  variant="#fff"
                  onClick={() =>
                    window.confirm(
                      `Are you sure you to delete ${movie_name} by id ${movie_id}?`
                    ) && handleDelete(movie_id)
                  }
                >
                  Delete
                </Button>
              </Card.Text>
            </Card.Body>
          </Card>
        </Row>
      </>
    );
  }
}

export default withRouter(CardManageMovie);
