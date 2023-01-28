import axios from "axios";

const axFetch = axios.create({
  baseURL: 'https://deezerdevs-deezer.p.rapidapi.com',
})

export default axFetch;