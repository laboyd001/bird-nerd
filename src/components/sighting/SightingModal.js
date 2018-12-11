import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import APIManager from '../../modules/APIManager'

export default class SightingModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      birds: []
    };

    this.toggle = this.toggle.bind(this);
  }

  componentDidMount() {
    APIManager.getAllEntries("birds")
      .then(birds => {
        this.setState({ birds: birds });
      })

  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  render() {
    return (
      <div>
        <Button color="danger" onClick={this.toggle}>
          {this.props.buttonLabel}+New Sighting
        </Button>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggle}>
            Tell Us About Your Sighting
          </ModalHeader>
          <ModalBody>
            <div className="new__sighting__form">
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="basic-addon1">
                    Sighting Date
                  </span>
                </div>
                <input
                  type="date"
                  className="form-control"
                  onChange={this.props.handleFieldChange}
                  id="date"
                  placeholder="Sighting Date"
                />
              </div>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="basic-addon1">
                    Sighting Location
                  </span>
                </div>
                <input
                  type="text"
                  className="form-control"
                  onChange={this.props.handleFieldChange}
                  id="location"
                  placeholder="Sighting Location"
                />
              </div>

              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="basic-addon1">
                    Bird Sighted
                  </span>
                </div>
                <select
                  defaultValue=""
                  name="bird"
                  id="birdId"
                  onChange={this.props.handleFieldChange}
                >
                  <option value="">Select a Bird</option>
                  {this.state.birds.map(b => (
                    <option key={b.id} id={b.id}>
                      {b.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="basic-addon1">
                    Sighting Summary
                  </span>
                </div>
                <textarea
                  type="text"
                  className="form-control"
                  onChange={this.props.handleFieldChange}
                  id="summary"
                  placeholder="Sighting Summary"
                />
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" 
            onClick={() => {
              this.toggle();
              this.props.constructNewSighting();
              }}>
              Add Sighting
            </Button>{" "}
            <Button color="secondary" onClick={this.toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

