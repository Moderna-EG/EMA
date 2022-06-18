import React, { useState, useEffect } from 'react'
import './permissionForms.css'
import { userRequest } from '../../api/requests'
import { ThreeDots } from 'react-loader-spinner'
import { Badge } from '@material-ui/core'
import ContentPasteIcon from '@mui/icons-material/ContentPaste'
import { NavLink } from 'react-router-dom'


const ReceivePermissionForm = ({ modal }) => {

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

    const clearInputs = () => {
        setItem('')
        setQuantity('')
        setPrice('')
    }

    const submit = (e) => {
        e.preventDefault()

        if(!item) {
            return setItemError('الصنف مطلوب')
        }

        const receivePermissionItems = JSON.parse(localStorage.getItem('receivePermissionItems'))

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

        const pickedItem = items.filter(itemElement => itemElement.name === item)[0]

        const user = JSON.parse(localStorage.getItem('user')).user

        const itemInfo = {
            name: pickedItem.name,
            code: pickedItem.code,
            id: pickedItem.id,
            quantity: quantity,
            price: price,
            bookValue: price * quantity
        }


        localStorage.setItem('receivePermissionItems', JSON.stringify([...receivePermissionItems, itemInfo]))

        setCartItems(cartItems + 1)
        clearInputs()
    }

    useEffect(() => {

        localStorage.setItem('receivePermissionItems', JSON.stringify([]))

        getItems()
        .then(items => setItems(items))
        .catch(error => console.error(error))
        
    }, [])


    return (
        <div className="permission-form">

            <div className="permission-form header">
                <h3>تسجيل اذن استلام بضاعة </h3>
                <Badge badgeContent={cartItems} color="primary"> 
                    <ContentPasteIcon style={{ fontSize: '2rem' }} />
                </Badge>
            </div>
            <div>
                <form className="permission-form-main" id="receive-permission" onClick={e => {
            setItemError('')
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
                    
                </form>
                <div className="permission-form-btns-container">
                        <div className="permission-form-btns-right"></div>
                        <div className="permission-form-btns-left">
                            <button onClick={clearInputs}>الغاء</button>
                                <button className="submit-btn">
                                <NavLink to="/inventory/receive-permissions/cart">
                                    تاكيد 
                                </NavLink>
                                </button>
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