import axios from 'axios'
import { BASE_URL } from './env'

// Create the client with the base url
const axiosClient = axios.create({
	baseURL: BASE_URL,
})

export default axiosClient
