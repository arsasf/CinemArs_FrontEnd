import { Component } from "react";
import { Link } from "react-router-dom";
import { Row, Dropdown, Col, Image, Button, Modal } from "react-bootstrap";
import styles from "./CardProfile.module.css";
import { Warning, XSquare } from "phosphor-react";

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
      msg: `Are you sure to update ?`,
    });
  };

  handleSure = (data, event) => {
    this.props.handleUpdate(data, event);
    this.setState({
      ...this.state,
      show: false,
    });
  };
  render() {
    const { user_first_name, user_last_name, user_role, user_image } =
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
            <Dropdown className={styles.dropdownSort}>
              <Dropdown.Toggle
                variant="#fff"
                title="sort"
                id="dropdown-basic"
                className={styles.titleSort}
              >
                . . .
              </Dropdown.Toggle>
              <Dropdown.Menu className={styles.menuDropdown}>
                <Dropdown.Item
                  className={styles.listSort}
                  onClick={() => this.handleShow(true)}
                >
                  Update Profile
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Row>
          <Col className={styles.rowHeaderInfoCard2}>
            <Image
              src={`${process.env.REACT_APP_IMAGE_URL}${user_image}`}
              className={styles.imageProfile}
            />
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

export default CardProfile;
