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

export default class Register extends Component {
  render() {
    return (
      <Container>
        <div className={this.props.hideLoginForm ? "bryans__class" : "hide"}>
          <div className="login__form">
            <h2>Register</h2>
            <InputGroup>
              <InputGroupAddon addonType="prepend">
                <InputGroupText>Username</InputGroupText>
              </InputGroupAddon>
              <Input
                onChange={this.props.handleFieldChange}
                id="registerName"
                placeholder="Display Name"
                required=""
                autoFocus=""
              />
            </InputGroup>
            <InputGroup>
              <InputGroupAddon addonType="prepend">
                <InputGroupText>Email Address</InputGroupText>
              </InputGroupAddon>
              <Input
                onChange={this.props.handleFieldChange}
                type="email"
                id="registerEmail"
                placeholder="Email Address"
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
                id="registerPassword"
                placeholder="Password"
                required=""
              />
            </InputGroup>
            <ButtonGroup>
              <Button
                type="button"
                className="btn btn_mod"
                onClick={() => {
                  this.props.handleRegister();
                }}
              >
                Register
              </Button>
              <Button
                className="register__link"
                onClick={() => this.props.handleChangeForm()}
              >
                Already have an account? Sign In
              </Button>
            </ButtonGroup>
          </div>
        </div>
      </Container>
    );
  }
}
