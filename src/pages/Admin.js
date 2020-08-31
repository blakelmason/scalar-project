import React, { useState } from 'react'
import store from '../store'
import moment from 'moment'
import './Admin.scss'
import { Button, Table } from 'react-bootstrap'
import { Portal } from 'react-portal'
import AdminEditModal from '../modals/AdminEditModal'
import AdminAddModal from '../modals/AdminAddModal'
import AdminInfoModal from '../modals/AdminInfoModal'
import axios from 'axios'
import endpoint from '../functions/endpoint'
import styled from 'styled-components'

const Span = styled.span`
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`

export default function Admin() {
  const setMovies = store((state) => state.setMovies)
  const getMovies = store((state) => state.getMovies)
  const movies = store((state) => state.movies)
  const [movie, setMovie] = useState({})
  const [editModal, setEditModal] = useState(false)
  const [addModal, setAddModal] = useState(false)
  const [infoModal, setInfoModal] = useState(false)

  const handleEditShow = (movie) => {
    setMovie(movie)
    setEditModal(true)
  }

  const handleInfoShow = (movie) => {
    setMovie(movie)
    setInfoModal(true)
  }

  const reset = async () => {
    setMovies('')
    await axios.get(endpoint('reset'))
    getMovies()
  }

  return (
    <>
      <h4 className="mb-3">Add/Remove Movies</h4>
      {movies ? (
        <>
          <div className="table-responsive">
            <Table hover className="border mb-4 admin-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Title</th>
                  <th>Release Date</th>
                  <th>Edit</th>
                </tr>
              </thead>
              <tbody>
                {movies.map((movie, i) => (
                  <tr key={`movie-row-${i}`}>
                    <th>{i + 1}</th>
                    <td>
                      <Span onClick={() => handleInfoShow(movie)}>{movie.title}</Span>
                    </td>
                    <td>{moment(movie.released_on).format('MMM D, YYYY')}</td>
                    <td>
                      <Button className="p-1" style={{ lineHeight: 0 }} onClick={() => handleEditShow(movie)}>
                        <svg
                          width="1em"
                          height="1em"
                          viewBox="0 0 16 16"
                          className="bi bi-pencil-square"
                          fill="currentColor"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                          <path
                            fillRule="evenodd"
                            d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                          />
                        </svg>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
          <div className="d-flex">
            <Button onClick={reset}>Reset</Button>
            <Button onClick={() => setAddModal(true)} className="ml-auto d-flex align-items-center">
              <svg
                width="1em"
                height="1em"
                viewBox="0 0 16 16"
                className="bi bi-plus-square"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"
                />
                <path
                  fillRule="evenodd"
                  d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"
                />
              </svg>
            </Button>
          </div>
        </>
      ) : (
        <div>Getting movies. . .</div>
      )}
      <Portal>
        <AdminEditModal
          show={editModal}
          handleClose={() => setEditModal(false)}
          movie={movie}
          getMovies={getMovies}
          setMovies={setMovies}
        />
        <AdminAddModal
          show={addModal}
          handleClose={() => setAddModal(false)}
          movie={movie}
          getMovies={getMovies}
          setMovies={setMovies}
        />
        <AdminInfoModal show={infoModal} handleClose={() => setInfoModal(false)} movie={movie} />
      </Portal>
    </>
  )
}
