import React, { Component } from "react";
// import styles from "./Login.module.css";
import { Button, Container, Form, Card } from "react-bootstrap";
import { connect } from "react-redux";
import { login } from "../../../redux/actions/auth";

class Login extends Component {
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
      // [1]
      // console.log(result.value.data.data.toke);

      // [2]
      console.log(this.props.auth.data.token);
      localStorage.setItem("token", this.props.auth.data.token);
      this.props.history.push("/learning/basic-home");
    });
  };

  render() {
    const { userEmail, userPassword } = this.state;
    return (
      <>
        <Container>
          <Card className="mt-5 mx-auto" style={{ width: "30rem" }}>
            <Card.Body>
              <Form onSubmit={this.handleLogin}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    name="userEmail"
                    value={userEmail}
                    onChange={(event) => this.changeText(event)}
                  />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    name="userPassword"
                    value={userPassword}
                    onChange={(event) => this.changeText(event)}
                  />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Container>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = { login };

export default connect(mapStateToProps, mapDispatchToProps)(Login);
