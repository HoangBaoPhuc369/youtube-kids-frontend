import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function DeleteModal({
  show,
  handleClose,
  title,
  subtitle,
  typeBtn,
  handleClear,
}) {
  return (
    <>
      <Modal show={show} onHide={handleClose} className="modal-delete">
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{subtitle}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Hủy
          </Button>
          <Button variant="primary" onClick={() => handleClear(typeBtn)}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DeleteModal;
