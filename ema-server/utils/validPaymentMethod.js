const config = require('../config/config')
const isPaymentMethod = (method) => {
    for(let i=0;i<config.PAYMENT_METHOD.length;i++) {
        if(method == config.PAYMENT_METHOD[i]) {
            return true
        }
    }

    return false
}

module.exports = { isPaymentMethod }