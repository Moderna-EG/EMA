const ReceivePermissionsItemsModel = require('./models/inventory/ReceivePermissionItem')

ReceivePermissionsItemsModel.getAverageBookValueOfItem(1)
.then(data => {
    console.log(`average book value of item: ${data[0].avg}`)
})
.catch(error => console.error(error))

ReceivePermissionsItemsModel.getAveragePriceOfItem(1)
.then(data => {
    console.log(`average price of item: ${data[0].avg}`)
})
.catch(error => console.error(error))

ReceivePermissionsItemsModel.getAverageBookValueOfItemByDate(1, '2022-6-12')
.then(data => {
    console.log(`average book value by date of item: ${data[0].avg}`)
})
.catch(error => console.error(error))

ReceivePermissionsItemsModel.getAveragePriceOfItemByDate(1, '2022-6-12')
.then(data => {
    console.log(`average price by date of item: ${data[0].avg}`)
})
.catch(error => console.error(error))