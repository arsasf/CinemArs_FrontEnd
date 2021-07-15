import styles from "./ManagePremiere.module.css";
import { Container, Col, Image, Form, Dropdown, Button } from "react-bootstrap";
import ImagePremiere from "../../../../assets/img/background-avangers.png";
import cineOne21 from "../../../../assets/img/cineone21.png";
import hiflix from "../../../../assets/img/hiflix.png";
import ebu from "../../../../assets/img/ebv.png";

export default function ManagePremiere() {
  return (
    <>
      <Container fluid className={styles.fullArea}>
        <Container className={styles.contentArea}>
          <h1>Form Schedule</h1>
          <div className={styles.content1}>
            <div className={styles.boxManagePremiere}>
              <Col
                lg={2}
                md={12}
                sm={12}
                xs={12}
                className={styles.columnImageMovie}
              >
                <div className={`${styles.boxImagePremiere} shadow`}>
                  <Image src={ImagePremiere} className={styles.imagePremiere} />
                </div>
              </Col>
              <Col lg={4} md={12} sm={12} xs={12} className={styles.formLeft}>
                <Form.Group>
                  <Form.Label className={styles.textLabel}>Movie</Form.Label>
                  <Dropdown className={styles.selectMovie}>
                    <Dropdown.Toggle
                      variant="fff"
                      className={styles.dropdownSelectMovie}
                    >
                      Select Movie
                    </Dropdown.Toggle>
                    <Dropdown.Menu className={styles.menuListMovie}>
                      <Dropdown.Item className={styles.listMovie}>
                        Movie 1
                      </Dropdown.Item>
                      <Dropdown.Item className={styles.listMovie}>
                        .....
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </Form.Group>
                <Col
                  className={`${styles.rowNamePricePremiere} d-lg-grid d-md-flex d-sm-flex d-xs-grid`}
                >
                  <Form.Group>
                    <Form.Label className={styles.textLabel}>Name</Form.Label>
                    <Dropdown className={styles.selectMovie}>
                      <Dropdown.Toggle
                        variant="fff"
                        className={styles.dropdownSelectMovie}
                      >
                        Select Premiere
                      </Dropdown.Toggle>
                      <Dropdown.Menu className={styles.menuListMovie}>
                        <Dropdown.Item className={styles.listMovie}>
                          CineOne21
                        </Dropdown.Item>
                        <Dropdown.Item className={styles.listMovie}>
                          ebu.id
                        </Dropdown.Item>
                        <Dropdown.Item className={styles.listMovie}>
                          Hiflix
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </Form.Group>
                  <Form.Group className={styles.formPrice}>
                    <Form.Label className={styles.textLabel}>Price</Form.Label>
                    <Form.Control
                      type="number"
                      pattern="[0-9]{1}"
                      step="1"
                      placeholder="Input price"
                      className={styles.placeholder}
                    />
                  </Form.Group>
                </Col>
                <Form.Group>
                  <Form.Label className={styles.textLabel}>Premiere</Form.Label>
                  <Col className={styles.boxLogoPremiere}>
                    <Button
                      variant="fff"
                      className={`${styles.buttonPremiereImage}`}
                    >
                      <Image src={cineOne21} className={styles.logoPremiere} />
                    </Button>
                    <Button
                      variant="fff"
                      className={`${styles.buttonPremiereImage}`}
                    >
                      <Image src={hiflix} className={styles.logoPremiere} />
                    </Button>
                    <Button
                      variant="fff"
                      className={`${styles.buttonPremiereImage}`}
                    >
                      <Image src={ebu} className={styles.logoPremiere} />
                    </Button>
                  </Col>
                </Form.Group>
              </Col>
              <Col lg={4} md={12} sm={12} xs={12} className={styles.formRight}>
                <Form.Group>
                  <Form.Label className={styles.textLabel}>Location</Form.Label>
                  <Dropdown className={styles.selectMovie}>
                    <Dropdown.Toggle
                      variant="fff"
                      className={styles.dropdownSelectMovie}
                    >
                      Select Location
                    </Dropdown.Toggle>
                    <Dropdown.Menu className={styles.menuListMovie}>
                      <Dropdown.Item className={styles.listMovie}>
                        Banjarmasin
                      </Dropdown.Item>
                      <Dropdown.Item className={styles.listMovie}>
                        Banjarbaru
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </Form.Group>
                <Col
                  className={`${styles.rowNamePricePremiere} d-lg-grid d-md-flex d-sm-flex d-xs-grid`}
                >
                  <Form.Group className={styles.formDate}>
                    <Form.Label className={styles.textLabel}>
                      Date Start
                    </Form.Label>
                    <Form.Control type="date" className={styles.placeholder} />
                  </Form.Group>
                  <Form.Group className={styles.formDate}>
                    <Form.Label className={styles.textLabel}>
                      Date End
                    </Form.Label>
                    <Form.Control type="date" className={styles.placeholder} />
                  </Form.Group>
                </Col>
                <Form.Group>
                  <Form.Label className={styles.textLabel}>Time</Form.Label>
                  <Col className={styles.boxLogoPremiere}>
                    <Button variant="fff" className={`${styles.buttonTime} `}>
                      +
                    </Button>
                  </Col>
                </Form.Group>
              </Col>
            </div>
            <Col className={styles.boxButtonResetSubmit}>
              <Button variant="fff" className={styles.buttonReset}>
                Reset
              </Button>
              <Button variant="fff" className={styles.buttonSubmit}>
                Submit
              </Button>
            </Col>
          </div>
          <h1>Data Schedule</h1>
        </Container>
      </Container>
    </>
  );
}
