import { Component } from "react";
import styles from "./Profile.module.css";
import NavBar from "../../../components/CinemArs/Navbar/Navbar";
import Footer from "../../../components/CinemArs/Footer/Footer";
import { Link } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Toast,
  InputGroup,
} from "react-bootstrap";
import { connect } from "react-redux";
import {
  getUserById,
  updateUser,
  updatePassword,
} from "../../../redux/actions/userProfile";
import CardProfile from "../../../components/CinemArs/CardProfile/CardProfile";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        userFirstName: "",
        userLastName: "",
        userPhoneNumber: "",
        userEmail: "",
        image: "",
        userNewPassword: "",
        userConfirmPassword: "",
      },
      page: 1,
      limit: 4,
      show: false,
      setShow: false,
      id: "",
    };
  }

  componentDidMount() {
    console.log("this get Data running");
    this.getData();
  }

  setShow = (event) => {
    this.setState({
      ...this.state.from,
      show: event,
    });
  };

  getData = () => {
    console.log("Get Data !");
    const id = localStorage.getItem("user_id");
    this.props.getUserById(id);
  };

  resetData = (event) => {
    event.preventDefault();
    this.setState({
      form: {
        userFirstName: "",
        userLastName: "",
        userPhoneNumber: "",
        userNewPassword: "",
        userConfirmPassword: "",
      },
    });
  };

  changeText = (event) => {
    // console.log(typeof event.target.value);
    this.setState({
      form: {
        ...this.state.form,
        [event.target.name]: event.target.value,
      },
    });
  };

  handleImage = (event) => {
    this.setState({
      form: {
        ...this.state.form,
        image: event.target.files[0],
      },
    });
  };

  setUpdate = (data) => {
    console.log("Set Update !");
    console.log(data);
    this.setState({
      isUpdate: true,
      id: data.user_id,
      form: {
        userFirstName: data.user_first_name,
        userLastName: data.user_last_name,
        userEmail: data.user_email,
        userPhoneNumber: data.user_phone_number,
        image: data.user_image,
      },
    });
  };
  updateData = (event) => {
    event.preventDefault();
    console.log("Update Data !");
    const id = localStorage.getItem("user_id");
    this.setState({ isUpdate: false });
    this.resetData(event);
    const formData = new FormData();
    formData.append("userFirstName", this.state.form.userFirstName);
    formData.append("userLastName", this.state.form.userLastName);
    formData.append("userEmail", this.state.form.userEmail);
    formData.append("userPhoneNumber", this.state.form.userPhoneNumber);
    formData.append("image", this.state.form.image);
    for (var pair of formData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }
    this.props
      .updateUser(id, formData)
      .then((res) => {
        console.log("ini res");
        console.log(res);
        this.getData();
        this.resetData();
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  updatePassword = (event) => {
    console.log("update password");
    console.log(event);
    const id = localStorage.getItem("user_id");
    event.preventDefault();
    this.resetData(event);
    console.log(this.state.form);
    const { form } = this.state;
    this.props
      .updatePassword(id, form)
      .then((res) => {
        if (res) {
          alert("please login");
          localStorage.clear();
          window.location.href = "/signin";
        }
        this.resetData();
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  // handlePageClick = (event) => {
  //   const selectedPage = event.selected + 1;
  //   this.setState({ page: selectedPage }, () => {
  //     this.getData();
  //   });
  // };

  render() {
    // console.log(this.props);
    const { data } = this.props.userProfile;
    console.log(this.state.form);
    // // console.log(data[0]);
    return (
      <>
        <NavBar />
        <Container fluid className={styles.profilePage}>
          <Container>
            <Row>
              <Col lg={4} className={styles.left}>
                <Row>
                  <Container className={styles.containerCard}>
                    {data.map((item, index) => {
                      return (
                        <Container
                          key={index}
                          className={styles.containerHeaderCard}
                        >
                          <CardProfile
                            data={item}
                            handleUpdate={this.setUpdate.bind(this)}
                          />
                        </Container>
                      );
                    })}
                  </Container>
                </Row>
              </Col>
              <Col lg={8} className={styles.right}>
                <Row className={styles.biodataForm}>
                  <Container className={styles.containerForm}>
                    <Container className={styles.containerHeader}>
                      <Row className={styles.rowHeader}>
                        <Link to="#" className={styles.linkProfile}>
                          Account Settings
                        </Link>
                        <Link to="#" className={styles.linkProfile}>
                          Order History
                        </Link>
                      </Row>
                    </Container>
                    <Form onSubmit={this.updateData} onReset={this.resetData}>
                      <Col className={styles.colForm}>
                        <Row className={styles.DetailsInformation}>
                          <p className={styles.titleDetailsInformation}>
                            Details Information
                          </p>
                          <span className={styles.line}></span>
                        </Row>
                        <Row className={styles.contentForm}>
                          <Col lg={5}>
                            <Row className={styles.rowFormMovieLeft}>
                              <Form.Group className={styles.form}>
                                <Form.Label
                                  className={styles.titleFormLabelMovie}
                                >
                                  First Name
                                </Form.Label>
                                <Form.Control
                                  className={styles.placeholder}
                                  type="text"
                                  placeholder="Write your first name"
                                  name="userFirstName"
                                  value={this.state.form.userFirstName}
                                  onChange={(event) => this.changeText(event)}
                                />
                              </Form.Group>
                              <Form.Group className={styles.form}>
                                <Form.Label
                                  className={styles.titleFormLabelMovie}
                                >
                                  E-mail
                                </Form.Label>
                                <Form.Control
                                  placeholder="Email-User"
                                  plaintext
                                  readOnly
                                  defaultValue={this.state.form.userEmail}
                                />
                              </Form.Group>
                              <Form.Control
                                className={styles.placeholder}
                                type="file"
                                onChange={(event) => this.handleImage(event)}
                              />
                            </Row>
                          </Col>
                          <Col lg={5}>
                            <Row className={styles.rowFormMovieRight}>
                              <Form.Group className={styles.form}>
                                <Form.Label
                                  className={styles.titleFormLabelMovie}
                                >
                                  Last Name
                                </Form.Label>
                                <Form.Control
                                  type="text"
                                  className={styles.placeholder}
                                  placeholder="Write your last name"
                                  name="userLastName"
                                  value={this.state.form.userLastName}
                                  onChange={(event) => this.changeText(event)}
                                />
                              </Form.Group>
                              <Form.Group className={styles.form}>
                                <Form.Label
                                  className={styles.titleFormLabelMovie}
                                >
                                  Phone Number
                                </Form.Label>
                                <InputGroup>
                                  <InputGroup.Prepend>
                                    <InputGroup.Text
                                      className={styles.codeRegion}
                                    >
                                      +62
                                    </InputGroup.Text>
                                  </InputGroup.Prepend>
                                  <Form.Control
                                    type="text"
                                    className={styles.placeholder}
                                    placeholder="Write your phone number"
                                    name="userPhoneNumber"
                                    value={this.state.form.userPhoneNumber}
                                    onChange={(event) => this.changeText(event)}
                                  />
                                </InputGroup>
                              </Form.Group>
                            </Row>
                          </Col>
                        </Row>
                      </Col>
                      <Row className={styles.rowButton}>
                        <Col>
                          <Button
                            variant="dark"
                            className={`${styles.buttonSubmit} shadow`}
                            type="submit"
                            onClick={() => this.setShow(true)}
                          >
                            Update Changes
                          </Button>
                          <Toast
                            className={styles.createDataToast}
                            onClose={() => this.setShow(false)}
                            show={this.state.show}
                            delay={5000}
                            autohide
                          >
                            <Toast.Header>
                              <strong className="mr-auto">Message !</strong>
                            </Toast.Header>
                            <Toast.Body className={styles.bodyToast}>
                              {this.props.userProfile.msg}
                            </Toast.Body>
                          </Toast>
                        </Col>
                      </Row>
                    </Form>

                    <Form
                      action="/cinemars/manage-movie"
                      onSubmit={this.updatePassword}
                      onReset={this.resetData}
                    >
                      <Col className={styles.colForm}>
                        <Row className={styles.DetailsInformation}>
                          <p className={styles.titleDetailsInformation}>
                            Account and Privacy
                          </p>
                          <span className={styles.line}></span>
                        </Row>
                        <Row className={styles.contentForm}>
                          <Col lg={5}>
                            <Row className={styles.rowFormMovieLeft}>
                              <Form.Group className={styles.form}>
                                <Form.Label
                                  className={styles.titleFormLabelMovie}
                                >
                                  New Password
                                </Form.Label>
                                <Form.Control
                                  className={styles.placeholder}
                                  type="password"
                                  placeholder="Write your new password"
                                  name="userNewPassword"
                                  value={this.state.form.userNewPassword}
                                  onChange={(event) => this.changeText(event)}
                                />
                              </Form.Group>
                            </Row>
                          </Col>
                          <Col lg={5}>
                            <Row className={styles.rowFormMovieRight}>
                              <Form.Group className={styles.form}>
                                <Form.Label
                                  className={styles.titleFormLabelMovie}
                                >
                                  Confirm Password
                                </Form.Label>
                                <Form.Control
                                  type="password"
                                  className={styles.placeholder}
                                  placeholder="Write your confirm password"
                                  name="userConfirmPassword"
                                  value={this.state.form.userConfirmPassword}
                                  onChange={(event) => this.changeText(event)}
                                />
                              </Form.Group>
                            </Row>
                          </Col>
                        </Row>
                      </Col>
                      <Row className={styles.rowButton}>
                        <Col>
                          <Button
                            variant="dark"
                            className={`${styles.buttonSubmit} shadow`}
                            type="submit"
                            onClick={() => this.setShow(true)}
                          >
                            Update Changes
                          </Button>
                          <Toast
                            className={styles.createDataToast}
                            onClose={() => this.setShow(false)}
                            show={this.state.show}
                            delay={5000}
                            autohide
                          >
                            <Toast.Header>
                              <strong className="mr-auto">Message !</strong>
                            </Toast.Header>
                            <Toast.Body className={styles.bodyToast}>
                              {this.props.userProfile.msg}
                            </Toast.Body>
                          </Toast>
                        </Col>
                      </Row>
                    </Form>
                  </Container>
                </Row>
              </Col>
            </Row>
          </Container>
        </Container>
        <Footer />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  userProfile: state.userProfile,
  auth: state.auth,
});

const mapDispatchToProps = {
  getUserById,
  updateUser,
  updatePassword,
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
