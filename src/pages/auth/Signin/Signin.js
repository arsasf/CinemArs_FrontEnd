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
import styles from "./Signin.module.css";
import google from "../../../assets/img/google.png";
import facebook from "../../../assets/img/facebook.png";
import background from "../../../assets/img/full-background-avangers.png";
import tickitz from "../../../assets/img/logo_signIn.png";
import tickitz2 from "../../../assets/img/Tickitz.png";
import { connect } from "react-redux";
import { login } from "../../../redux/actions/auth";

class Signin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
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

  handleLogin = (event) => {
    event.preventDefault();
    console.log(this.state.form);
    this.props.login(this.state.form).then((result) => {
      console.log(this.props.auth.data.token);
      localStorage.setItem("token", this.props.auth.data.token);
      localStorage.setItem("user_id", this.props.auth.data.user_id);
      localStorage.setItem("user_email", this.props.auth.data.user_email);
      localStorage.setItem("user_role", this.props.auth.data.user_role);
      this.props.history.push("/cinemars/home");
    });
  };

  render() {
    const { userEmail, userPassword } = this.state;
    return (
      <>
        <section className={styles.pageSignIn}>
          <Container fluid className={styles.container}>
            <Row>
              <Col lg={7} className={styles.columnLeft}>
                <Image src={background} className={styles.background} />
                <Image src={tickitz} className={styles.tickitz} />
                <p className={styles.titleWait}>Wait, watch, wow!</p>
              </Col>
              <Col lg={5} className={styles.columnRight}>
                <Image src={tickitz2} className={styles.logoResponsive} />
                <Container className={styles.right}>
                  <Form className={styles.form} onSubmit={this.handleLogin}>
                    <Form.Group controlId="formBasicEmail">
                      <Form.Label className={styles.titleSignIn}>
                        Sign In
                      </Form.Label>
                      <Form.Text
                        className={`${styles.textSignIn} text-muted mb-5`}
                      >
                        Sign in with your data that you entered during your
                        regitstration
                      </Form.Text>
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
                      className={styles.buttonSignIn}
                      variant="dark"
                      type="submit"
                    >
                      Sign In
                    </Button>
                  </Form>
                  <Col className={styles.forgotPassword}>
                    <Row className={styles.reset}>
                      Forgot your password?
                      <Link to="#" className={styles.linkReset}>
                        Reset now
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

const mapDispatchToProps = { login };

export default connect(mapStateToProps, mapDispatchToProps)(Signin);
