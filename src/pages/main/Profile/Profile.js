import { Component } from "react";
import styles from "./Profile.module.css";
import NavBar from "../../../components/CinemArs/Navbar/Navbar";
import Footer from "../../../components/CinemArs/Footer/Footer";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Toast,
  InputGroup,
  Image,
} from "react-bootstrap";
import { CaretDown, CaretUp, X } from "phosphor-react";
import { connect } from "react-redux";
import {
  getUserById,
  updateUser,
  updatePassword,
} from "../../../redux/actions/userProfile";
import { getBookingHistory } from "../../../redux/actions/order";
import CardProfile from "../../../components/CinemArs/CardProfile/CardProfile";
import { Warning, CheckCircle, XSquare, Pencil } from "phosphor-react";

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
      id: this.props.auth.data.user_id,
      active: false,
      detail: false,
      dataHistory: [],
      error: false,
      msg: "",
      update: false,
    };
  }

  componentDidMount() {
    this.getData();
    this.getDataHistory();
  }

  getData = () => {
    const id = this.state.id;
    this.props.getUserById(id);
  };
  getDataHistory = () => {
    this.props
      .getBookingHistory()
      .then((res) => {
        this.setState({
          ...this.state,
          dataHistory: res.value.data.data,
        });
      })
      .catch((err) => {
        return [];
      });
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
        image: "",
      },
    });
  };

  changeText = (event) => {
    this.setState({
      form: {
        ...this.state.form,
        [event.target.name]: event.target.value,
      },
    });
  };

  handleImage = (event) => {
    console.log(event.target.value.substring(12, 250));
    this.setState({
      form: {
        ...this.state.form,
        image: event.target.files[0],
      },
    });
  };

  setUpdate = (data) => {
    this.setState({
      isUpdate: true,
      id: data.user_id,
      update: true,
      form: {
        userFirstName: data.user_first_name,
        userLastName: data.user_last_name,
        userEmail: data.user_email,
        userPhoneNumber: data.user_phone_number,
        image: data.user_image,
      },
    });
  };

  setDelete = (data) => {
    this.setState({
      isUpdate: true,
      id: data.user_id,
      form: {
        userFirstName: data.user_first_name,
        userLastName: data.user_last_name,
        userEmail: data.user_email,
        userPhoneNumber: data.user_phone_number,
        image: "",
      },
    });
  };
  updateData = (event) => {
    event.preventDefault();
    this.setState({ isUpdate: false });
    this.resetData(event);
    const formData = new FormData();
    formData.append("userFirstName", this.state.form.userFirstName);
    formData.append("userLastName", this.state.form.userLastName);
    formData.append("userEmail", this.state.form.userEmail);
    formData.append("userPhoneNumber", this.state.form.userPhoneNumber);
    formData.append("image", this.state.form.image);
    // for (var pair of formData.entries()) {
    //   console.log(pair[0] + ", " + pair[1]);
    // }
    this.props
      .updateUser(formData)
      .then((res) => {
        this.setState({
          ...this.state,
          show: true,
          error: false,
          msg: "Success Updated !",
          update: false,
        });
        this.getData();
        this.resetData(event);
      })
      .catch((err) => {
        this.setState({
          ...this.state,
          show: true,
          error: true,
          update: false,
          msg: err.response.data.msg,
        });
        this.resetData(event);
        return {};
      });
  };

  updatePassword = (event) => {
    event.preventDefault();
    this.resetData(event);
    const { form } = this.state;
    this.props
      .updatePassword(form)
      .then((res) => {
        if (res) {
          alert("please login");
          localStorage.clear();
          window.location.href = "/signin";
        }
        this.resetData();
      })
      .catch((err) => {
        this.setState({
          ...this.state,
          show: true,
          error: true,
          msg: err.response.data.msg,
        });
        return {};
      });
  };

  handleTab = (param) => {
    this.setState({
      ...this.state,
      active: param,
    });
  };

  handleDetail = (param) => {
    this.setState({
      ...this.state,
      detail: param,
    });
  };

  handleCancel = () => {
    this.setState({
      ...this.state,
      update: false,
      form: {
        userFirstName: "",
        userLastName: "",
        userEmail: "",
        userPhoneNumber: "",
        image: "",
      },
    });
  };

  render() {
    const { data } = this.props.userProfile;
    const formatDate = (dateString) => {
      const options = { year: "numeric", month: "long", day: "numeric" };
      return new Date(dateString).toLocaleDateString(undefined, options);
    };
    return (
      <>
        <Toast
          className={
            this.state.error === false
              ? styles.createDataToast
              : styles.createDataToastError
          }
          onClose={() =>
            this.setState({
              ...this.state,
              show: false,
            })
          }
          show={this.state.show}
          delay={5000}
          autohide
        >
          <Toast.Body className={styles.bodyToast}>
            <div className={styles.boxClose}>
              <XSquare
                size={24}
                color="white"
                onClick={() =>
                  this.setState({
                    ...this.state,
                    show: false,
                  })
                }
                className={styles.iconClose}
              />
            </div>
            {this.state.error === false ? (
              <CheckCircle size={80} color="#34ef53" />
            ) : (
              <Warning size={80} color="red" />
            )}
            {this.state.msg}
          </Toast.Body>
        </Toast>
        <NavBar
          login={true}
          user={this.props.auth.data ? this.props.auth.data : false}
        />
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
                            getData={this.getData.bind(this)}
                            resetData={this.resetData.bind(this)}
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
                        <div
                          className={
                            this.state.active === false
                              ? styles.linkProfileActive
                              : styles.linkProfile
                          }
                          onClick={() => this.handleTab(false)}
                        >
                          Account Settings
                        </div>
                        <div
                          className={
                            this.state.active === true
                              ? styles.orderActive
                              : styles.order
                          }
                          onClick={() => this.handleTab(true)}
                        >
                          Order History
                        </div>
                      </Row>
                    </Container>
                    {this.state.active === false ? (
                      <div>
                        <Form
                          onSubmit={this.updateData}
                          onReset={this.resetData}
                        >
                          <Col className={styles.colForm}>
                            <Row className={styles.DetailsInformation}>
                              <div className={styles.boxDetailsInformation}>
                                <p className={styles.titleDetailsInformation}>
                                  Details Information
                                </p>
                                {this.state.update === false ? (
                                  <Pencil
                                    size={30}
                                    color="#5f2eea"
                                    onClick={() =>
                                      this.setUpdate(
                                        this.props.userProfile.data[0]
                                      )
                                    }
                                    className={styles.iconEdit}
                                  />
                                ) : (
                                  <X
                                    size={30}
                                    color="red"
                                    onClick={() => this.handleCancel()}
                                    className={styles.iconEdit}
                                  />
                                )}
                              </div>
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
                                      onChange={(event) =>
                                        this.changeText(event)
                                      }
                                      required
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
                                    onChange={(event) =>
                                      this.handleImage(event)
                                    }
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
                                      onChange={(event) =>
                                        this.changeText(event)
                                      }
                                      required
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
                                        onChange={(event) =>
                                          this.changeText(event)
                                        }
                                        required
                                      />
                                    </InputGroup>
                                  </Form.Group>
                                </Row>
                              </Col>
                            </Row>
                          </Col>
                          <Row className={styles.rowButton}>
                            <Col>
                              {this.state.update === false ? (
                                ""
                              ) : (
                                <Button
                                  variant="dark"
                                  className={`${styles.buttonSubmit} shadow`}
                                  type="submit"
                                >
                                  Update Changes
                                </Button>
                              )}
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
                                      onChange={(event) =>
                                        this.changeText(event)
                                      }
                                      required
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
                                      value={
                                        this.state.form.userConfirmPassword
                                      }
                                      onChange={(event) =>
                                        this.changeText(event)
                                      }
                                      required
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
                              >
                                Update Changes
                              </Button>
                            </Col>
                          </Row>
                        </Form>
                      </div>
                    ) : (
                      <div className={styles.orderHistory}>
                        {this.state.dataHistory.length > 0 ? (
                          this.state.dataHistory.map((item, index) => {
                            return (
                              <div key={index} className={`${styles.boxOrder}`}>
                                <div className={styles.boxInfo}>
                                  <div>
                                    <h6>
                                      {formatDate(item.booking_created_at)}
                                    </h6>
                                    <h6>{item.movie_name}</h6>
                                  </div>
                                  <Image
                                    src={`${process.env.REACT_APP_IMAGE_URL}${item.premiere_image}`}
                                    alt="logo premiere"
                                    className={styles.logo}
                                  />
                                </div>
                                <hr />
                                <div className={styles.boxDetails}>
                                  <Button
                                    variant="fff"
                                    className={styles.buttonTicket}
                                  >
                                    Ticket Is Active
                                  </Button>
                                  {this.state.detail === false ? (
                                    <div
                                      className={styles.detail}
                                      onClick={() => this.handleDetail(true)}
                                    >
                                      <h5>Show Details</h5>
                                      <CaretDown size={24} color="#414141" />
                                    </div>
                                  ) : (
                                    <div
                                      className={styles.detailClose}
                                      onClick={() => this.handleDetail(false)}
                                    >
                                      <h5>Close Details</h5>
                                      <CaretUp size={24} color="#5f2eea" />
                                    </div>
                                  )}
                                </div>
                                {this.state.detail === true && (
                                  <div>
                                    <hr />
                                    <div className={styles.boxShowDetails}>
                                      <h6>Movie </h6>
                                      <h6>{item.movie_name}</h6>
                                    </div>
                                    <div className={styles.boxShowDetails}>
                                      <h6>Release Date</h6>
                                      <h6>
                                        {formatDate(item.movie_release_date)}
                                      </h6>
                                    </div>
                                    <div className={styles.boxShowDetails}>
                                      <h6>Duration</h6>
                                      <h6>{`${item.movie_duration_hours} ${item.movie_duration_minutes}`}</h6>
                                    </div>
                                    <div className={styles.boxShowDetails}>
                                      <h6>Premiere</h6>
                                      <h6>{item.premiere_name}</h6>
                                    </div>
                                    <div className={styles.boxShowDetails}>
                                      <h6>Location Premiere</h6>
                                      <h6>{item.location_address}</h6>
                                    </div>
                                    <div className={styles.boxShowDetails}>
                                      <h6>Schedule</h6>
                                      <h6>{`${formatDate(
                                        item.show_time_date
                                      )} ${item.show_time_clock} `}</h6>
                                    </div>
                                    <div className={styles.boxShowDetails}>
                                      <h6>Method Payment</h6>
                                      <h6>{item.booking_payment_method}</h6>
                                    </div>
                                    <div className={styles.boxShowDetails}>
                                      <h6>Total Tickets</h6>
                                      <h6>{item.booking_ticket} Pieces</h6>
                                    </div>
                                    <div className={styles.boxShowDetails}>
                                      <h6>Total Prices</h6>
                                      <h6>${item.booking_total_price}</h6>
                                    </div>
                                    <div className={styles.boxShowDetails}>
                                      <h6>Booking Status</h6>
                                      <h6>{item.booking_status}</h6>
                                    </div>
                                    <div className={styles.boxShowDetails}>
                                      <h6>Booking Created</h6>
                                      <h6>
                                        {formatDate(item.booking_created_at)}
                                      </h6>
                                    </div>
                                  </div>
                                )}
                              </div>
                            );
                          })
                        ) : (
                          <div className={styles.notFound}>
                            Sorry, <br /> Order history not available...
                          </div>
                        )}
                      </div>
                    )}
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
  order: state.order,
});

const mapDispatchToProps = {
  getUserById,
  updateUser,
  updatePassword,
  getBookingHistory,
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
