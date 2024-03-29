import React, { useState, useEffect } from 'react'
import './permissionForms.css'
import { userRequest } from '../../api/requests'
import { TailSpin } from 'react-loader-spinner'
import { Badge } from '@material-ui/core'
import ContentPasteIcon from '@mui/icons-material/ContentPaste'
import { NavLink } from 'react-router-dom'



const ExchangePermissionForm = () => {

    const [items, setItems] = useState([])
    const [item, setItem] = useState()
    const [quantity, setQuantity] = useState('')
    const [price, setPrice] = useState('')
    const [cartItems, setCartItems] = useState(0)

    const [itemError, setItemError] = useState('')
    const [quantityError, setQuantityError] = useState('')
    const [priceError, setPriceError] = useState('')

    const [loading, setLoading] = useState(false)

    const getItems = async () => {
        const response = await userRequest.get('/inventory/items')
        return response.data.items
    }

    const submit = () => {


        if(!item) {
            return setItemError('الصنف مطلوب')
        }

        const exchangePermissionItems = JSON.parse(localStorage.getItem('exchangePermissionItems'))

        const checkItem = items.filter(recordedItem => recordedItem.name === item)

        if(checkItem.length === 0) return setItemError('هذا الصنف غير موجود')

        const checkCartItem = exchangePermissionItems.filter(recordedItem => recordedItem.name === item)

        if(checkCartItem.length === 1) return setItemError('هذا الصنف مسجل مسبقا') 

        if(!quantity || !Number.parseInt(quantity)) {
            return setQuantityError('الكمية مطلوبة')
        }

        setQuantity(Number.parseInt(quantity))

        setLoading(true)

        const pickedItem = items.filter(itemElement => itemElement.name === item)[0]
        setLoading(true)

        userRequest.get(`/inventory/items/${pickedItem.id}`)
        .then(response => {

            setLoading(false)

            const ITEM_QUANTITY = response.data.item[0].quantity

            if(ITEM_QUANTITY < quantity) {
                return setQuantityError(`يوجد فقط ${ITEM_QUANTITY} قطع`)
            }

            userRequest.get(`/inventory/items/${pickedItem.id}/average-price`)
            .then(priceResponse => {


                const PRICE = Math.trunc(priceResponse.data.price)

                const user = JSON.parse(localStorage.getItem('user')).user
            
                const itemInfo = {
                    name: pickedItem.name,
                    code: pickedItem.code,
                    itemId: pickedItem.id,
                    quantity: Number.parseInt(quantity),
                    price: PRICE,
                    bookValue: PRICE * parseInt(quantity)
                }

                localStorage.setItem('exchangePermissionItems', JSON.stringify([...exchangePermissionItems, itemInfo]))

                setCartItems(cartItems + 1)
                clearInputs()
            })
        })
        .catch(error => {
            setLoading(false)
            console.error(error)
        })

    }

    const clearInputs = () => {
        setItem('')
        setQuantity('')
        setPrice('')
        setItemError('')
        setQuantityError('')
        setPriceError('')
    }

    useEffect(() => {

        localStorage.setItem('exchangePermissionItems', JSON.stringify([]))

        getItems()
        .then(items => setItems(items))
        .catch(error => console.error(error))

    }, [])


    return (
        <div className="permission-form">
            <div className="permission-form header">
                <h3>تسجيل اذن صرف بضاعة </h3>
                <Badge badgeContent={cartItems} color="primary">
                    <ContentPasteIcon style={{ fontSize: '2rem' }} />
                </Badge>
            </div>
            <div>
                <form className="permission-form-main" onClick={ e => {
                    setItemError('')
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
                            <input type="numeric" value={quantity} onChange={e => setQuantity(e.target.value)} placeholder="كمية الصنف المصرف" />
                        </div>
                    </div>
                </form>
                <div className="permission-form-btns-container">
                        <div className="permission-form-btns-right"></div>
                        <div className="permission-form-btns-left">
                            <button onClick={clearInputs}>الغاء</button>
                            <NavLink to="/inventory/exchange-permissions/cart">
                                <button className="submit-btn">
                                    تاكيد                                
                                </button>
                                </NavLink>
                            <button className="submit-btn" onClick={submit}>
                                { loading ? <TailSpin color="white" height={20} width={20} /> : 'تسجيل' }
                            </button>
                        </div>
                </div>
            </div>
        </div>
    )
}

export default ExchangePermissionForm