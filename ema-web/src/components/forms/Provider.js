import React, { useState } from 'react'
import './permissionForms.css'
import { userRequest } from '../../api/requests'
import { TailSpin } from 'react-loader-spinner'
import SuccessMessage from '../success-message/success-message'



const ProviderForm = () => {

    const [name,  setName] = useState()
    const [description, setDescription] = useState()
    const [code, setCode] = useState()
    const [address, setAddress] = useState()
    const [paymentMethod, setPaymentMethod] = useState()
    const [phone, setPhone] = useState()

    const [nameError, setNameError] = useState()
    const [descriptionError, setDescriptionError] = useState()
    const [codeError, setCodeError] = useState()
    const [addressError, setAddressError] = useState()
    const [phoneError, setPhoneError] = useState()
    const [paymentMethodError, setPaymentMethodError] = useState()

    const [loading, setLoading] = useState(false)
    const [successText, setSuccessText] = useState()
    const [showSucess, setShowSuccess] = useState(false)


    const submit = () => {

        if(!name) {
            return setNameError('اسم المورد مطلوب')
        }

        if(!description) {
            return setDescriptionError('وصف المورد مطلوب')
        }

        if(!code) {
            return setCodeError('كود المورد مطلوب')
        }

        if(!address) {
            return setAddressError('عنوان المورد مطلوب')
        }

        if(!phone) {
            return setPhoneError('هاتف المورد مطلوب')
        }

        if(!paymentMethod) {
            return setPaymentMethodError('طريقة دفع المورد مطلوبة')
        }

        const providerData = {
            name,
            description,
            code: Number.parseInt(code),
            address,
            phone,
            paymentMethod
        }

        setLoading(true)

        userRequest.post('/inventory/providers', providerData)
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

            if(errorData.field === 'description')
                return setDescriptionError(errorData.message)

            if(errorData.field === 'code')
                return setCodeError(errorData.message)
            
            if(errorData.field === 'address')
                return setAddress(errorData.message)

            if(errorData.field === 'phone')
                return setPhoneError(errorData.message)

            if(errorData.field === 'paymentMethod')
                return setPaymentMethod(errorData.message)


        })


    }

    const clearInputs = () => {
        setName('')
        setDescription('')
        setCode('')
        setAddress('')
        setPhone('')
        setPaymentMethod('')
    }


    return (
        <div className="permission-form">
            { showSucess ? <SuccessMessage message={successText} /> : '' }
            <div className="permission-form header">
                <h3>تسجيل  مورد </h3>
            </div>
            <div>
                <form className="permission-form-main" onClick={ e => {
                    setNameError('')
                    setDescriptionError('')
                    setCodeError('')
                    setAddressError('')
                    setPhoneError('')
                    setPaymentMethodError('')
                }}>
                    <div className="permission-form-left">
                    <div>
                            <label>الاسم</label>
                            <p>{nameError}</p>
                            <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="اسم المورد" />
                        </div>
                        <div>
                            <label>الوصف</label>
                            <p>{descriptionError}</p>
                            <input type="text" value={description} onChange={e => setDescription(e.target.value)} placeholder="وصف المورد" />
                        </div>
                        <div>
                            <label>الكود</label>
                            <p>{codeError}</p>
                            <input type="text" value={code} onChange={e => setCode(e.target.value)} placeholder="كود المورد" />
                        </div>
                    </div>
                    <div className="permission-form-right">
                        <div>
                                <label>العنوان</label>
                                <p>{addressError}</p>
                                <input type="text" value={address} onChange={e => setAddress(e.target.value)} placeholder="عنوان المورد" />
                            </div>
                            <div>
                                <label>الهاتف</label>
                                <p>{phoneError}</p>
                                <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="هاتف المورد" />
                            </div>
                            <div>
                                <label>طريقة الدفع</label>
                                <p>{paymentMethodError}</p>
                                <input list="payment-method" value={paymentMethod} onChange={ e => setPaymentMethod(e.target.value)} placeholder="طريقة دفع المورد" />
                                <datalist id="payment-method">
                                    <option value="كاش" />
                                    <option value="اجل" />
                                </datalist>        
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

export default ProviderForm