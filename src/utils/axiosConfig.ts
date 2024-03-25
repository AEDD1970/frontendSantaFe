import axios from 'axios'

const axiosConfig = axios.create({
  baseURL: process.env.API_URL
})

export default axiosConfig


