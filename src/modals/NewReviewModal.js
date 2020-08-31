import React, { Component } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'

export default class NewReviewModal extends Component {
  state = {
    stars: 1,
    text: '',
  }

  handleChange = (e) => this.setState({ [e.target.name]: e.target.value })

  render() {
    const { show, handleClose, saveReview, title } = this.props
    return (
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>New Review</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5 className="mb-4">{title}</h5>
          <Form>
            <Form.Group>
              <Form.Label>Stars</Form.Label>
              <Form.Control
                name="stars"
                value={this.state.stars}
                as="select"
                style={{ maxWidth: 100 }}
                onChange={this.handleChange}
              >
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Review</Form.Label>
              <Form.Control value={this.state.text} as="textarea" rows="5" name="text" onChange={this.handleChange} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button onClick={() => saveReview(this.state)}>Save</Button>
        </Modal.Footer>
      </Modal>
    )
  }
}
