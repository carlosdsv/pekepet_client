import axios from 'axios'

export default axios.create({
  baseURL: 'https://peke-server.herokuapp.com',
})
