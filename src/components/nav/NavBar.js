import React from "react";
import { Link } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem
} from "reactstrap";
import "./NavBar.css";
import bird from "./bird_logo_transparent.png"


export default class NavBar extends React.Component {

  // isAuthenticated is looking for a userId to exist in either sessionStorage or localStorage
  isAuthenticated = () =>
    sessionStorage.getItem("userId") !== null ||
    localStorage.getItem("userId") !== null;

  // the constructor and toggle came with the reactstrap navbar so it can collaspe when the screen shrinks
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  // the logoutUser function removes the userId from session and local storage
  logoutUser = () => {
    localStorage.removeItem("userId");
    sessionStorage.removeItem("userId");
  };

  // if the user is logged in the full navbar will appear otherwise the user will just see the logo
  noNavonLogin = () => {
    if (this.isAuthenticated()) {
      return (
        <React.Fragment>
          <div>
            <Navbar color="dark" light expand="md">
            <img src={bird} className="icon-bird-small" alt="bird" />
                <a href="/" className="text-light big-header" 
                style={{ textDecoration: 'none' }}>
                  Backyard Birder   
                </a>
              <NavbarToggler onClick={this.toggle} />
              <Collapse isOpen={this.state.isOpen} navbar>
                <Nav className="ml-auto" navbar>
                  <NavItem>
                    <Link className="text-light nav-link" to="/">
                      Sightings
                    </Link>
                  </NavItem>
                  <NavItem>
                    <Link className="text-light nav-link" to="/birds">
                      Birds
                    </Link>
                  </NavItem>
                  <NavItem>
                    <Link className="text-light nav-link" to="/map">
                      Map
                    </Link>
                  </NavItem>
                  <NavItem>
                    <Link className="text-light nav-link" to="/welcome" onClick={()=> this.logoutUser()}>
                      Logout
                    </Link>
                  </NavItem>
                </Nav>
              </Collapse>
            </Navbar>
          </div>
        </React.Fragment>
      );
    } else {
      return (
        <Navbar color="dark" light expand="md">
        <img src={bird} className="icon-bird-small" alt="bird" />
        <h1 className="text-light big-header" href="/">
          Backyard Birder
        </h1>
        </Navbar>
      );
    }
  };

  // we're calling the noNavonLogin function in the render method
  render() {
    return (
      this.noNavonLogin()
    )
  }

}
