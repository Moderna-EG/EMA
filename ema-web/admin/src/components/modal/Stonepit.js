import React from 'react'
import './modal.css'

const StonepitModal = () => {
    return (
        <div className="modal-container">
            <div class="modal-wrapper">
                <div className="modal-header">
                    <h3>
                    انشاء محجر
                    </h3>
                </div>
                <form>
                    <div className="modal-form-left-half">
                        <div>
                            <label>الاسم</label>
                            <input type="text" placeholder="اسم الصنف" />
                        </div>
                        <div>
                            <label>كود</label>
                            <input type="text" placeholder="كود الصنف" />
                        </div>
                        <div>
                            <label>تاريخ التشغيل</label>
                            <input type="text" placeholder="تاريخ التشغيل" />
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

export default StonepitModal