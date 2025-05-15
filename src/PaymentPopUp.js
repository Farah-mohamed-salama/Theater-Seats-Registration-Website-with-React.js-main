import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const PaymentPopUp = ({ show, handleClose, message }) => {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Payment Status</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="text-success">{message}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="success" onClick={handleClose}>
          Continue
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PaymentPopUp;