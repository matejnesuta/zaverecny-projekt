import React, { Component } from "react";
import { Modal, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

class RegModal extends Component {
  render() {
    return (
      <Modal
        show={this.props.show}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header className="modal-header">
          <Row>
            <Col>
              <Modal.Title className="modal-title">
                Registrace proběhla úspěšně!
              </Modal.Title>
            </Col>
          </Row>
        </Modal.Header>
        <Modal.Body className="modal-body p-4">
          Na Váš email byl zaslán email s verifikačním klíčem. Pro dokončení
          registrace zadejte po přesměrování klíč.
          <br />
          {/*<Link to="/verification">*/}
          <Button variant="primary" className="px-5 mt-4">
            Pokračovat
          </Button>
          {/*</Link>*/}
        </Modal.Body>
      </Modal>
    );
  }
}

export default RegModal;
