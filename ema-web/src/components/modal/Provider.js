import React from 'react'
import './modal.css'

const ProviderModal = () => {
    return (
        <div className="modal-container">
            <div class="modal-wrapper">
                <div className="modal-header">
                    <h3>
                    انشاء مورد
                    </h3>
                </div>
                <form>
                    <div className="modal-form-left-half">
                        <div>
                            <label>الاسم</label>
                            <input type="text" placeholder="اسم المورد" />
                        </div>
                        <div>
                            <label>كود</label>
                            <input type="text" placeholder="كود المورد" />
                        </div>
                        <div>
                            <label>العنوان</label>
                            <input type="text" placeholder="عنوان المورد" />
                        </div>
                    </div>
                    <div className="modal-form-line"></div>
                    <div className="modal-form-right-half">
                        <div>
                            <label>رقم التليفون</label>
                            <input type="text" placeholder="رقم تليفون المورد" />
                        </div>
                        <div>
                            <label>طريقة الدفع</label>
                            <input list="payment-method" placeholder="طريقة دفع المورد" />
                            <datalist id="payment-method">
                                <option value="كاش" />
                                <option value="اجل" />
                            </datalist>
                        </div>
                    </div>
                </form>
                <div className="modal-footer">
                    <button className="cancel">الغاء</button>  
                    <button className="submit">انشاء</button>     
                </div>
            </div>
        </div>
    )
}

export default ProviderModal