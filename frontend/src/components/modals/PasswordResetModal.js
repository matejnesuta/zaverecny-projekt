import React, { Component } from "react";
import { Modal, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

class PasswordResetModal extends Component {
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
                Ověření profilu proběhlo úspěšně!
              </Modal.Title>
            </Col>
          </Row>
        </Modal.Header>
        <Modal.Body className="modal-body p-4">
          Nyní se můžete přihlásit.
          <br />
          <Button
            variant="primary"
            className="px-5 mt-4"
            onClick={this.handleClick}
          >
            <Link
              to="/login"
              style={{ color: "white", textDecoration: "none" }}
            >
              Pokračovat
            </Link>
          </Button>
        </Modal.Body>
      </Modal>
    );
  }
}

export default PasswordResetModal;
