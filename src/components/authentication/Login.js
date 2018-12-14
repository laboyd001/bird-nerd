import React, { Component } from "react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  Container,
  Button,
  ButtonGroup
} from "reactstrap";
import "./auth.css"
import bird from "./bird_nerd_logo.png"


// This is where the template for the login lives.  It is how the login page will be rendered. The handler props are passed here.
export default class Login extends Component {
  render() {
    return (
      <React.Fragment>
        <Container>
          <div className="logo">
            <img src={bird} className="icon-bird" alt="bird" />
          </div>
          <div className={this.props.hideLoginForm ? "hide" : "login-form"}>
            <div className="login-form">
            

              <h2>Sign In</h2>
              <InputGroup>
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>Email Address</InputGroupText>
                </InputGroupAddon>
                <Input
                  onChange={this.props.handleFieldChange}
                  type="email"
                  id="loginEmail"
                  placeholder="Email address"
                  required=""
                  autoFocus=""
                />
              </InputGroup>
              <InputGroup>
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>Password</InputGroupText>
                </InputGroupAddon>
                <Input
                  onChange={this.props.handleFieldChange}
                  type="password"
                  id="loginPassword"
                  placeholder="Password"
                  required=""
                />
              </InputGroup>
              <p className="formLabel">
                Remember me
                <input
                  className="form-checkbox"
                  onChange={this.props.handleFieldChange}
                  type="checkbox"
                  id="remember"
                />
              </p>
              <ButtonGroup>
                <Button
                  className="btn"
                  type="submit"
                  onClick={() => {
                    this.props.handleLogin();
                  }}
                >
                  Sign in
                </Button>
                <Button
                  className="register__link btn"
                  onClick={() => this.props.handleChangeForm()}
                >
                  Register an account
                </Button>
              </ButtonGroup>
            </div>
          </div>
        </Container>
      </React.Fragment>
    );
  }
}
