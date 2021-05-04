import { Component } from "react";
import { Button, Card } from "react-bootstrap";
import styles from "../CinemArs/Card/Card.module.css";
import { withRouter } from "react-router-dom";

class Cards extends Component {
  handleMovieDetail = (id) => {
    // [1]  = digunakan unruk handleing pagination, search, sort
    // this.props.history.push(`/learning/basic-movie-detail?movieId=${id}`);
    // [2] = jika rasanya datanya tidak mau ditampilkan di url
    // this.props.history.push(`/learning/basic-movie-detail?movieId`, {
    //   data: id,
    // });
    // [3]  = bisa dogunakan untuk detail product/data
    // this.props.history.push(`/learning/basic-movie-detail/${id}`);
  };
  render() {
    console.log(this.props.data);
    // console.log(this.state);
    const {
      movie_id,
      movie_name,
      movie_category,
      movie_release_date,
    } = this.props.data;
    const { handleUpdate, handleDelete, data } = this.props;
    return (
      <>
        <Card style={{ width: "18rem" }} className={styles.cardBody}>
          <Card.Img
            variant="top"
            src="https://a1hosting.net/wp-content/themes/arkahost/assets/image/default.jpg"
          />
          <Card.Body>
            <Card.Title>{movie_name}</Card.Title>
            <Card.Text>{movie_category}</Card.Text>
            <p>{movie_release_date}</p>
            <Button
              variant="secondary"
              onClick={() => this.handleMovieDetail(movie_id)}
            >
              Detail
            </Button>
            <Button variant="primary" onClick={() => handleUpdate(data)}>
              Update
            </Button>
            <Button variant="danger" onClick={() => handleDelete(movie_id)}>
              Delete
            </Button>
          </Card.Body>
        </Card>
      </>
    );
  }
}

export default withRouter(Cards);
