import React, { useState, useEffect } from 'react'
import './modal.css'
import { userRequest } from '../../api/requests'
import SuccessModal from './success'
import { TailSpin } from 'react-loader-spinner'

const ItemModal = ({ modal }) => {

    const [name,  setName] = useState()
    const [code, setCode] = useState()

    const [nameError, setNameError] = useState()
    const [codeError, setCodeError] = useState()

    const [showSuccessModal, setShowSuccessModal] = useState(false)
    const [successMessage, setSuccessMessage] = useState('')

    const [loading, setLoading] = useState(false)


    const closeModals = () => {
        setShowSuccessModal(false)
        modal()
    }

    const submitItem = () => {

        setLoading(true)

        userRequest.post('/inventory/items', { name, code })
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
        })
        
    }


    return (
        <div className="modal-container">
            {showSuccessModal ? <SuccessModal closeModal={closeModals} message={successMessage} /> : null }
            <div class="modal-wrapper">
                <div className="modal-header">
                    <h3>
                    انشاء صنف
                    </h3>
                </div>
                <form onClick={e => {
                    setNameError('')
                    setCodeError('')
                }}>
                    <div className="modal-form-left-half">
                        <div>
                            <label>الاسم</label>
                            <p>{nameError}</p>
                            <input type="text" onChange={e => setName(e.target.value)} placeholder="اسم الصنف" required/>
                        </div>
                        <div>
                            <label>كود</label>
                            <p>{codeError}</p>
                            <input type="text" onChange={e => setCode(parseInt(e.target.value))} placeholder="كود الصنف" required/>
                        </div>
                    </div>
                </form>
                <div className="modal-footer">
                    <button className="cancel" onClick={modal}>الغاء</button>  
                    <button className="submit" onClick={submitItem}>
                        { loading ? <TailSpin color="white" height={20} width={20} /> : 'تسجيل'}    
                    </button>     
                </div>
            </div>
        </div>
    )
}

export default ItemModal