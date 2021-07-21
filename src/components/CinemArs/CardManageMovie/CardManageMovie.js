import { Component } from "react";
import { Button, Card, Row, Modal } from "react-bootstrap";
import styles from "./CardManageMovie.module.css";
import { withRouter } from "react-router-dom";
import { Warning, XSquare } from "phosphor-react";

class CardManageMovie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      msg: "",
      change: "",
      id: 0,
    };
  }

  handleShow = (param1, param2, param3, param4) => {
    this.setState({
      show: param1,
      msg: `Are you sure to ${param3} ${param2} ?`,
      change: param3,
      id: param4,
    });
  };

  handleSure = (data, event, param) => {
    if (param === "update") {
      this.props.handleUpdate(data, event);
      this.setState({
        ...this.state,
        show: false,
      });
    } else {
      this.props.handleDelete(this.state.id, event);
      this.setState({
        ...this.state,
        show: false,
      });
    }
  };
  render() {
    const { movie_id, movie_name, movie_category, movie_image } =
      this.props.data;
    const { data } = this.props;

    return (
      <>
        <Modal
          show={this.state.show}
          onHide={() => this.handleShow(false)}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Body className={styles.modalBody}>
            <div className={styles.boxClose}>
              <XSquare
                size={24}
                color="white"
                className={styles.iconClose}
                onClick={() => this.handleShow(false)}
              />
            </div>
            <Warning size={60} color="yellow" />
            {this.state.msg}
            <div className={styles.boxThumbs}>
              <Button
                variant="light"
                className={styles.buttonSure}
                onClick={(event) =>
                  this.handleSure(data, event, this.state.change)
                }
              >
                Sure
              </Button>
              <Button
                variant="dark"
                className={styles.buttonCancel}
                onClick={() => this.handleShow(false)}
              >
                Cancel
              </Button>
            </div>
          </Modal.Body>
        </Modal>
        <Card className={`${styles.cardBody} shadow`}>
          <Card.Img
            variant="top"
            src={`${process.env.REACT_APP_IMAGE_URL}${movie_image}`}
            className={styles.cardImage}
          />
          <Card.Body>
            <Card.Title className={styles.title}>{movie_name}</Card.Title>
            <Card.Text className={styles.text}>{movie_category}</Card.Text>
            <Card.Text as={Row} className={styles.cardButton}>
              <Button
                className={styles.update}
                variant="#fff"
                onClick={() => this.handleShow(true, movie_name, "update")}
              >
                Update
              </Button>
            </Card.Text>
            <Card.Text as={Row} className={styles.cardButton}>
              <Button
                className={styles.delete}
                variant="#fff"
                onClick={() =>
                  this.handleShow(true, movie_name, "delete", movie_id)
                }
              >
                Delete
              </Button>
            </Card.Text>
          </Card.Body>
        </Card>
      </>
    );
  }
}

export default withRouter(CardManageMovie);
