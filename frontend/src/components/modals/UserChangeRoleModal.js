import React, { Component } from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";

class UserRemoveModal extends Component {
  state = {
    value: this.props.userRole,
  };

  handleChange = (event) => {
    this.setState({
      value: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.value(this.state.value, "changeRole");
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
                Nastavit roli {this.props.name}
              </Modal.Title>
            </Col>
          </Row>
        </Modal.Header>
        <Modal.Body className="modal-body p-4">
          <Form onSubmit={this.handleSubmit}>
            <Form.Group>
              <Form.Control
                as="select"
                value={this.state.name}
                onChange={this.handleChange}
              >
                <option value={this.props.userRole}>
                  {this.props.userRole === "user" ? "Uživatel" : "Moderátor"}
                </option>
                <option
                  value={this.props.userRole === "user" ? "moderator" : "user"}
                >
                  {this.props.userRole === "user" ? "Moderátor" : "Uživatel"}
                </option>
              </Form.Control>
            </Form.Group>
            <Button type="submit" variant="primary" className="px-5 mt-4 mx-4">
              Potvrdit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }
}

export default UserRemoveModal;
