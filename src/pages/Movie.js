import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import endpoint from '../functions/endpoint'
import axios from 'axios'
import moment from 'moment'
import { Portal } from 'react-portal'
import NewReviewModal from '../modals/NewReviewModal'
import { Button } from 'react-bootstrap'

export default function Movie() {
  const { _id } = useParams()
  const [data, setData] = useState('')
  const [modal, setModal] = useState(false)

  const showModal = () => setModal(true)
  const hideModal = () => setModal(false)

  const saveReview = async (review) => {
    review.movie = data._id
    await axios.post(endpoint('reviews'), review)
    setData('')
    const res = await axios.get(endpoint('movies'), { params: { _id } })
    setData(res.data)
  }

  useEffect(() => {
    ;(async function () {
      const res = await axios.get(endpoint('movies'), { params: { _id } })
      setData(res.data)
    })()
  }, [setData, _id])

  if (data)
    return (
      <>
        <h2>{data.title}</h2>
        <h5>{data.rated}</h5>
        <h6>{moment(data.released_on).format('MMM D, YYYY')}</h6>
        <p>{data.plot}</p>
        <p>
          <span className="font-weight-bold">Directed by:</span> {data.director}
        </p>
        <p className="mb-5">
          <span className="font-weight-bold">Genre:</span> {data.genre}
        </p>
        <div className="d-flex justify-content-between align-items-center">
          <h2 className="mb-4 mr-3">Reviews</h2>
          <Button className="p-2" style={{ lineHeight: 0 }} onClick={showModal}>
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
        {data.reviews.map((review, i) => (
          <div key={`review-${i}`}>
            <p className="mb-1">
              <span className="font-weight-bold">Stars:</span>
              {' ' + review.stars}
            </p>
            <p className="mb-4">{review.text}</p>
          </div>
        ))}
        <Portal>
          <NewReviewModal show={modal} handleClose={hideModal} title={data.title} saveReview={saveReview} />
        </Portal>
      </>
    )
  else
    return (
      <>
        <div>Getting movie data. . .</div>
      </>
    )
}
