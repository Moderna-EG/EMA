import React, { useState } from 'react'
import './permissionForms.css'
import { userRequest } from '../../api/requests'
import { TailSpin } from 'react-loader-spinner'
import SuccessMessage from '../success-message/success-message'



const ItemForm = () => {

    const [name,  setName] = useState()
    const [code, setCode] = useState()

    const [nameError, setNameError] = useState()
    const [codeError, setCodeError] = useState()


    const [loading, setLoading] = useState(false)
    const [successText, setSuccessText] = useState()
    const [showSucess, setShowSuccess] = useState(false)


    const submit = () => {

        if(!name) {
            return setNameError('اسم الصنف مطلوب')
        }

        if(!code) {
            return setCodeError('كود الصنف مطلوب')
        }



        const itemData = {
            name,
            code: Number.parseInt(code),
        }

        setLoading(true)

        userRequest.post('/inventory/items', itemData)
        .then(response => {
            setLoading(false)
            clearInputs()

            setSuccessText(response.data.message)
            setShowSuccess(true)

            setTimeout(() => setShowSuccess(false), 2000)
        })
        .catch(error => {
            setLoading(false)

            console.error(error)
   
            const errorData = error.response.data

            if(errorData.field === 'name')
                return setNameError(errorData.message)

            if(errorData.field === 'code')
                return setCodeError(errorData.message)

        })


    }

    const clearInputs = () => {
        setName('')
        setCode('')
    }


    return (
        <div className="permission-form">
            { showSucess ? <SuccessMessage message={successText} /> : '' }
            <div className="permission-form header">
                <h3>تسجيل  صنف </h3>
            </div>
            <div>
                <form className="permission-form-main" onClick={ e => {
                    setNameError('')
                    setCodeError('')
                }}>
                    <div className="permission-form-left">
                    <div>
                            <label>الاسم</label>
                            <p>{nameError}</p>
                            <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="اسم الصنف" />
                        </div>
                        <div>
                            <label>الكود</label>
                            <p>{codeError}</p>
                            <input type="text" value={code} onChange={e => setCode(e.target.value)} placeholder="كود الصنف" />
                        </div>
                    </div>
                    <div className="permission-form-right">
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

export default ItemForm