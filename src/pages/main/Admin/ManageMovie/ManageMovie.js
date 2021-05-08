import { Component } from "react";
import {
  getAllMovie,
  createMovie,
} from "../../../../redux/actions/manageMovie";
import { connect } from "react-redux";
// import axiosApiIntances from "../../../../utils/axios";
import styles from "./ManageMovie.module.css";
import Navbar from "../../../../components/CinemArs/Navbar/Navbar";
import Footer from "../../../../components/CinemArs/Footer/Footer";
import {
  Col,
  Container,
  Image,
  Row,
  Form,
  Button,
  Dropdown,
  Toast,
} from "react-bootstrap";
import ReactPaginate from "react-paginate";
import CardManageMovie from "../../../../components/CinemArs/CardManageMovie/CardManageMovie";

class ManageMovie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        movieName: "",
        movieCategory: "",
        movieReleaseDate: "",
        movieCasts: "",
        movieDirectedBy: "",
        movieDurationHours: 0,
        movieDurationMinutes: 0,
        movieId: [],
        movieSynopsis: "",
        image: null,
      },
      page: 1,
      limit: 4,
      searchByName: "",
      sort: "movie_id DESC",
      month: "(Month(movie_release_date))",
      isLoading: false,
      isUpdate: false,
      id: "",
      show: false,
      setShow: false,
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
    const { page, limit, searchByName, sort, month } = this.state;
    this.props
      .getAllMovie(page, limit, searchByName, sort, month)
      .then((res) => {
        this.props.history.push(`manage-${res.value.config.url}`);
      });
  };

  handleSortClick = (event) => {
    this.setState(
      {
        ...this.state.from,
        sort: event,
      },
      () => {
        this.getData();
      }
    );
  };

  handleSearchClick = (event) => {
    event.preventDefault();
    this.setState(
      {
        ...this.state.from,
        [event.target.name]: event.target.value,
      },
      () => {
        this.getData();
      }
    );
  };

  changeText = (event) => {
    console.log(typeof event.target.value);
    this.setState({
      form: {
        ...this.state.form,
        [event.target.name]: event.target.value,
      },
    });
  };

  changeDurationHours = (event) => {
    console.log(typeof event);
    this.setState({
      form: {
        ...this.state.form,
        movieDurationHours: event,
      },
    });
  };

  changeDurationMinutes = (event) => {
    console.log(typeof event);
    this.setState({
      form: {
        ...this.state.form,
        movieDurationMinutes: event,
      },
    });
  };

  resetData = (event) => {
    event.preventDefault();
    this.setState({
      form: {
        movieName: "",
        movieCategory: "",
        movieReleaseDate: "",
        movieCasts: "",
        movieDirectedBy: "",
        movieDurationHours: "",
        movieDurationMinutes: "",
        movieSynopsis: "",
        image: event.target.files,
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

  submitData = (event) => {
    event.preventDefault();
    console.log("Save data!");
    const formData = new FormData();
    formData.append("movieName", this.state.form.movieName);
    formData.append("movieDirectedBy", this.state.form.movieDirectedBy);
    formData.append("movieReleaseDate", this.state.form.movieReleaseDate);
    formData.append("movieCategory", this.state.form.movieCategory);
    formData.append("movieCasts", this.state.form.movieCasts);
    formData.append("movieDurationHours", this.state.form.movieDurationHours);
    formData.append(
      "movieDurationMinutes",
      this.state.form.movieDurationMinutes
    );
    formData.append("movieSynopsis", this.state.form.movieSynopsis);
    formData.append("image", this.state.form.image);
    for (var pair of formData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }
    this.props
      .createMovie(formData)
      .then((res) => {
        console.log("ini res");
        console.log(res.value.data.msg);
        this.getData();
        this.resetData(event);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  setUpdate = (data) => {
    console.log("Set Update !");
    console.log(data);
    this.setState({
      isUpdate: true,
      id: data.movie_id,
      form: {
        movieName: data.movie_name,
        movieCategory: data.movie_category,
        movieReleaseDate: data.movie_release_date.slice(0, 10),
      },
    });
  };

  updateData = (event) => {
    event.preventDefault();
    console.log("Update Data !");
    console.log(this.state.id);
    console.log(this.state.form);
    this.setState({ isUpdate: false });
    this.resetData(event);
    // proses request patch movie
    // axiosApiIntace.patch('movie/${id}', form, then(
    // this.getData()
    // this.resetData()
    // )).catch()
  };

  deleteData = (id) => {
    console.log("Delete Data !");
    console.log(id);
    // proses request delete movie
    // axiosApiIntace.delete('movie/${id}', then(
    // this.getData()
    // this.resetData()
    // )).catch()
  };

  handlePageClick = (event) => {
    const selectedPage = event.selected + 1;
    this.setState({ page: selectedPage }, () => {
      this.getData();
    });
  };

  render() {
    const { totalpage } = this.props.manageMovie.pagination;
    // const { isError } = this.props.manageMovie;
    return (
      <>
        <Navbar />
        <Container fluid className={styles.adminManageMovie}>
          <Container className={styles.containerMangeMovie}>
            <Row className={styles.rowTitle}>
              <Col className={styles.titleDataMovie}>
                <Row>Form Movie</Row>
              </Col>
            </Row>
          </Container>
          <Container className={styles.containerMangeMovie}>
            <Form onSubmit={this.submitData} onReset={this.resetData}>
              <Row className={styles.contentFormMovie}>
                <Col lg={2}>
                  <Form.Group className={styles.form}>
                    <Row className={`${styles.rowFormMovieImage}`}>
                      <Col>
                        <Image src="#" className={styles.formMovieImage} />
                      </Col>
                      <Col>
                        <Form.Control
                          className={styles.placeholder}
                          type="file"
                          onChange={(event) => this.handleImage(event)}
                        />
                      </Col>
                    </Row>
                  </Form.Group>
                </Col>
                <Col lg={4}>
                  <Row className={styles.rowFormMovieLeft}>
                    <Form.Group className={styles.form}>
                      <Form.Label className={styles.titleFormLabelMovie}>
                        Movie Name
                      </Form.Label>
                      <Form.Control
                        className={styles.placeholder}
                        type="text"
                        placeholder="Write the title of movie"
                        name="movieName"
                        value={this.state.form.movieName}
                        onChange={(event) => this.changeText(event)}
                      />
                    </Form.Group>
                    <Form.Group className={styles.form}>
                      <Form.Label className={styles.titleFormLabelMovie}>
                        Director
                      </Form.Label>
                      <Form.Control
                        className={styles.placeholder}
                        type="text"
                        placeholder="Write directory of movie"
                        name="movieDirectedBy"
                        value={this.state.form.movieDirectedBy}
                        onChange={(event) => this.changeText(event)}
                      />
                    </Form.Group>
                    <Form.Group className={styles.form}>
                      <Form.Label className={styles.titleFormLabelMovie}>
                        Release Date
                      </Form.Label>
                      <Form.Control
                        className={styles.placeholder}
                        type="date"
                        name="movieReleaseDate"
                        value={this.state.form.movieReleaseDate}
                        onChange={(event) => this.changeText(event)}
                      />
                    </Form.Group>
                  </Row>
                </Col>
                <Col lg={4}>
                  <Row className={styles.rowFormMovieRight}>
                    <Form.Group className={styles.form}>
                      <Form.Label className={styles.titleFormLabelMovie}>
                        Category
                      </Form.Label>
                      <Form.Control
                        type="text"
                        className={styles.placeholder}
                        placeholder="Write category of movie"
                        name="movieCategory"
                        value={this.state.form.movieCategory}
                        onChange={(event) => this.changeText(event)}
                      />
                    </Form.Group>
                    <Form.Group className={styles.form}>
                      <Form.Label className={styles.titleFormLabelMovie}>
                        Casts
                      </Form.Label>
                      <Form.Control
                        type="text"
                        className={styles.placeholder}
                        placeholder="Write Casts of movie"
                        name="movieCasts"
                        value={this.state.form.movieCasts}
                        onChange={(event) => this.changeText(event)}
                      />
                    </Form.Group>
                    <Col className={styles.colDuration}>
                      <Row>
                        <Col>
                          <Form.Group>
                            <Form.Label className={styles.titleFormLabelMovie}>
                              Duration Hours
                            </Form.Label>
                            <Form.Control
                              className={styles.placeholder}
                              placeholder="Input Number @ex: 1"
                              name="movieDurationHours"
                              value={this.state.form.movieDurationHours}
                              onChange={(event) => this.changeText(event)}
                            />
                          </Form.Group>
                        </Col>
                        <Col>
                          <Form.Group>
                            <Form.Label className={styles.titleFormLabelMovie}>
                              Duration Minutes
                            </Form.Label>
                            <Form.Control
                              className={styles.placeholder}
                              placeholder="Input Number @ex: 10"
                              name="movieDurationMinutes"
                              value={this.state.form.movieDurationMinutes}
                              onChange={(event) => this.changeText(event)}
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <Row className={styles.formSynopsis}>
                <Form.Group className={styles.colSynopsis}>
                  <Form.Label className={styles.titleFormLabelMovie}>
                    Synopsis
                  </Form.Label>
                  <Form.Control
                    className={styles.placeholder}
                    as="textarea"
                    rows={5}
                    placeholder="Write synopsis of movie"
                    name="movieSynopsis"
                    value={this.state.form.movieSynopsis}
                    onChange={(event) => this.changeText(event)}
                  />
                </Form.Group>
              </Row>
              <Row className={styles.rowButton}>
                <Button
                  variant="dark"
                  className={`${styles.buttonReset} shadow`}
                  type="reset"
                >
                  Reset
                </Button>

                <Button
                  variant="dark"
                  className={`${styles.buttonSubmit} shadow`}
                  type="submit"
                  onClick={() => this.setShow(true)}
                >
                  Submit
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
                  <Toast.Body>{this.props.manageMovie.msgCreate}</Toast.Body>
                </Toast>
              </Row>
            </Form>
          </Container>
          <Container className={styles.containerMangeMovie}>
            <Row className={styles.rowTitle}>
              <Col lg={7} className={styles.titleDataMovie}>
                <Row>Data Movie</Row>
              </Col>
              <Col lg={2} className={styles.sort}>
                <Dropdown className={styles.dropdownSort}>
                  <Dropdown.Toggle
                    variant="#fff"
                    title="sort"
                    id="dropdown-basic"
                    className={styles.titleSort}
                  >
                    Sort
                  </Dropdown.Toggle>
                  <Dropdown.Menu className={styles.menuDropdown}>
                    <Dropdown.Item
                      className={styles.listSort}
                      onClick={() => this.handleSortClick("movie_id ASC")}
                    >
                      Id Movie A-Z
                    </Dropdown.Item>
                    <Dropdown.Item
                      className={styles.listSort}
                      onClick={() => this.handleSortClick("movie_id DESC")}
                    >
                      Id Movie Z-A
                    </Dropdown.Item>
                    <Dropdown.Item
                      className={styles.listSort}
                      onClick={() =>
                        this.handleSortClick("movie_release_date ASC")
                      }
                    >
                      Release Date A-Z
                    </Dropdown.Item>
                    <Dropdown.Item
                      className={styles.listSort}
                      onClick={() =>
                        this.handleSortClick("movie_release_date DESC")
                      }
                    >
                      Release Date Z-A
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Col>
              <Col lg={3} className={styles.search}>
                <Form className={styles.menuSearch}>
                  <Form.Control
                    type="text"
                    className={styles.placeholderSearch}
                    placeholder="Search movie name..."
                    value={this.state.searchByName}
                    name="searchByName"
                    onChange={(event) => this.handleSearchClick(event)}
                  />
                </Form>
              </Col>
            </Row>
          </Container>
          <Container className={styles.containerCardMovie}>
            <Row className={styles.dataCardMovie}>
              {this.props.manageMovie.data.map((item, index) => {
                return (
                  <Col lg={3} key={index} className={styles.colCardImage}>
                    <CardManageMovie data={item} />
                  </Col>
                );
              })}
            </Row>
          </Container>
          <Container className={styles.containerMangeMovie}>
            <Row className={styles.rowTitle}>
              <ReactPaginate
                previousLabel={"prev"}
                nextLabel={"next"}
                breakLabel={"..."}
                breakClassName={"break-me"}
                pageCount={totalpage}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={this.handlePageClick}
                containerClassName={styles.pagination}
                subContainerClassName={`${styles.pages} ${styles.pagination}`}
                activeClassName={styles.active}
              />
            </Row>
          </Container>
        </Container>
        <Footer />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  manageMovie: state.manageMovie,
  auth: state.auth,
});

const mapDispatchToProps = { getAllMovie, createMovie };

export default connect(mapStateToProps, mapDispatchToProps)(ManageMovie);
