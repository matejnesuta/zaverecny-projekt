import React, { Component } from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";

class GroupEditNameModal extends Component {
  state = {
    name: "",
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.value(this.state.name, "edit");
  };

  handleChange = (event) => {
    this.setState({
      name: event.target.value,
    });
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
                Upravit název skupiny
              </Modal.Title>
            </Col>
          </Row>
        </Modal.Header>
        <Modal.Body className="modal-body p-4">
          <Form onSubmit={this.handleSubmit}>
            <Form.Group>
              <Form.Control
                type="text"
                value={this.state.name}
                onChange={this.handleChange}
                placeholder="Zadejte nový název skupiny"
              />
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

export default GroupEditNameModal;
