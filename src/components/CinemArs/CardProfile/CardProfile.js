import { Component } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Image, Button, Modal } from "react-bootstrap";
import imgDefault from "../../../assets/img/img-not-found.png";
import styles from "./CardProfile.module.css";
import { Warning, XSquare, Trash } from "phosphor-react";

import { connect } from "react-redux";
import { deleteImage } from "../../../redux/actions/userProfile";

class CardProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      msg: "",
    };
  }

  handleShow = (param1) => {
    this.setState({
      show: param1,
      msg: `Are you sure to delete image ?`,
    });
  };

  handleSure = (data, event) => {
    const formData = new FormData();
    formData.append("userFirstName", data.user_first_name);
    formData.append("userLastName", data.user_last_name);
    formData.append("userEmail", data.user_email);
    formData.append("userPhoneNumber", data.user_phone_number);
    formData.append("image", "");
    for (var pair of formData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }
    this.props
      .deleteImage(formData)
      .then((res) => {
        this.setState({
          ...this.state,
          show: false,
        });
        this.props.getData();
        this.props.resetData(event);
      })
      .catch((err) => {
        this.setState({
          ...this.state,
          show: false,
        });
        this.props.resetData(event);
        return {};
      });
  };
  render() {
    const { user_first_name, user_last_name, user_role, user_image } =
      this.props.data;
    const { data } = this.props;
    console.log(this.props);
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
                onClick={(event) => this.handleSure(data, event)}
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
        <Row className={styles.rowHeaderCard}>
          <Row className={styles.rowHeaderInfoCard}>
            <Link to="#" className={styles.infoCard}>
              Info
            </Link>
            <Trash
              size={30}
              color="#5f2eea"
              className={styles.iconDelete}
              onClick={() => this.handleShow(true)}
            />
          </Row>
          <Col className={styles.rowHeaderInfoCard2}>
            {user_image === "" ||
            user_image === undefined ||
            user_image === null ? (
              <Image src={imgDefault} className={styles.imageProfile} />
            ) : (
              <Image
                src={`${process.env.REACT_APP_IMAGE_URL}${user_image}`}
                className={styles.imageProfile}
              />
            )}
          </Col>
          <Row className={styles.rowHeaderInfoCard}>
            <Col>
              <Row className={styles.userFullName}>
                {user_first_name} {user_last_name}
              </Row>
              <Row className={styles.userStatus}>{user_role}</Row>
            </Col>
          </Row>
        </Row>
      </>
    );
  }
}

const mapDispatchToProps = {
  deleteImage,
};

export default connect(null, mapDispatchToProps)(CardProfile);
