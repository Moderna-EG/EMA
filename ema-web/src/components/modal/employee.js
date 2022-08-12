import React, { useState, useEffect } from 'react'
import './modal.css'
import { userRequest } from '../../api/requests'
import SuccessModal from './success'
import { ThreeDots } from 'react-loader-spinner'

const EmployeeModal = ({ modal }) => {

    const [name,  setName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [phone, setPhone] = useState()

    const [nameError, setNameError] = useState()
    const [emailError, setEmailError] = useState()
    const [passwordError, setPasswordError] = useState()
    const [phoneError, setPhoneError] = useState()

    /*const [showSuccessModal, setShowSuccessModal] = useState(false)
    const [successMessage, setSuccessMessage] = useState('')*/

    const [loading, setLoading] = useState(false)


    const closeModals = () => {
        modal()
    }

    const submitItem = () => {

        setLoading(true)

        /*userRequest.post('/inventory/items', { name, code })
        .then(response => {
            setLoading(false)
            setShowSuccessModal(true)
            setSuccessMessage(response.data.message)
        })
        .catch(error => {
            setLoading(false)
            const response = error.response.data

            if(response.field === 'name') {
                setNameError(response.message)
            }

            if(response.field === 'code') {
                setCodeError(response.message)
            }
        })*/
        
    }


    return (
        <div className="modal-container">
            <div class="modal-wrapper">
                <div className="modal-header">
                    <h3>
                    انشاء صنف
                    </h3>
                </div>
                <form onClick={e => {
                    setNameError('')
                    setEmailError('')
                    setPasswordError('')
                    setPhoneError('')
                }}>
                    <div className="modal-form-left-half">
                        <div>
                            <label>الاسم</label>
                            <p>{nameError}</p>
                            <input type="text" onChange={e => setName(e.target.value)} placeholder="اسم الموظف" required/>
                        </div>
                        <div>
                            <label>البريد</label>
                            <p>{emailError}</p>
                            <input type="text" onChange={e => setEmail(e.target.value)} placeholder="بريد الموظف" required/>
                        </div>
                        <div>
                            <label>كلمة المرور</label>
                            <p>{passwordError}</p>
                            <input type="text" onChange={e => setPassword(e.target.value)} placeholder="كلمة مرور الموظف" required/>
                        </div>
                        <div>
                            <label>الهاتف</label>
                            <p>{phoneError}</p>
                            <input type="text" onChange={e => setPhone(e.target.value)} placeholder="رقم الهاتف" required/>
                        </div>
                    </div>
                </form>
                <div className="modal-footer">
                    <button className="cancel" onClick={modal}>الغاء</button>  
                    <button className="submit" onClick={submitItem}>
                        { loading ? <ThreeDots color="white" height={20} width={20} /> : 'تسجيل'}    
                    </button>     
                </div>
            </div>
        </div>
    )
}

export default EmployeeModal