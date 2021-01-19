import React, { Component } from "react";
import { Modal, Button, Row, Col } from "react-bootstrap";

class UserRemoveModal extends Component {
  answerYes = (event) => {
    event.preventDefault();
    this.props.value(true);
  };

  answerNo = (event) => {
    event.preventDefault();
    this.props.value(false);
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
              <Modal.Title className="modal-title">Smazat úkol</Modal.Title>
            </Col>
          </Row>
        </Modal.Header>
        <Modal.Body className="modal-body p-4">
          Opravdu si přejete smazat úkol {this.props.name}?
          <br />
          <Button
            variant="primary"
            className="px-5 mt-4"
            onClick={this.answerYes}
          >
            Ano
          </Button>
          <Button
            variant="primary"
            className="px-5 mt-4 mx-4"
            onClick={this.answerNo}
          >
            Ne
          </Button>
        </Modal.Body>
      </Modal>
    );
  }
}

export default UserRemoveModal;
