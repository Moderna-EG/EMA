import React, { useState, useEffect } from 'react'
import './permissionForms.css'
import { userRequest } from '../../api/requests'

const ExchangePermissionForm = ({ modal }) => {

    const [items, setItems] = useState([])
    const [clients, setClients] = useState([])
    const [item, setItem] = useState()
    const [quantity, setQuantity] = useState('')
    const [price, setPrice] = useState('')
    const [client, setClient] = useState()

    const [itemError, setItemError] = useState('')
    const [clientError, setClientError] = useState('')
    const [quantityError, setQuantityError] = useState('')
    const [priceError, setPriceError] = useState('')

    const getItems = async () => {
        const response = await userRequest.get('/inventory/items')
        return response.data.items
    }

    const getClients = async () => {
        const response = await userRequest.get('/inventory/clients')
        return response.data.clients
    }

    const submit = () => {

        if(!item) {
            return setItemError('الصنف مطلوب')
        }

        if(!client) {
            return setClientError('العميل مطلوب')
        }

        if(!quantity) {
            return setQuantityError('الكمية مطلوبة')
        }

        if(!price) {
            return setPriceError('السعر مطلوب')
        }

        const pickedItem = items.filter(itemElement => itemElement.name === item)[0]
        const pickedClient = clients.filter(clientElement => clientElement.name === client)[0]
        
        const user = JSON.parse(localStorage.getItem('user')).user

        const exchangePermissionData = {
            itemId: pickedItem.id,
            clientId: pickedClient.id,
            userId: user.id,
            quantity: quantity,
            price: price,
        }

        userRequest.post('/inventory/exchange-permissions', exchangePermissionData)
        .then(response =>{
            clearInputs()
             modal(response.data.message)
            })
        .catch(error => {
            const response = error.response.data

            if(response.field === 'quantity') {
                setQuantityError(response.message)
            }

            if(response.field === 'price') {
                setPriceError(response.message)
            }
        })
    }

    const clearInputs = () => {
        setItem('')
        setClient('')
        setQuantity('')
        setPrice('')
    }

    useEffect(() => {

        getItems()
        .then(items => setItems(items))
        .catch(error => console.error(error))

        getClients()
        .then(clients => setClients(clients))
        .catch(error => console.log(error))

    }, [])

    return (
        <div className="permission-form">
            <div className="permission-form header">
                <h3>تسجيل اذن صرف بضاعة </h3>
            </div>
            <div>
                <form className="permission-form-main" onClick={ e => {
                    setItemError('')
                    setClientError('')
                    setQuantityError('')
                    setPriceError('')
                }}>
                    <div className="permission-form-left">
                        <div>
                            <label>الصنف</label>
                            <p>{itemError}</p>
                            <input list="items" value={item} placeholder="الصنف" onChange={e => setItem(e.target.value)}/>
                                <datalist id="items">
                                    { items.map(item => {
                                        return <option value={item.name} key={item.id} />
                                    })}
                                </datalist>
                        </div>
                        <div>
                            <label>الكمية</label>
                            <p>{quantityError}</p>
                            <input type="numeric" value={quantity} onChange={e => setQuantity(parseInt(e.target.value))} placeholder="كمية الصنف المصرف" />
                        </div>
                        <div>
                            <label>السعر</label>
                            <p>{priceError}</p>
                            <input type="numeric" value={price} onChange={e => setPrice(parseInt(e.target.value))} placeholder="سعر الصنف المصرف" />
                        </div>
                    </div>
                    <div className="permission-form-right">
                        <div>
                            <label>المحاجر</label>
                            <p>{clientError}</p>
                            <input list="stonepits" value={client} onChange={e => setClient(e.target.value)} placeholder="المستلم" />
                                <datalist id="stonepits">
                                    { clients.map(client => {
                                        return <option value={ client.name } key={ client.id } />
                                    })}
                                </datalist>
                        </div>
                    </div>
                </form>
                <div className="permission-form-btns-container">
                        <div className="permission-form-btns-right"></div>
                        <div className="permission-form-btns-left">
                            <button onClick={clearInputs}>الغاء</button>
                            <button className="submit-btn" onClick={submit}>تسجيل</button>
                        </div>
                </div>
            </div>
        </div>
    )
}

export default ExchangePermissionForm