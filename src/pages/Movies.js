import React, { useState, useEffect } from 'react'
import store from '../store'
import bp from '../css/breakpoints'
import styled from 'styled-components'
import { Form, Button } from 'react-bootstrap'
import moment from 'moment'
import { Link } from 'react-router-dom'

const Grid = styled.div`
  display: grid;
  gap: 3rem;
  justify-content: center;
  grid-template-columns: repeat(1, minmax(auto, 400px));
  @media (min-width: ${bp.md}px) {
    grid-template-columns: repeat(2, minmax(auto, 400px));
    justify-content: space-around;
  }
  @media (min-width: ${bp.xl}px) {
    grid-template-columns: repeat(3, minmax(auto, 400px));
    justify-content: space-between;
  }
`

export default function Movies() {
  const moviesFromStore = store((state) => state.movies)
  const [movies, setMovies] = useState('')
  const [searchInput, setSearchInput] = useState('')
  const [select, setSelect] = useState('newest')
  const [clear, setClear] = useState(false)

  const setDefault = () => {
    setMovies([...moviesFromStore])
    setClear(false)
    setSearchInput('')
    setSelect('newest')
  }

  const searchMovies = (e) => {
    e.preventDefault()
    setClear(true)
    if (searchInput === '') {
      setDefault()
      setClear(false)
    } else
      setMovies(
        moviesFromStore.filter((movie) => {
          if (check('title') || check('plot')) return true
          else return false
          function check(property) {
            return movie[property].toUpperCase().includes(searchInput.toUpperCase())
          }
        })
      )
  }

  const handleInputChange = (e) => setSearchInput(e.target.value)
  const handleSelectChange = (e) => {
    setSelect(e.target.value)
    setMovies([...movies.sort(compare(e.target.value))])
    function compare(direction) {
      if (direction === 'newest')
        return function (a, b) {
          if (a.released_on > b.released_on) return -1
          else return 1
        }
      else
        return function (a, b) {
          if (a.released_on > b.released_on) return 1
          else return -1
        }
    }
  }

  useEffect(() => {
    if (Array.isArray(moviesFromStore)) setMovies([...moviesFromStore])
  }, [moviesFromStore])

  if (!movies) return <div>Getting Movies. . .</div>
  return (
    <>
      <div className="d-md-flex align-items-center mb-4">
        <div className="d-flex align-items-center mb-3 mb-md-0">
          <p className="mb-0 mr-3" style={{ whiteSpace: 'nowrap' }}>
            Sort by date:
          </p>
          <Form.Control value={select} style={{ maxWidth: 200 }} as="select" onChange={handleSelectChange}>
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
          </Form.Control>
        </div>
        <div className="border-right mx-3 align-self-stretch" />
        <Form onSubmit={searchMovies} className="d-flex">
          <Form.Control type="text" className="mr-3" placeholder="search" value={searchInput} onChange={handleInputChange} />
          <Button className="mr-3" type="submit">
            Search
          </Button>
          <Button
            disabled={!clear}
            variant={clear ? 'danger' : 'secondary'}
            className={`align-self-center p-1`}
            style={{ lineHeight: 0 }}
            onClick={setDefault}
          >
            <svg
              width="1em"
              height="1em"
              viewBox="0 0 16 16"
              className="bi bi-x-circle"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path fillRule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
              <path
                fillRule="evenodd"
                d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
              />
            </svg>
          </Button>
        </Form>
      </div>
      {movies.length === 0 ? (
        <div>No matching results.</div>
      ) : (
        <Grid>
          {movies.map((movie, i) => (
            <Movie {...movie} key={`movie-${i}`} />
          ))}
        </Grid>
      )}
    </>
  )
}

function Movie({ title, rated, released_on, plot, _id }) {
  return (
    <div className="border rounded-lg shadow d-flex flex-column" style={{ overflow: 'hidden' }}>
      <div className="d-flex align-items-start justify-content-between">
        <h5 className="px-3 pt-3 mb-0">{title}</h5>
        <h6 className=" mb-0 px-2 py-1 bg-light border-bottom border-left" style={{ whiteSpace: 'nowrap' }}>
          {rated}
        </h6>
      </div>
      <div className="p-3 d-flex flex-column flex-grow-1">
        <p>{moment(released_on).format('MMM YYYY')}</p>
        <p>{plot}</p>
        <Link className="mt-auto" to={`/movie/${_id}`}>
          Reviews/Details{' '}
          <svg
            width="1em"
            height="1em"
            viewBox="0 0 16 16"
            className="bi bi-chevron-double-right"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M3.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L9.293 8 3.646 2.354a.5.5 0 0 1 0-.708z"
            />
            <path
              fillRule="evenodd"
              d="M7.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L13.293 8 7.646 2.354a.5.5 0 0 1 0-.708z"
            />
          </svg>
        </Link>
      </div>
    </div>
  )
}
