import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import {
  getAllMovie,
  createMovie,
  updateMovie,
  deleteMovie,
} from "../../../../redux/actions/manageMovie";
import { connect } from "react-redux";
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
import { ImageSquare, Warning, CheckCircle, XSquare } from "phosphor-react";
import CardManageMovie from "../../../../components/CinemArs/CardManageMovie/CardManageMovie";

function ManageMovie(props) {
  const [form, setForm] = useState({
    movieName: "",
    movieCategory: "",
    movieReleaseDate: "",
    movieCasts: "",
    movieDirectedBy: "",
    movieDurationHours: "",
    movieDurationMinutes: "",
    movieSynopsis: "",
  });
  const hours = [];
  const minutes = [];
  for (let i = 0; i < 60; i++) {
    minutes.push(i);
  }
  for (let i = 0; i <= 12; i++) {
    hours.push(i);
  }
  const [image, setImage] = useState(null);
  const [hour, setHour] = useState("0 hours");
  const [minute, setMinute] = useState("0 minutes");
  const [error, setError] = useState(false);
  const [show, setShow] = useState(false);
  const [files, setFiles] = useState([]);
  const [page] = useState(1);
  const [limit] = useState(5);
  const [searchByName, setSearchByName] = useState("");
  const [sort, setSort] = useState("movie_id DESC");
  const [titleSort, setTitleSort] = useState("Sort");
  const [month] = useState("Month(movie_release_date)");
  const [id, setId] = useState(props.match.params.id);
  const [isUpdate, setIsUpdate] = useState(false);
  const [msg, setMsg] = useState("");

  const handlePageClick = (event) => {
    const selectedPage = event.selected + 1;
    props.getAllMovie(selectedPage, limit, searchByName, sort, month);
    if (searchByName !== "") {
      const search = searchByName;
      props.history.push(
        `/cinemars/manage-movie/${id}?page=${selectedPage}&limit=${limit}&search=${search}&sort=${sort}`
      );
    } else {
      props.history.push(
        `/cinemars/manage-movie/${id}?page=${selectedPage}&limit=${limit}&sort=${sort}`
      );
    }
  };

  const handleSortClick = (param, title) => {
    setSort(param);
    setTitleSort(title);
    const pageSearch = 1;
    props.getAllMovie(pageSearch, limit, searchByName, param, month);
    props.history.push(
      `/cinemars/manage-movie/${id}?page=${pageSearch}&limit=${limit}&search=${searchByName}&sort=${param}`
    );
  };

  const handleSearch = (event) => {
    event.preventDefault();
    const pageSearch = 1;
    props.getAllMovie(pageSearch, limit, searchByName, sort, month);
    props.history.push(
      `/cinemars/manage-movie/${id}?page=${pageSearch}&limit=${limit}&search=${searchByName}&sort=${sort}`
    );
    setSearchByName("");
  };

  const changeSearh = (event) => {
    setSearchByName(event.target.value);
  };

  const changeText = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const resetData = (event) => {
    event.preventDefault();
    setForm({
      movieName: "",
      movieCategory: "",
      movieReleaseDate: "",
      movieCasts: "",
      movieDirectedBy: "",
      movieDurationHours: "",
      movieDurationMinutes: "",
      movieSynopsis: "",
    });
    setImage(null);
    setFiles([]);
    setHour("0 hour");
    setMinute("0 minute");
  };

  const submitData = (event) => {
    event.preventDefault();
    console.log("Save data!");
    const formData = new FormData();
    formData.append("movieName", form.movieName);
    formData.append("movieDirectedBy", form.movieDirectedBy);
    formData.append("movieReleaseDate", form.movieReleaseDate);
    formData.append("movieCategory", form.movieCategory);
    formData.append("movieCasts", form.movieCasts);
    formData.append("movieDurationHours", hour);
    formData.append("movieDurationMinutes", minute);
    formData.append("movieSynopsis", form.movieSynopsis);
    formData.append("image", files[0]);
    // for (var pair of formData.entries()) {
    //   console.log(pair[0] + ", " + pair[1]);
    // }
    props
      .createMovie(formData)
      .then((res) => {
        setShow(true);
        setError(false);
        setMsg("Success Added !");
        resetData(event);
        setId(res.value.data.data.id);
        props.getAllMovie(page, limit, searchByName, sort, month);
        if (searchByName !== "") {
          const search = searchByName;
          props.history.push(
            `/cinemars/manage-movie/${res.value.data.data.id}?page=${page}&limit=${limit}&search=${search}&sort=${sort}`
          );
        } else {
          props.history.push(
            `/cinemars/manage-movie/${res.value.data.data.id}?page=${page}&limit=${limit}&sort=${sort}`
          );
        }
      })
      .catch((err) => {
        if (err) {
          setShow(true);
          setError(true);
          setMsg(err.response.data.msg);
          resetData(event);
          return {};
        }
      });
  };

  const setUpdate = (data) => {
    console.log("Set Update !");
    const formData = new FormData();
    formData.append("image", form.image);
    setIsUpdate(true);
    setId(data.movie_id);
    setHour(data.movie_duration_hours);
    setMinute(data.movie_duration_minutes);
    setImage(data.movie_image);
    setForm({
      movieName: data.movie_name,
      movieDirectedBy: data.movie_directed_by,
      movieReleaseDate: data.movie_release_date.slice(0, 10),
      movieCategory: data.movie_category,
      movieCasts: data.movie_casts,
      movieDurationHours: data.movie_duration_hours,
      movieDurationMinutes: data.movie_duration_minutes,
      movieSynopsis: data.movie_synopsis,
    });
    props.history.push(`/cinemars/manage-movie/update=${data.movie_id}`);
  };

  const updateData = (event) => {
    event.preventDefault();
    setIsUpdate(false);
    const formData = new FormData();
    formData.append("movieName", form.movieName);
    formData.append("movieDirectedBy", form.movieDirectedBy);
    formData.append("movieReleaseDate", form.movieReleaseDate);
    formData.append("movieCategory", form.movieCategory);
    formData.append("movieCasts", form.movieCasts);
    formData.append("movieDurationHours", hour);
    formData.append("movieDurationMinutes", minute);
    formData.append("movieSynopsis", form.movieSynopsis);
    formData.append("image", files[0]);
    props
      .updateMovie(id, formData)
      .then((res) => {
        setTitleSort("Updated Z-A");
        setShow(true);
        setError(false);
        resetData(event);
        setMsg("Success Updated !");
        setId(res.value.data.data.id);
        const sortUpdate = "movie_updated_at DESC";
        props.getAllMovie(page, limit, searchByName, sortUpdate, month);
        if (searchByName !== "") {
          const search = searchByName;
          props.history.push(
            `/cinemars/manage-movie/${res.value.data.data.id}?page=${page}&limit=${limit}&search=${search}&sort=${sortUpdate}`
          );
        } else {
          props.history.push(
            `/cinemars/manage-movie/${res.value.data.data.id}?page=${page}&limit=${limit}&sort=${sortUpdate}`
          );
        }
      })
      .catch((err) => {
        if (err) {
          setShow(true);
          setError(true);
          setMsg(err.response.data.msg);
          resetData(event);
          return {};
        }
      });
  };

  const deleteData = (id, event) => {
    setIsUpdate(false);
    console.log("Delete Data !");
    console.log(id);
    resetData(event);
    props
      .deleteMovie(id)
      .then((res) => {
        console.log(res.value.data.data);
        setTitleSort("Sort");
        const sortDelete = "movie_id DESC";
        setShow(true);
        setMsg("Success Deleted !");
        setError(false);
        props.getAllMovie(page, limit, searchByName, sortDelete, month);
        props.history.push(
          `/cinemars/manage-movie/delete=${res.value.data.data.id}`
        );
      })
      .catch((err) => {
        if (err) {
          console.log(err);
          setShow(true);
          setError(true);
          setMsg(err.response.data.msg);
          return {};
        }
      });
  };

  //*================================ Drag & Drop Image ===============

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });
  const thumbs = files.map((file) => (
    <div className={styles.thumb} key={file.name}>
      <div className={styles.thumbInner}>
        <Image src={file.preview} className={styles.img} />
      </div>
    </div>
  ));
  useEffect(
    () => () => {
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [files]
  );
  //*============================ End Drag & Drop Image ===============

  return (
    <>
      <Toast
        className={
          error === false ? styles.createDataToast : styles.createDataToastError
        }
        onClose={() => setShow(false)}
        show={show}
        delay={5000}
        autohide
      >
        <Toast.Body className={styles.bodyToast}>
          <div className={styles.boxClose}>
            <XSquare
              size={24}
              color="white"
              onClick={() => setShow(false)}
              className={styles.iconClose}
            />
          </div>
          {error === false ? (
            <CheckCircle size={80} color="#34ef53" />
          ) : (
            <Warning size={80} color="red" />
          )}
          {msg}
        </Toast.Body>
      </Toast>
      <Navbar login={true} user={props.auth.data ? props.auth.data : false} />
      <Container fluid className={styles.adminManageMovie}>
        <Container className={styles.containerMangeMovie}>
          <Row className={styles.rowTitle}>
            <Col className={styles.titleDataMovie}>
              <Row>Form Movie</Row>
            </Col>
          </Row>
        </Container>
        <Container className={styles.containerMangeMovie}>
          <Form
            action="/cinemars/manage-movie"
            onSubmit={isUpdate ? updateData : submitData}
            onReset={resetData}
          >
            <Row className={styles.contentFormMovie}>
              <Col
                lg={2}
                md={12}
                sm={12}
                xs={12}
                className={styles.columnImage}
              >
                <div
                  {...getRootProps({ className: "dropzone" })}
                  className={styles.boxDropzone}
                >
                  <input {...getInputProps()} />
                  <Row className={`${styles.rowFormMovieImage}`}>
                    {thumbs.length === 0 ? (
                      image === null ? (
                        <div className={styles.imgNotAvailable}>
                          <h6>
                            Choose File
                            <br />
                            or
                            <br />
                            Drag file
                          </h6>
                          <ImageSquare size={100} color="#4e4b66" />
                        </div>
                      ) : (
                        <Image
                          src={`${process.env.REACT_APP_IMAGE_URL}${image}`}
                          className={styles.img}
                        />
                      )
                    ) : (
                      thumbs
                    )}
                  </Row>
                </div>
              </Col>
              <Col lg={4} md={12} sm={12} xs={12}>
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
                      value={form.movieName}
                      onChange={(event) => changeText(event)}
                      required
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
                      value={form.movieDirectedBy}
                      onChange={(event) => changeText(event)}
                      required
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
                      value={form.movieReleaseDate}
                      onChange={(event) => changeText(event)}
                      required
                    />
                  </Form.Group>
                </Row>
              </Col>
              <Col lg={4} md={12} sm={12} xs={12}>
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
                      value={form.movieCategory}
                      onChange={(event) => changeText(event)}
                      required
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
                      value={form.movieCasts}
                      onChange={(event) => changeText(event)}
                      required
                    />
                  </Form.Group>
                  <Col className={styles.colDuration}>
                    <Row>
                      <Col>
                        <Form.Group>
                          <Form.Label className={styles.titleFormLabelMovie}>
                            Duration Hours
                          </Form.Label>
                          <Dropdown>
                            <Dropdown.Toggle
                              variant="#fff"
                              className={styles.formDuration}
                            >
                              {hour}
                            </Dropdown.Toggle>
                            <Dropdown.Menu className={styles.menuDuration}>
                              {hours.length > 0
                                ? hours.map((item, index) => {
                                    return (
                                      <Dropdown.Item
                                        key={index}
                                        className={styles.listDuration}
                                        onClick={() => setHour(`${item} hours`)}
                                      >
                                        {`${item} hours`}
                                      </Dropdown.Item>
                                    );
                                  })
                                : ""}
                            </Dropdown.Menu>
                          </Dropdown>
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group>
                          <Form.Label className={styles.titleFormLabelMovie}>
                            Duration Minutes
                          </Form.Label>
                          <Dropdown>
                            <Dropdown.Toggle
                              variant="#fff"
                              className={styles.formDuration}
                            >
                              {minute}
                            </Dropdown.Toggle>
                            <Dropdown.Menu className={styles.menuDuration}>
                              {minutes.length > 0
                                ? minutes.map((item, index) => {
                                    return (
                                      <Dropdown.Item
                                        key={index}
                                        className={styles.listDuration}
                                        onClick={() =>
                                          setMinute(`${item} minutes`)
                                        }
                                      >
                                        {`${item} minutes`}
                                      </Dropdown.Item>
                                    );
                                  })
                                : ""}
                            </Dropdown.Menu>
                          </Dropdown>
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
                  value={form.movieSynopsis}
                  onChange={(event) => changeText(event)}
                  required
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
              >
                {isUpdate ? "Update" : "Submit"}
              </Button>
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
                <Dropdown.Toggle variant="#fff" className={styles.titleSort}>
                  {titleSort}
                </Dropdown.Toggle>
                <Dropdown.Menu className={styles.menuDropdown}>
                  <Dropdown.Item
                    className={styles.listSort}
                    onClick={() =>
                      handleSortClick("movie_created_at ASC", "Created A-Z")
                    }
                  >
                    Created A-Z
                  </Dropdown.Item>
                  <Dropdown.Item
                    className={styles.listSort}
                    onClick={() =>
                      handleSortClick("movie_created_at DESC", "Created Z-A")
                    }
                  >
                    Created Z-A
                  </Dropdown.Item>
                  <Dropdown.Item
                    className={styles.listSort}
                    onClick={() =>
                      handleSortClick("movie_updated_at ASC", "Updated A-Z")
                    }
                  >
                    Updated A-Z
                  </Dropdown.Item>
                  <Dropdown.Item
                    className={styles.listSort}
                    onClick={() =>
                      handleSortClick("movie_updated_at DESC", "Updated Z-A")
                    }
                  >
                    Updated Z-A
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Col>
            <Col lg={3} className={styles.search}>
              <Form className={styles.menuSearch} onSubmit={handleSearch}>
                <Form.Control
                  type="text"
                  className={styles.placeholderSearch}
                  placeholder="Search movie name..."
                  value={searchByName}
                  name="searchByName"
                  onChange={(e) => changeSearh(e)}
                />
              </Form>
            </Col>
          </Row>
        </Container>
        <Container className={styles.containerCardMovie}>
          <Row
            className={
              props.manageMovie.data.length > 4 &&
              props.manageMovie.data.length <= 5
                ? styles.rowCardImage
                : styles.rowCardImageLimit
            }
          >
            {props.manageMovie.data.length > 0 ? (
              props.manageMovie.data.map((item, index) => {
                return (
                  <Col
                    lg={2}
                    md={2}
                    key={index}
                    className={styles.colCardImage}
                  >
                    <CardManageMovie
                      data={item}
                      handleUpdate={setUpdate.bind(this)}
                      handleDelete={deleteData.bind(this)}
                    />
                  </Col>
                );
              })
            ) : (
              <div className={styles.notFound}>
                Sorry, <br /> movies not available...
              </div>
            )}
          </Row>
        </Container>
        <Container className={styles.containerMangeMovie}>
          <Row className={styles.rowTitle}>
            <ReactPaginate
              previousLabel={"prev"}
              nextLabel={"next"}
              breakLabel={"..."}
              breakClassName={"break-me"}
              pageCount={
                props.manageMovie.data.length > 0
                  ? props.manageMovie.pagination.totalpage
                  : 1
              }
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={handlePageClick}
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

const mapStateToProps = (state) => ({
  manageMovie: state.manageMovie,
  auth: state.auth,
});

const mapDispatchToProps = {
  getAllMovie,
  createMovie,
  updateMovie,
  deleteMovie,
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageMovie);
