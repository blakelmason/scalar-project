import create from 'zustand'
import axios from 'axios'

const endpoint = (functionName) => `/.netlify/functions/${functionName}`

const useStore = create((set, get) => ({
  movies: '',
  getMovies: async () => {
    const res = await axios.get(endpoint('movies'))
    set({ movies: res.data.sort(compareDates) })
  },
  sortMoviesByDate: (order) => {
    const movies = get().movies.slice().sort(compareDates)
    if (order === 'newest') set({ movies })
    if (order === 'oldest') set({ movies: movies.reverse() })
  },
}))

function compareDates(a, b) {
  if (a.released_on > b.released_on) return -1
  else return 1
}

export default useStore
