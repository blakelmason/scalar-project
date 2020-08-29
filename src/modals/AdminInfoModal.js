import React from 'react'
import { Modal, Button } from 'react-bootstrap'

export default function AdminInfoModal({ show, handleClose, movie }) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Movie Info</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div style={{ disaply: 'grid', gap: '1rem' }}>
          {Object.keys(movie).map((item, i) => (
            <div key={`movie-info-row-${i}`}>
              {item}: {movie[item]}
            </div>
          ))}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
