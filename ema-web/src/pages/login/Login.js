import React, { useState, useEffect } from 'react'
import './login.css'
import logo from '../../images/EMA logo.png'
import { authRequest } from '../../api/requests'
import { useNavigate } from 'react-router-dom'
import { TailSpin } from 'react-loader-spinner'
import { NavLink } from 'react-router-dom'

const Login = (props) => {

    const navigate = useNavigate()

    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

    const [emailError, setEmailError] = useState()
    const [passwordError, setPasswordError] = useState()

    const [authError, setAuthError] = useState()

    const [loading, setLoading] = useState(false)

    const loginUser = (e) => {
        e.preventDefault()

        setLoading(true)
        
        authRequest.post('/auth/login', { email, password })
        .then(response => {
            setLoading(false)
            
            const user = response.data

            if(user.accepted) {
                localStorage.setItem('user', JSON.stringify(user))
                navigate('/inventory/items')
            }
        })
        .catch(error => {
            setLoading(false)
            
            const response = error.response.data

            if(response.field === 'email') {
                setEmailError(response.message)
            }

            if(response.field === 'password') {
                setPasswordError(response.message)
            }

            if(response.field === 'authorization') {
                setAuthError(response.message)
            }
        })
    }


    return (
        <div className="container-fluid">
            <div className="login-form-container">
                <div className="login-form-wrapper">
                    
                    <div className="login-form-image">
                        <img src={logo} />    
                        
                    </div>
                    <p className="login-error-message">{authError}</p>
                    <div className="login-form-body" onClick={e => {
                        setEmailError('')
                        setPasswordError('')
                        setAuthError('')
                    }}>
                    <form>
                        <div>
                            <label>???????????? ??????????????????</label>
                            <p>{emailError}</p>
                            <input type="email" onChange={e => setEmail(e.target.value)} placeholder="???????????? ??????????????????" />
                        </div>
                        <div>
                            <label>???????? ????????????</label>
                            <p>{passwordError}</p>
                            <input type="password" onChange={e => setPassword(e.target.value)} placeholder="???????? ????????????" />
                        </div>
                        <div className="login-form-btns">
                        { loading ? <TailSpin color="red" height={50} width={50} /> : <input type="submit" value="?????????? ????????????" onClick={loginUser}/> }
                        </div>
                        <div>
                            <span className="forgot-password">
                                <NavLink to="/forget-password">
                                    ???? ???????? ???????? ????????   
                                </NavLink>
                            </span>
                        </div>
                    </form>
                </div>
                </div>
            </div>
        </div>
    )
}

export default Login