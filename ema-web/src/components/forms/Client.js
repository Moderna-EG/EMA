import React, { useState, useEffect } from 'react'
import './permissionForms.css'
import { userRequest } from '../../api/requests'
import { TailSpin } from 'react-loader-spinner'
import { Badge } from '@material-ui/core'
import ContentPasteIcon from '@mui/icons-material/ContentPaste'
import { NavLink } from 'react-router-dom'
import SuccessMessage from '../success-message/success-message'



const ClientForm = () => {

    const [name,  setName] = useState()
    const [description, setDescription] = useState()
    const [code, setCode] = useState()
    const [operationDate, setOperationDate] = useState()

    const [nameError, setNameError] = useState()
    const [descriptionError, setDescriptionError] = useState()
    const [codeError, setCodeError] = useState()
    const [operationDateError, setOperationDateError] = useState()

    const [loading, setLoading] = useState(false)
    const [successText, setSuccessText] = useState()
    const [showSucess, setShowSuccess] = useState(false)


    const submit = () => {

        if(!name) {
            return setNameError('اسم العميل مطلوب')
        }

        if(!description) {
            return setDescriptionError('وصف العميل مطلوب')
        }

        if(!code) {
            return setCodeError('كود العميل مطلوب')
        }

        if(!operationDate) {
            return setOperationDateError('تاريخ التعامل مطلوب')
        }


        const clientData = {
            name,
            description,
            code: Number.parseInt(code),
            operationDate
        }

        setLoading(true)

        userRequest.post('/inventory/clients', clientData)
        .then(response => {
            setLoading(false)
            clearInputs()

            setSuccessText(response.data.message)
            setShowSuccess(true)

            setTimeout(() => setShowSuccess(false), 5000)
        })
        .catch(error => {
            setLoading(false)

            console.error(error)

            
            const errorData = error.response.data

            if(errorData.field === 'name')
                return setNameError(errorData.message)

            if(errorData.field === 'description')
                return setDescriptionError(errorData.message)

            if(errorData.field === 'code')
                return setCodeError(errorData.message)
            
            if(errorData.field === 'operationDate')
                return setOperationDateError(errorData.message) 

        })


    }

    const clearInputs = () => {
        setName('')
        setDescription('')
        setCode('')
        setOperationDate('')
    }


    return (
        <div className="permission-form">
            { showSucess ? <SuccessMessage message={successText} /> : '' }
            <div className="permission-form header">
                <h3>تسجيل  عميل </h3>
            </div>
            <div>
                <form className="permission-form-main" onClick={ e => {
                    setNameError('')
                    setDescriptionError('')
                    setCodeError('')
                    setOperationDateError('')
                }}>
                    <div className="permission-form-left">
                    <div>
                            <label>الاسم</label>
                            <p>{nameError}</p>
                            <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="اسم العميل" />
                        </div>
                        <div>
                            <label>الوصف</label>
                            <p>{descriptionError}</p>
                            <input type="text" value={description} onChange={e => setDescription(e.target.value)} placeholder="وصف العميل" />
                        </div>
                    </div>
                    <div className="permission-form-right">
                        <div>
                            <label>الكود</label>
                            <p>{codeError}</p>
                            <input type="text" value={code} onChange={e => setCode(e.target.value)} placeholder="كود العميل" />
                        </div>
                        <div>
                            <label>تاريخ التعامل</label>
                            <p>{operationDateError}</p>
                            <input type="date" value={operationDate} onChange={e => setOperationDate(e.target.value)} placeholder="تاريخ التعامل مع العميل" />
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

export default ClientForm