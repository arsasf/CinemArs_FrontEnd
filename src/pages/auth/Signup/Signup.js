import { Component } from "react";
import {
  Col,
  Container,
  Form,
  Row,
  Button,
  Image,
  ToggleButtonGroup,
  ToggleButton,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "./Signup.module.css";
import google from "../../../assets/img/google.png";
import facebook from "../../../assets/img/facebook.png";
import background from "../../../assets/img/full-background-avangers.png";
import tickitz from "../../../assets/img/logo_signIn.png";
import tickitz2 from "../../../assets/img/Tickitz.png";
import { connect } from "react-redux";
import { register } from "../../../redux/actions/auth";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        userName: "",
        userEmail: "",
        userPassword: "",
      },
    };
  }

  changeText = (event) => {
    this.setState({
      form: {
        ...this.state.form,
        [event.target.name]: event.target.value,
      },
    });
  };

  handleRegister = (event) => {
    event.preventDefault();
    console.log(this.state.form);
    this.props.register(this.state.form).then((result) => {
      console.log(this.props.auth.data);
      this.props.history.push("/signin");
    });
  };
  render() {
    console.log(this.state);
    const { userName, userEmail, userPassword } = this.state;
    return (
      <>
        <section className={styles.pageSignUp}>
          {/* <!-- =============Isi content=================== --> */}
          {/* <!-- bootstrap grid --> */}
          <Container fluid className={styles.container}>
            <Row>
              {/* <!-- Kolom kiri --> */}
              <Col lg={8} className={styles.columnLeft}>
                <Image src={background} className={styles.background} />
                <Image src={tickitz} className={styles.tickitz} />
                <p className={styles.titleWait}>Lets build your account</p>
                <p className={styles.textLoyal}>
                  To be a loyal moviegoer and access all of features, your
                  details are required.
                </p>
                <Col className={styles.columnRound}>
                  <Row className={styles.rowRound}>
                    <Button variant="#fff" className={styles.rounded1}>
                      1
                    </Button>
                    <p className={styles.textRound}>
                      Fill your additional details
                    </p>
                  </Row>
                  <Row className={styles.rowRoundLine}>
                    <span className={styles.roundedLine}></span>
                  </Row>
                  <Row className={styles.rowRound}>
                    <Button variant="#fff" className={styles.rounded2}>
                      2
                    </Button>
                    <p className={styles.textRound}>Activate your account</p>
                  </Row>
                  <Row className={styles.rowRoundLine}>
                    <span className={styles.roundedLine}></span>
                  </Row>
                  <Row className={styles.rowRound}>
                    <Button variant="#fff" className={styles.rounded3}>
                      3
                    </Button>
                    <p className={styles.textRound}>Done</p>
                  </Row>
                </Col>
              </Col>
              {/* <!-- Akhir kolom kiri --> */}

              {/* <!-- Kolom Kanan --> */}
              <Col lg={4} className={styles.columnRight}>
                <Image src={tickitz2} className={styles.logoResponsive} />
                <Container className={styles.right}>
                  <Form className={styles.form} onSubmit={this.handleRegister}>
                    <Form.Group>
                      <Form.Label className={styles.titleFill}>
                        Fill your addtional details
                      </Form.Label>
                    </Form.Group>
                    <Form.Group
                      controlId="formBasicUserName"
                      className={styles.email}
                    >
                      <Form.Label>Username</Form.Label>
                      <Form.Control
                        className={styles.placeholder}
                        type="text"
                        placeholder="Write your username"
                        name="userName"
                        value={userName}
                        onChange={(event) => this.changeText(event)}
                      />
                    </Form.Group>
                    <Form.Group
                      controlId="formBasicEmail"
                      className={styles.email}
                    >
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        className={styles.placeholder}
                        type="email"
                        placeholder="Write your email"
                        name="userEmail"
                        value={userEmail}
                        onChange={(event) => this.changeText(event)}
                      />
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                      <Form.Label className={styles.password}>
                        Password
                      </Form.Label>
                      <Form.Control
                        className={styles.placeholder}
                        type="password"
                        placeholder="Write your password"
                        name="userPassword"
                        value={userPassword}
                        onChange={(event) => this.changeText(event)}
                      />
                    </Form.Group>
                    <Button
                      className={styles.buttonJoin}
                      variant="dark"
                      type="submit"
                    >
                      Join for free now
                    </Button>
                  </Form>
                  <Col className={styles.haveAccount}>
                    <Row className={styles.logIn}>
                      Do you already have an account?
                      <Link to="#" className={styles.linkLogIn}>
                        Log in
                      </Link>
                    </Row>
                    <Row className={styles.or}>
                      <span className={styles.line}></span>
                      Or
                      <span className={styles.line}></span>
                    </Row>
                    <Row className={styles.toggleButtonGroup}>
                      <ToggleButtonGroup
                        type="checkbox"
                        defaultValue={[1, 3]}
                        className={`${styles.contentButton} shadow-sm`}
                      >
                        <ToggleButton
                          variant="#fff"
                          className={styles.titleButton}
                        >
                          <Image src={google} />
                        </ToggleButton>
                        <ToggleButton
                          variant="white"
                          className={styles.titleButton}
                        >
                          Google
                        </ToggleButton>
                      </ToggleButtonGroup>
                      <ToggleButtonGroup
                        type="checkbox"
                        defaultValue={[1, 3]}
                        className={`${styles.contentButton} shadow-sm`}
                      >
                        <ToggleButton
                          variant="white"
                          className={styles.titleButton}
                        >
                          <Image src={facebook} />
                        </ToggleButton>
                        <ToggleButton
                          variant="white"
                          className={styles.titleButton}
                        >
                          Facebook
                        </ToggleButton>
                      </ToggleButtonGroup>
                    </Row>
                  </Col>
                </Container>
              </Col>
            </Row>
          </Container>
          {/* <!-- akhir content --> */}
        </section>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = { register };

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
