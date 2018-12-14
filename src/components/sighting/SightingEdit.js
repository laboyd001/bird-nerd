import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

export default class SightingEdit extends React.Component {

  // constructor and toggle are for the modal
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  // below we render the edit modal
  // the birdName variable below is so that when we edit we can see the original bird name listed in the edit bird field
  render() {
    const birdName = this.props.birds.find(b=> b.id === this.props.sighting.birdId) || {};
    return (
      <div>
        <Button color="danger"
        onClick={() => {
                  this.toggle()
                  this.props.handleEditClick(
                  this.props.sighting.date,
                  this.props.sighting.location,
                  this.props.sighting.birdId,
                  this.props.sighting.summary,
                  this.props.sighting.lat,
                  this.props.sighting.lng,
                  this.props.sighting.id
                );
              }}>
          {this.props.buttonLabel}Edit
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
                  id="editDate"
                  placeholder="Sighting Date"
                  defaultValue={this.props.sighting.date}
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
                  id="editLocation"
                  placeholder="Sighting Location"
                  defaultValue={this.props.sighting.location}
                />
              </div>

              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="basic-addon1">
                    Bird Sighted
                  </span>
                </div>
                <select
                  name="bird"
                  id="editBirdId"
                  onChange={this.props.handleFieldChange}
                  defaultValue={this.props.sighting.birdId}
                >
                  <option defaultValue={this.props.sighting.birdId}>{birdName.name}</option>
                  {this.props.birds.map(b => (
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
                <textarea rows="5"
                  type="text"
                  className="form-control"
                  onChange={this.props.handleFieldChange}
                  id="editSummary"
                  placeholder="Sighting Summary"
                  defaultValue={this.props.sighting.summary}

                />
              </div>
            </div>

            <div className=" hide">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="basic-addon1">
                    Sighting ID
                  </span>
                </div>
            <input
              type="text"
              className=" hide"
              onChange={this.props.handleFieldChange}
              id="editId"
              placeholder="sighting id"
              defaultValue={this.props.sighting.id}
            />
          </div>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" 
            onClick={() => {
              this.toggle();
              this.props.constructEditedSighting();
              }}>
              Edit Sighting
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

