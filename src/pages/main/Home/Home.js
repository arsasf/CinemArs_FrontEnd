import React, { Component } from "react";
import axios from "axios";
import styles from "./Home.module.css";
import NavBar from "../../../components/learning/NavBar";
import Cards from "../../../components/learning/Card";
import { Container, Form, Button, Row, Col } from "react-bootstrap";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        movieName: "",
        movieCategory: "",
        movieReleaseDate: "",
        movieImg: "",
      },
      data: [],
      pagination: {},
      page: 1,
      limit: 3,
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    console.log("Get Data !");
    axios
      .get("http://localhost:3001/api/v1/movie?page=1&limit=5")
      .then((res) => {
        // console.log(res);
        this.setState({ data: res.data.data, pagination: res.data.pagination });
      })
      .catch((err) => {
        console.log(err.response);
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

  submitData = (event) => {
    event.preventDefault();
    console.log("Save data!");
    console.log(this.state.form);
    // proses request post movie
  };

  render() {
    console.log(this.state);
    return (
      <>
        <Container className={styles.containerCenter}>
          <h1>Home Page !</h1>
          <NavBar />
          <div className={styles.containerForm}>
            <Form onSubmit={this.submitData}>
              <Form.Group>
                <Form.Label>Movie Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="ex@ Spiderman, Batman ..."
                  name="movieName"
                  onChange={(event) => this.changeText(event)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Movie Category</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="ex@ action, Comedy..."
                  name="movieCategory"
                  onChange={(event) => this.changeText(event)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Movie Release Date</Form.Label>
                <Form.Control
                  type="date"
                  name="movieReleaseDate"
                  onChange={(event) => this.changeText(event)}
                />
              </Form.Group>
              <Button variant="primary" type="reset">
                Reset
              </Button>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </div>
          <hr />
          <Row className={styles.rowCard}>
            {this.state.data.map((item, index) => {
              return (
                <Col md={2} key={index}>
                  <Cards data={item} />
                </Col>
              );
            })}
          </Row>
        </Container>
      </>
    );
  }
}

export default Home;
