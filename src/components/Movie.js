import React from 'react'
import moment from 'moment'

export default function Movie({ title, rated, released_on, plot }) {
  return (
    <div className="border rounded-lg shadow" style={{ overflow: 'hidden' }}>
      <div className="d-flex align-items-start justify-content-between">
        <h5 className="px-3 pt-3 mb-0">{title}</h5>
        <h6 className=" mb-0 px-2 py-1 bg-light border-bottom border-left" style={{ whiteSpace: 'nowrap' }}>
          {rated}
        </h6>
      </div>
      <div className="p-3">
        <p>{moment(released_on).format('MMM YYYY')}</p>
        <p className="mb-0">{plot}</p>
      </div>
    </div>
  )
}
