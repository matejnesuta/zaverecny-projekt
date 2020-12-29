import React, { Component } from "react";
import { Modal, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

class ProfModal extends Component {
  handleClick = (event) => {
    event.preventDefault();
    this.props.onHide();
  };

  render() {
    return (
      <Modal
        show={this.props.show}
        onHide={this.props.onHide}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header className="modal-header">
          <Row>
            <Col>
              <Modal.Title className="modal-title">
                Nastavení profilu proběhlo úspěšně!
              </Modal.Title>
            </Col>
          </Row>
        </Modal.Header>
        <Modal.Body className="modal-body p-4">
          Změny byly uloženy.
          <br />
          <Button
            variant="primary"
            className="px-5 mt-4"
            onClick={this.handleClick}
          >
            Rozumím
          </Button>
        </Modal.Body>
      </Modal>
    );
  }
}

export default ProfModal;
