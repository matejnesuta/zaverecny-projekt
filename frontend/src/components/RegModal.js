import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";

class RegModal extends Component {
  state = {};
  render() {
    return (
      <Modal size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Modal heading
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Centered Modal</h4>
          <p>Registrace proběhla úspěšně.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.onRedirect}>Přejít na verifikaci</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default RegModal;
