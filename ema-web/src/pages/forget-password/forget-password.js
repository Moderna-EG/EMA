import React, { useState, useEffect } from 'react'
import './forget-password.css'
import logo from '../../images/EMA logo.png'
import { authRequest } from '../../api/requests'
import { useNavigate } from 'react-router-dom'
import { TailSpin } from 'react-loader-spinner'

const ForgetPassword = (props) => {

    const navigate = useNavigate()

    const [email, setEmail] = useState()

    const [emailError, setEmailError] = useState()
    const [errorMessage, setErrorMessage] = useState()

    const [successMessage, setSuccessMessage] = useState()
    const [loading, setLoading] = useState(false)

    const sendEmail = () => {

        if(!email) {
            return setEmail('البريد مطلوب')
        }

        setLoading(true)

        authRequest.post(`/auth/forget-password/${email}`, { email })
        .then(response => {
            setLoading(false)
            setSuccessMessage(response.data.message)

        })
        .catch(error => {
            setLoading(false)

            if(error.response.data.field === 'email') {
                return setEmailError(error.response.data.message)
            }

            if(error.response.data.field === 'gmail') {
                return setErrorMessage(error.response.data.message)
            }
        })
    }

   


    return (
        <div className="container-fluid">
            <div className="forget-password-form-container">
                <div className="forget-password-form-wrapper">
                    
                    <div className="forget-password-form-image">
                        <img src={logo} />    
                    </div>
                    <p className="form-success-message">{successMessage}</p>
                    <p className="form-error-message">{errorMessage}</p>
                    <div className="forget-password-form-body" onClick={e => {
                        setEmailError('')
                    }}>
                    <form>
                        <div>
                            <label>البريد الاكتروني</label>
                            <p>{emailError}</p>
                            <input type="email" onChange={e => setEmail(e.target.value)} placeholder="البريد الاكتروني" />
                        </div>
                        <div className="forget-password-form-btns">
                        { loading ? <TailSpin color="red" height={50} width={50} /> : <input type="submit" onClick={sendEmail} value="ارسل" /> }
                        </div>
                    </form>
                </div>
                </div>
            </div>
        </div>
    )
}

export default ForgetPassword