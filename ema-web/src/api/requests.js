import axios from 'axios'

const BASE_URL = 'http://137.184.116.235:5000/api'


export const authRequest = axios.create({
    baseURL: BASE_URL
})

export const userRequest = axios.create({
    baseURL: BASE_URL,
    headers: { token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJuYW1lIjoi2YXYrdmF2K8g2LXZhNin2K0iLCJlbWFpbCI6Im1vc2FsYWhAZ21haWwuY29tIiwicGFzc3dvcmQiOiJtb3NhbGFoNzciLCJwaG9uZSI6IjAxMDY1NjMwMzMyIiwicm9sZSI6ItmF2KfZhNmDIiwicmVnaXN0cmF0aW9uZGF0ZSI6IjIwMjItMDYtMDhUMDA6MDA6MDAuMDAwWiJ9LCJpYXQiOjE2NTQ2ODYzMDYsImV4cCI6MTY1NzI3ODMwNn0.jyO1RS4en3PfgAjZvbWBTQJPNrCRhPY3pbydW9CzkgA' }
})
