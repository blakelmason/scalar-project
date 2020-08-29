import create from 'zustand'
import axios from 'axios'
import endpoint from './functions/endpoint'

const useStore = create((set, get) => ({
  movies: '',
  setMovies: (movies) => set({ movies }),
  getMovies: async () => {
    const res = await axios.get(endpoint('movies'))
    set({ movies: res.data.sort(compareDates) })
  },
}))

function compareDates(a, b) {
  if (a.released_on > b.released_on) return -1
  else return 1
}

export default useStore
