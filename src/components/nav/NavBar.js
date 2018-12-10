import React from "react";
import { Link } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem
} from "reactstrap";
// import SightingModal from "../sighting/SightingModal";
import "./NavBar.css";

export default class NavBar extends React.Component {
  isAuthenticated = () =>
    sessionStorage.getItem("userId") !== null ||
    localStorage.getItem("userId") !== null;

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

  logoutUser = () => {
    localStorage.removeItem("userId");
    sessionStorage.removeItem("userId");
  };

  noNavonLogin = () => {
    if (this.isAuthenticated()) {
      return (
        <React.Fragment>
          <div>
            <Navbar color="dark" light expand="md">
              <NavbarBrand className="text-light" href="/">
                Bird Nerd      
             </NavbarBrand>
              <NavbarToggler onClick={this.toggle} />
              <Collapse isOpen={this.state.isOpen} navbar>
                <Nav className="ml-auto" navbar>
                  {/* <NavItem>
                    
                  </NavItem> */}
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
        // <div className="welcome-div">
        //   <h1>Bird Nerd</h1>
        // </div>
        <Navbar color="dark" light expand="md">
        <NavbarBrand className="text-light" href="/">
          Bird Nerd
        </NavbarBrand>
        </Navbar>
      );
    }
  };

  render() {
    return (
      this.noNavonLogin()
    )
  }

}
