import React, { Component } from 'react'
import { Modal, Button } from 'react-bootstrap'
import axios from 'axios'
import endpoint from '../functions/endpoint'
import { Form } from 'react-bootstrap'
import moment from 'moment'

export default class AdminNewModal extends Component {
  state = {
    title: 'Batman',
    year: moment().format('YYYY'),
    rated: 'G',
    released_on: moment().format('YYYY-MM-DD'),
    genre: 'Action, Adventure, Fantasy',
    director: 'Batman',
    plot: "Because I'm Batman!",
  }

  handler = (e) => this.setState({ [e.target.name]: e.target.value })

  addMovie = async (e) => {
    e.preventDefault()
    this.props.handleClose()
    this.props.setMovies('')
    await axios.post(endpoint('movies'), this.state)
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
          <Form id="adminAddForm" onSubmit={this.addMovie}>
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
          <Button variant="secondary" onClick={handleClose} className="ml-auto mx-3">
            Close
          </Button>
          <Button variant="primary" type="submit" form="adminAddForm">
            Add Movie
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }
}
