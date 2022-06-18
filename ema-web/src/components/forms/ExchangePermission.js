import React, { useState, useEffect } from 'react'
import './permissionForms.css'
import { userRequest } from '../../api/requests'
import { ThreeDots } from 'react-loader-spinner'
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

        setLoading(true)

        if(!item) {
            return setItemError('الصنف مطلوب')
        }

        const receivePermissionItems = JSON.parse(localStorage.getItem('exchangePermissionItems'))

        for(let i=0;i<receivePermissionItems.length;i++) {

            if(receivePermissionItems[i].name === item) {
                return setItemError('هذا الصنف مسجل مسبقا')
            }
        }

        if(!quantity) {
            return setQuantityError('الكمية مطلوبة')
        }

        if(!price) {
            return setPriceError('السعر مطلوب')
        }

        setLoading(true)

        const pickedItem = items.filter(itemElement => itemElement.name === item)[0]

        userRequest.get(`/inventory/items/${pickedItem.id}`)
        .then(response => {

            setLoading(false)

            const ITEM_QUANTITY = response.data.item[0].quantity

            if(ITEM_QUANTITY < quantity) {
                return setQuantityError(`يوجد فقط ${ITEM_QUANTITY} قطع`)
            }

            const user = JSON.parse(localStorage.getItem('user')).user
            
            const itemInfo = {
                name: pickedItem.name,
                code: pickedItem.code,
                id: pickedItem.id,
                quantity: quantity,
                price: price,
                bookValue: price * quantity
            }

            localStorage.setItem('exchangePermissionItems', JSON.stringify([...receivePermissionItems, itemInfo]))

            setCartItems(cartItems + 1)
            clearInputs()
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
                            <input type="numeric" value={quantity} onChange={e => setQuantity(parseInt(e.target.value))} placeholder="كمية الصنف المصرف" />
                        </div>
                        <div>
                            <label>السعر</label>
                            <p>{priceError}</p>
                            <input type="numeric" value={price} onChange={e => setPrice(parseInt(e.target.value))} placeholder="سعر الصنف المصرف" />
                        </div>
                    </div>
                </form>
                <div className="permission-form-btns-container">
                        <div className="permission-form-btns-right"></div>
                        <div className="permission-form-btns-left">
                            <button onClick={clearInputs}>الغاء</button>
                            <button className="submit-btn">
                                <NavLink to="/inventory/exchange-permissions/cart">
                                    تاكيد 
                                </NavLink>
                                </button>
                            <button className="submit-btn" onClick={submit}>
                                { loading ? <ThreeDots color="white" height={20} width={20} /> : 'تسجيل' }
                            </button>
                        </div>
                </div>
            </div>
        </div>
    )
}

export default ExchangePermissionForm