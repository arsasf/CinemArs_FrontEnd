import { Component } from "react";
import { Container, Col, Image, Row } from "react-bootstrap";
import styles from "./CardMovie.module.css";
import { withRouter } from "react-router-dom";

class CardMovie extends Component {
  render() {
    const formatDate = (dateString) => {
      const options = { year: "numeric", month: "long", day: "numeric" };
      return new Date(dateString).toLocaleDateString(undefined, options);
    };
    const {
      movie_image,
      movie_name,
      movie_category,
      movie_release_date,
      movie_duration,
      movie_directed_by,
      movie_casts,
      movie_synopsis,
    } = this.props.data;

    return (
      <>
        <Container className={styles.content1}>
          <Row className={styles.row}>
            <Col lg={4} className={styles.left}>
              <div className="img-details">
                <Image
                  className={`${styles.imgThumbnail} img-thumbnail`}
                  src={`${process.env.REACT_APP_IMAGE_URL}${movie_image}`}
                  alt=""
                />
              </div>
            </Col>
            <Col lg={8} className={styles.right}>
              <Row
                className={`${styles.detailsMovie} d-flex justify-content-between m-5`}
              >
                <div className={`${styles.detailsContent} d-grid`}>
                  <div className={`${styles.detailsTitle} mb-3`}>
                    <h1>{movie_name}</h1>
                    <h6>{movie_category}</h6>
                  </div>
                  <div className={`${styles.detailsTimeActor} d-flex mb-3`}>
                    <div className={styles.dateDuration}>
                      <h6>Release date</h6>
                      <h1>{formatDate(movie_release_date)}</h1>
                      <h6>Duration</h6>
                      <h1>{movie_duration}</h1>
                    </div>
                    <div className={styles.actor}>
                      <h6>Directed by</h6>
                      <h1>{movie_directed_by}</h1>
                      <h6>Casts</h6>
                      <h1>{movie_casts}</h1>
                    </div>
                  </div>
                  <hr />
                  <span></span>
                  <div className={`${styles.synopsis} mt-3`}>
                    <h1>Synopsis</h1>
                    <h6>{movie_synopsis}</h6>
                  </div>
                </div>
              </Row>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default withRouter(CardMovie);
