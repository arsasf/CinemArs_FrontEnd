import React, { Component } from "react";
import axiosApiIntances from "../../../utils/axios";
import styles from "./Home.module.css";
import NavBar from "../../../components/learning/NavBar";
import Cards from "../../../components/learning/Card";
import ReactPaginate from "react-paginate";
import { Container, Form, Button, Row, Col, Spinner } from "react-bootstrap";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        movieName: "",
        movieCategory: "",
        movieReleaseDate: "",
        image: null,
      },
      data: [],
      pagination: {},
      page: 1,
      limit: 3,
      isLoading: false,
      isUpdate: false,
      id: "",
    };
  }

  componentDidMount() {
    console.log("this get Data jalan");
    this.getData();
  }

  getData = () => {
    console.log("Get Data !");
    const { page, limit } = this.state;
    this.setState({ isLoading: true });
    axiosApiIntances
      .get(`movie?page=${page}&limit=${limit}`)
      .then((res) => {
        // console.log(res.data.data);
        this.setState({ data: res.data.data, pagination: res.data.pagination });
      })
      .catch((err) => {
        console.log(err.response);
      })
      .finally(() => {
        setTimeout(() => {
          this.setState({ isLoading: false });
        }, 1000);
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

  resetData = (event) => {
    event.preventDefault();
    this.setState({
      form: {
        movieName: "",
        movieCategory: "",
        movieReleaseDate: "",
        movie_casts: "",
        movie_category: "",
        movie_created_at: "",
        movie_directed_by: "",
        movie_duration: "",
        movie_id: [],
        movie_img: "",
        movie_synopsis: "",
        movie_updated_at: "",
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
    // console.log(this.state.form); //digunakan untuk create data yang hanya berisikan data selain file
    const formData = new FormData(); //formData digunakan untuk menghandle inputan yang memiliki file upload di dalamnya
    formData.append("movieName", this.state.form.movieName);
    formData.append("movieCategory", this.state.form.movieCategory);
    formData.append("movieReleaseDate", this.state.form.movieReleaseDate);
    formData.append("image", this.state.form.image);
    // for (var pair of formData.entries()) {
    //   console.log(pair[0] + ", " + pair[1]);
    // }

    // proses request post movie
    // axiosApiIntace.post('movie', formData, then( //ubah menjadi form data karena proses inputnya memiliki upload file
    // this.getData()
    // this.resetData()
    // )).catch()
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
    // console.log(this.state.data);
    // console.log(this.props);
    const { totalpage } = this.state.pagination;
    const { isLoading, isUpdate } = this.state;
    return (
      <>
        <Container className={styles.containerCenter}>
          <h1>Home Page !</h1>
          <NavBar />
          <div className={styles.containerForm}>
            <Form
              onSubmit={isUpdate ? this.updateData : this.submitData}
              onReset={this.resetData}
            >
              <Form.Group>
                <Form.Label>Movie Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="ex@ Spiderman, Batman ..."
                  name="movieName"
                  value={this.state.form.movieName}
                  onChange={(event) => this.changeText(event)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Movie Category</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="ex@ action, Comedy..."
                  name="movieCategory"
                  value={this.state.form.movieCategory}
                  onChange={(event) => this.changeText(event)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Movie Release Date</Form.Label>
                <Form.Control
                  type="date"
                  name="movieReleaseDate"
                  value={this.state.form.movieReleaseDate}
                  onChange={(event) => this.changeText(event)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Movie Image</Form.Label>
                <Form.Control
                  type="file"
                  onChange={(event) => this.handleImage(event)}
                />
              </Form.Group>
              <Button variant="primary" type="reset">
                Reset
              </Button>
              <Button variant="primary" type="submit">
                {isUpdate ? "Update" : "Submit"}
              </Button>
            </Form>
          </div>
          <hr />
          <Row>
            {isLoading ? (
              <Col md={12}>
                <Spinner animation="border" variant="primary" />
              </Col>
            ) : (
              this.state.data.map((item, index) => {
                return (
                  <Col md={4} key={index}>
                    <Cards
                      data={item}
                      handleUpdate={this.setUpdate.bind(this)}
                      handleDelete={this.deleteData.bind(this)}
                    />
                  </Col>
                );
              })
            )}
          </Row>
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
        </Container>
      </>
    );
  }
}

export default Home;
