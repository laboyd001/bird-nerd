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
import APIManager from "../../modules/APIManager";
import "./NavBar.css";

export default class NavBar extends React.Component {
  state = {
    birds: [],
    sightings: [],
    date: "",
    location: "",
    birdId: "",
    summary: ""
  };

  componentDidMount() {
    APIManager.getAllEntries("birds").then(birds => {
      this.setState({ birds: birds });
    });
  }

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

  addSighting = sighting => {
    return APIManager.addEntry("sightings", sighting)
      .then(() => APIManager.getAllEntries("sightings"))
      .then(sightings =>
        this.setState({
          sightings: sightings
        })
      );
  };

  handleFieldChange = evt => {
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
    this.setState(stateToChange);
  };

  constructNewSighting = () => {
    if (this.state.bird === "") {
      window.alert("Please select a bird");
    } else {
      const sighting = {
        date: this.state.date,
        location: this.state.location,
        birdId: this.state.birds.find(b => b.name === this.state.birdId).id,
        summary: this.state.summary
      };
      console.log("sighting", sighting);
      this.addSighting(sighting)

      // FIXME:Make the page reload with state
      window.location.href = "http://localhost:3000/"

    }
  };

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
                    handleFieldChange={this.handleFieldChange}
                    constructNewSighting={this.constructNewSighting}
                    birds={this.state.birds}
                    sightings={this.state.sightings}
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
