import React, { Component } from 'react'
import { Modal, Button } from 'react-bootstrap'
import axios from 'axios'
import endpoint from '../functions/endpoint'
import { Form } from 'react-bootstrap'

export default class AdminEditModal extends Component {
  state = {
    title: '',
    year: '',
    rated: '',
    released_on: '',
    genre: '',
    director: '',
    plot: '',
  }

  handler = (e) => this.setState({ [e.target.name]: e.target.value })

  setInitialValues = () => this.setState({ ...this.props.movie })

  saveChanges = (e) =>
    this.request(async () => {
      e.preventDefault()
      await axios.put(endpoint('movies'), this.state)
    })

  deleteMovie = () => this.request(async () => await axios.delete(endpoint('movies'), { params: { _id: this.state._id } }))

  request = async (axiosRequest) => {
    this.props.handleClose()
    this.props.setMovies('')
    await axiosRequest()
    this.props.getMovies()
  }

  render() {
    const { show, handleClose } = this.props
    return (
      <Modal show={show} onHide={handleClose} onEnter={this.setInitialValues}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Movie</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form id="adminForm" onSubmit={this.saveChanges}>
            <Form.Group>
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" value={this.state.title} onChange={this.handler} name="title" />
            </Form.Group>
            <Form.Group>
              <Form.Label>Year</Form.Label>
              <Form.Control type="text" value={this.state.year} onChange={this.handler} name="year" />
            </Form.Group>
            <Form.Group>
              <Form.Label>Rated</Form.Label>
              <Form.Control type="text" value={this.state.rated} onChange={this.handler} name="rated" />
            </Form.Group>
            <Form.Group>
              <Form.Label>Release Date</Form.Label>
              <Form.Control type="text" value={this.state.released_on} onChange={this.handler} name="released_on" />
            </Form.Group>
            <Form.Group>
              <Form.Label>Genre</Form.Label>
              <Form.Control type="text" value={this.state.genre} onChange={this.handler} name="genre" />
            </Form.Group>
            <Form.Group>
              <Form.Label>Director</Form.Label>
              <Form.Control type="text" value={this.state.director} onChange={this.handler} name="director" />
            </Form.Group>
            <Form.Group>
              <Form.Label>Plot</Form.Label>
              <Form.Control as="textarea" rows="5" type="text" value={this.state.plot} onChange={this.handler} name="plot" />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <div className="d-flex flex-grow-1">
            <Button variant="danger" className="d-flex align-items-center" onClick={this.deleteMovie}>
              <svg
                width="1em"
                height="1em"
                viewBox="0 0 16 16"
                className="bi bi-trash"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                <path
                  fillRule="evenodd"
                  d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                />
              </svg>
            </Button>
            <Button variant="secondary" onClick={handleClose} className="ml-auto mx-3">
              Close
            </Button>
            <Button variant="primary" type="submit" form="adminForm">
              Save Changes
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    )
  }
}
