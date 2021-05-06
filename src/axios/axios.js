import axios from 'axios'

export default axios.create({
    baseURL: 'https://mywords-b1c16-default-rtdb.europe-west1.firebasedatabase.app/'
})