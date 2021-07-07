import { Component } from "react";
import { Link } from "react-router-dom";
import { Row, Dropdown, Col, Image } from "react-bootstrap";
import styles from "./CardProfile.module.css";

class CardProfile extends Component {
  render() {
    const { user_first_name, user_last_name, user_role, user_image } =
      this.props.data;
    const { handleUpdate, data } = this.props;
    console.log("ini props");
    console.log(this.props);
    console.log(this.state);
    return (
      <>
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
                  onClick={(event) =>
                    window.confirm(
                      `${user_first_name}, Are you sure to update profile ?`
                    ) && handleUpdate(data, event)
                  }
                >
                  Update Profile
                </Dropdown.Item>
                {/* <Dropdown.Item
                  className={styles.listSort}
                  onClick={() =>
                    window.confirm(
                      `${user_first_name}, Are you sure to delete image profile ?`
                    ) && handleDelete(user_image)
                  }
                >
                  Delete Image
                </Dropdown.Item> */}
              </Dropdown.Menu>
            </Dropdown>
          </Row>
          <Col className={styles.rowHeaderInfoCard2}>
            <Image
              // src="# "
              src={`http://localhost:3001/api/${user_image}`}
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
