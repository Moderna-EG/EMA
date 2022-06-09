import React, { useState, useEffect } from 'react'
import './permissionForms.css'
import { userRequest } from '../../api/requests'
import { ThreeDots } from 'react-loader-spinner'

const ReceivePermissionForm = ({ modal }) => {

    const [items, setItems] = useState([])
    const [providers, setProviders] = useState([])
    const [item, setItem] = useState()
    const [quantity, setQuantity] = useState('')
    const [price, setPrice] = useState('')
    const [provider, setProvider] = useState()

    const [itemError, setItemError] = useState('')
    const [providerError, setProviderError] = useState('')
    const [quantityError, setQuantityError] = useState('')
    const [priceError, setPriceError] = useState('')

    const [loading, setLoading] = useState(false)
    

    const getItems = async () => {
        const response = await userRequest.get('/inventory/items')
        return response.data.items
    }   

    const getProviders = async () => {
        const response = await userRequest.get('/inventory/providers')
        return response.data.providers
    }

    const clearInputs = () => {
        setItem('')
        setProvider('')
        setQuantity('')
        setPrice('')
    }

    const submit = (e) => {
        e.preventDefault()

        setLoading(true)

        if(!item) {
            return setItemError('الصنف مطلوب')
        }

        if(!provider) {
            return setProviderError('المورد مطلوب')
        }

        if(!quantity) {
            return setQuantityError('الكمية مطلوبة')
        }

        if(!price) {
            return setPriceError('السعر مطلوب')
        }

        const pickedItem = items.filter(itemElement => itemElement.name === item)[0]
        const pickedProvider = providers.filter(providerElement => providerElement.name === provider)[0]

        const user = JSON.parse(localStorage.getItem('user')).user


        const receivePermissionData = {
            itemId: pickedItem.id,
            providerId: pickedProvider.id,
            userId: user.id,
            quantity: parseInt(quantity),
            price: parseInt(price),
        }

        userRequest.post('/inventory/receive-permissions', receivePermissionData)
        .then(response => { 
            setLoading(false)
            clearInputs()
            modal(response.data.message)
        })
        .catch(error => {

            setLoading(false)

            const response = error.response.data

            if(response.field === 'quantity') {
                setQuantityError(response.message)
            }

            if(response.field === 'price') {
                setPriceError(response.message)
            }
        })

    }

    useEffect(() => {

        getItems()
        .then(items => setItems(items))
        .catch(error => console.error(error))

        getProviders()
        .then(providers => setProviders(providers))
        .catch(error => console.log(error))
        
    }, [])


    return (
        <div className="permission-form">

            <div className="permission-form header">
                <h3>تسجيل اذن استلام بضاعة </h3>
            </div>
            <div>
                <form className="permission-form-main" id="receive-permission" onClick={e => {
            setItemError('')
            setProviderError('')
            setQuantityError('')
            setPriceError('')
        }}>
                    <div className="permission-form-left">
                        <div>
                            <label>الصنف</label>
                            <p>{itemError}</p>
                            <input list="items" value={item} placeholder="الصنف" onChange={e => setItem(e.target.value) } required />
                                <datalist id="items">
                                    {items.map(item => {
                                        return <option value={item.name} key={item.id}/>
                                    })}
                                </datalist>
                        </div>
                        <div>
                            <label>الكمية</label>
                            <p>{quantityError}</p>
                            <input type="numeric" value={quantity} onChange={e => setQuantity(e.target.value)} placeholder="كمية الصنف المستلم" required />
                        </div>
                        <div>
                            <label>السعر</label>
                            <p>{priceError}</p>
                            <input type="numeric" value={price} placeholder="سعر الصنف المستلم" onChange={e => setPrice(e.target.value)} required />
                        </div>
                    </div>
                    <div className="permission-form-right">
                        <div>
                            <label>المورد</label>
                            <p>{providerError}</p>
                            <input list="providers" value={provider} placeholder="المورد" onChange={e => setProvider(e.target.value)} required />
                                <datalist id="providers">
                                    {providers.map(provider => {
                                        return <option value={provider.name} key={provider.id}/>
                                    })}
                                </datalist>
                        </div>
                    </div>
                </form>
                <div className="permission-form-btns-container">
                        <div className="permission-form-btns-right"></div>
                        <div className="permission-form-btns-left">
                            <button onClick={clearInputs}>الغاء</button>
                            <button type="submit" form="receive-permission" className="submit-btn" value="تسجيل" onClick={submit}>
                                    { loading ? <ThreeDots color="white" height={20} width={20} /> : 'تسجيل'}
                            </button>
                        </div>
                </div>
            </div>
        </div>
    )
}

export default ReceivePermissionForm