import React, { useState } from 'react'
import './new-password.css'
import logo from '../../images/EMA logo.png'
import { authRequest } from '../../api/requests'
import { useNavigate } from 'react-router-dom'
import { TailSpin } from 'react-loader-spinner'

const NewPassword = () => {

    const navigate = useNavigate()

    const [isValid, setIsValid] = useState(false)

    const [password, setPassword] = useState()
    const [confirmPassword, setConfirmPassword] = useState()

    const [passwordError, setPasswordError] = useState()
    const [confirmPasswordError, setConfirmPasswordError] = useState()
    const [authError, setAuthError] = useState()

    const [loading, setLoading] = useState(false)

    const token = window.location.pathname.split('/')[2]


    const submit = (e) => {

        e.preventDefault()

        if(!password) return setPasswordError('كلمة المرور مطلوبة')

        if(!confirmPassword) return setConfirmPasswordError('تاكيد كلمة المرور مطلوبة')

        if(password !== confirmPassword) return setConfirmPasswordError('يجب ان تطابق كلمة المرور')

        setLoading(true)

        authRequest.patch(`/auth/users/${token}/password`, { newPassword: password })
        .then(response => {

            setLoading(false)
            
            navigate('/login')
        })
        .catch(error => {

            setLoading(false)
            setAuthError(error.response.data.message)
        })
    }
   


    return (
        <div className="container-fluid">
            <div className="forget-password-form-container">
                <div className="forget-password-form-wrapper">
                    
                    <div className="forget-password-form-image">
                        <img src={logo} />    
                    </div>
                    <p className="login-error-message">{authError}</p>
                    <div className="forget-password-form-body" onClick={e => {
                        setPasswordError('')
                        setConfirmPasswordError('')
                    }}>
                    <form onSubmit={submit}>
                        <div>
                            <label>كلمة المرور</label>
                            <p>{passwordError}</p>
                            <input type="password" onChange={e => setPassword(e.target.value)} placeholder="كلمة المرور" />
                        </div>
                        <div>
                            <label>تاكيد كلمة المرور</label>
                            <p>{confirmPasswordError}</p>
                            <input type="password" onChange={e => setConfirmPassword(e.target.value)} placeholder="تاكيد كلمة المرور" />
                        </div>
                        <div className="forget-password-form-btns">
                        { loading ? <TailSpin color="red" height={50} width={50} /> : <input type="submit" value="تاكيد" /> }
                        </div>
                    </form>
                </div>
                </div>
            </div>
        </div>
    )
}

export default NewPassword