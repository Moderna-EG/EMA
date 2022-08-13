import axios from 'axios'

const BASE_URL = 'https://ema-services.co/api'

//const BASE_URL = 'http://localhost:5000/api'


export const authRequest = axios.create({
    baseURL: BASE_URL
})

export const userRequest = axios.create({
    baseURL: BASE_URL,
    headers: { token: JSON.parse(localStorage.getItem('token')) }
})
