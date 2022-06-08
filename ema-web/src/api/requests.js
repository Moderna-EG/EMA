import axios from 'axios'

const BASE_URL = 'http://localhost:5000/api'

const TOKEN = JSON.parse(localStorage.getItem('user'))

export const authRequest = axios.create({
    baseURL: BASE_URL
})

export const userRequest = axios.create({
    baseURL: BASE_URL,
    headers: { token: TOKEN.token }
})
