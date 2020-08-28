import React from 'react'
import store from '../store'

export default function Movies() {
  const moviesCount = store(({ moviesCount }) => moviesCount)
  return <div>Movies: {moviesCount}</div>
}
