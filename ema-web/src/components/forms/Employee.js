import React, { useState } from 'react'
import './permissionForms.css'
import { userRequest } from '../../api/requests'
import { TailSpin } from 'react-loader-spinner'
import SuccessMessage from '../success-message/success-message'



const EmployeeForm = () => {

    const [name,  setName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [phone, setPhone] = useState()

    const [nameError, setNameError] = useState()
    const [emailError, setEmailError] = useState()
    const [passwordError, setPasswordError] = useState()
    const [phoneError, setPhoneError] = useState()

    const [loading, setLoading] = useState(false)

    const [successText, setSuccessText] = useState()
    const [showSucess, setShowSuccess] = useState(false)


    const submit = () => {

        if(!name) {
            return setNameError('اسم الموظف مطلوب')
        }

        if(!email) {
            return setEmailError('بريد الموظف مطلوب')
        }

        if(!password) {
            return setPasswordError('كلمة المرور الموظف مطلوبة')
        }

        if(!phone) {
            return setPhoneError('هاتف الموظف مطلوب')
        }

        const employeeData = {
            name,
            email,
            password,
            phone,
            role: 'موظف'
        }

        setLoading(true)

        userRequest.post('/inventory/users', employeeData)
        .then(response => {
            setLoading(false)   
            clearInputs()

            setSuccessText(response.data.message)
            setShowSuccess(true)

            setTimeout(() => setShowSuccess(false), 2000)
        })
        .catch(error => {
            setLoading(false)

            
            const errorData = error.response.data

            if(errorData.field === 'name')
                return setNameError(errorData.message)

            if(errorData.field === 'email')
                return setEmailError(errorData.message)

            if(errorData.field === 'password')
                return setPasswordError(errorData.message)

            if(errorData.field === 'phone')
                return setPhoneError(errorData.message)


        })


    }

    const clearInputs = () => {
        setName('')
        setEmail('')
        setPhone('')
        setPassword('')
    }


    return (
        <div className="permission-form">
            { showSucess ? <SuccessMessage message={successText} /> : '' }
            <div className="permission-form header">
                <h3>تسجيل  موظف </h3>
            </div>
            <div>
                <form className="permission-form-main" onClick={ e => {
                    setNameError('')
                    setEmailError('')
                    setPasswordError('')
                    setPhoneError('')
                }}>
                    <div className="permission-form-left">
                    <div>
                            <label>الاسم</label>
                            <p>{nameError}</p>
                            <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="اسم الموظف" />
                        </div>
                        <div>
                            <label>البريد</label>
                            <p>{emailError}</p>
                            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="بريد الموظف" />
                        </div>
                        <div>
                            <label>كلمة المرور</label>
                            <p>{passwordError}</p>
                            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="كلمة مرور الموظف" />
                        </div>
                        <div>
                            <label>الهاتف</label>
                            <p>{phoneError}</p>
                            <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="هاتف الموظف" />
                        </div>
                    </div>
                </form>
                <div className="permission-form-btns-container">
                        <div className="permission-form-btns-right"></div>
                        <div className="permission-form-btns-left">
                            <button onClick={clearInputs}>الغاء</button>
                            <button className="submit-btn" onClick={submit}>
                                { loading ? <TailSpin color="white" height={20} width={20} /> : 'تسجيل' }
                            </button>
                        </div>
                </div>
            </div>
        </div>
    )
}

export default EmployeeForm