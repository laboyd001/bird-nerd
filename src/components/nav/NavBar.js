import React from "react";
import { Link } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from "reactstrap";
import SightingModal from "../sighting/SightingModal";
import "./NavBar.css";

export default class NavBar extends React.Component {

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

  render() {
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
                <NavItem>
                  <SightingModal
                    birds={this.props.birds}
                    sightings={this.props.sightings}
                    handleFieldChange={this.props.handleFieldChange}
                    constructNewSighting={this.props.constructNewSighting}
                  />
                </NavItem>
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
              </Nav>
            </Collapse>
          </Navbar>
        </div>
      </React.Fragment>
    );
  }
}
