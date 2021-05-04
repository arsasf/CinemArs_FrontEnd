import { Component } from "react";
import { Link } from "react-router-dom";
import { Col, Container, Image, Row } from "react-bootstrap";
import styles from "./Footer.module.css";
import ebv from "../../../assets/img/ebv.png";
import hiflix from "../../../assets/img/hiflix.png";
import cineone from "../../../assets/img/cineone21.png";

class Footer extends Component {
  render() {
    return (
      <>
        <Container fluid className={styles.footer}>
          <Container>
            <Row className={styles.footerContent}>
              <Col lg={3} className={styles.footer1}>
                <Row>
                  <Link to="#">
                    <Image
                      className={`${styles.logo} mb-3`}
                      src="https://cinemarsticketbooking.netlify.app/img/[V1]%20-%20Home%20Page/Desktop/Tickitz%201.png"
                      alt=""
                    />
                  </Link>
                </Row>
                <Row>
                  <Col className={styles.textLogo}>
                    <Row className={styles.textLogo1}>
                      <h6>Stop waiting in line. Buy tickets</h6>
                    </Row>
                    <Row className={styles.textLogo2}>
                      <h6>conveniently, watch movies quietly.</h6>
                    </Row>
                  </Col>
                </Row>
              </Col>
              <Col lg={3} className={styles.footer2}>
                <Row className={styles.explore}>
                  <h1 className="mb-3">Explore</h1>
                </Row>
                <Row>
                  <Col className={styles.listExplore}>
                    <Row>
                      <h6>Cinemas</h6>
                    </Row>
                    <Row>
                      <h6>Movie List</h6>
                    </Row>
                    <Row>
                      <h6>My Ticket</h6>
                    </Row>
                    <Row>
                      <h6>Notification</h6>
                    </Row>
                  </Col>
                </Row>
              </Col>
              <Col lg={3} className={styles.footer4}>
                <Row className={styles.sosmed}>
                  <h1 className="mb-3">Our Sponsor</h1>
                </Row>
                <Row>
                  <Col className={styles.logoSosmed}>
                    <Row className={styles.listSosmed}>
                      <Row>
                        <Col>
                          <Link to="#">
                            <Image className={styles.ebvId} src={ebv} alt="" />
                          </Link>
                        </Col>
                      </Row>
                    </Row>
                    <Row className={styles.listSosmed}>
                      <Row>
                        <Col>
                          <Link to="#">
                            <Image
                              className={styles.cineone}
                              src={cineone}
                              alt=""
                            />
                          </Link>
                        </Col>
                      </Row>
                    </Row>
                    <Row className={styles.listSosmed}>
                      <Row>
                        <Col>
                          <Link to="#">
                            <Image
                              className={styles.hiflix}
                              src={hiflix}
                              alt=""
                            />
                          </Link>
                        </Col>
                      </Row>
                    </Row>
                  </Col>
                </Row>
              </Col>

              <Col lg={3} className={styles.footer4}>
                <Row className={styles.sosmed}>
                  <h1 className="mb-3">Follow Us</h1>
                </Row>
                <Row>
                  <Col className={styles.logoSosmed}>
                    <Row className={styles.listSosmed}>
                      <Row>
                        <Col>
                          <Link to="#">
                            <Image
                              className={styles.facebook}
                              src="https://cinemarsticketbooking.netlify.app/img/[V1]%20-%20Home%20Page/Desktop/eva_facebook-outline.png"
                              alt=""
                            />
                          </Link>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <h6>Tickitz Cinema id</h6>
                        </Col>
                      </Row>
                    </Row>
                    <Row className={styles.listSosmed}>
                      <Row>
                        <Col>
                          <Link to="#">
                            <Image
                              className={styles.instagram}
                              src="https://cinemarsticketbooking.netlify.app/img/[V1]%20-%20Home%20Page/Desktop/bx_bxl-instagram.png"
                              alt=""
                            />
                          </Link>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <h6>tickitz.id</h6>
                        </Col>
                      </Row>
                    </Row>
                    <Row className={styles.listSosmed}>
                      <Row>
                        <Col>
                          <Link to="#">
                            <Image
                              className={styles.twitter}
                              src="https://cinemarsticketbooking.netlify.app/img/[V1]%20-%20Home%20Page/Desktop/eva_twitter-outline.png"
                              alt=""
                            />
                          </Link>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <h6>tickitz.id</h6>
                        </Col>
                      </Row>
                    </Row>
                    <Row className={styles.listSosmed}>
                      <Row>
                        <Col>
                          <Link to="#">
                            <Image
                              className={styles.youtube}
                              src="https://cinemarsticketbooking.netlify.app/img/[V1]%20-%20Home%20Page/Desktop/feather_youtube.png"
                              alt=""
                            />
                          </Link>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <h6>Tickitz Cinema id</h6>
                        </Col>
                      </Row>
                    </Row>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row>
              <Col>
                <Row className={styles.footer5}>
                  <p>© 2021 CinemArs. All Rights Reserved.</p>
                </Row>
              </Col>
            </Row>
          </Container>
        </Container>
      </>
    );
  }
}

export default Footer;
