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

class Signin extends Component {
  render() {
    return (
      <>
        <section className={styles.pageSignIn}>
          {/* <!-- =============Isi content=================== --> */}
          {/* <!-- bootstrap grid --> */}
          <Container fluid className={styles.container}>
            <Row>
              {/* <!-- Kolom kiri --> */}
              <Col lg={8} className={styles.columnLeft}>
                <Image src={background} className={styles.background} />
                <Image src={tickitz} className={styles.tickitz} />
                <p className={styles.titleWait}>Wait, watch, wow!</p>
              </Col>
              {/* <!-- Akhir kolom kiri --> */}

              {/* <!-- Kolom Kanan --> */}
              <Col lg={4} className={styles.columnRight}>
                <Image src={tickitz2} className={styles.logoResponsive} />
                <Container className={styles.right}>
                  <Form className={styles.form}>
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

export default Signin;
