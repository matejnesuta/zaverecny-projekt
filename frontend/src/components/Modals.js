import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

class RegModal extends Component {
  render() {
    return (
      <Modal show={this.props.show}>
        <Modal.Header>
          <Modal.Title>Registrace</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Registrace proběhla úspěšně
          <br />
          <Button variant="primary">Pokračovat</Button>
        </Modal.Body>
      </Modal>
    );
  }
}

export default RegModal;
