import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Chart from 'chart.js/auto'
import { Bar } from 'react-chartjs-2'
import { userRequest } from '../../../api/requests'
import { TailSpin } from 'react-loader-spinner'

const ProvidersQuantityGraph = () => {

    const navigate = useNavigate()

    const [fromDate, setFromDate] = useState()
    const [toDate, setToDate] = useState()

    const [fromDateError, setFromDateError] = useState('')
    const [toDateError, setToDateError] = useState()

    const [data, setData] = useState([])
    const [labels, setLabels] = useState([])
    const [loading, setLoading] = useState(true)

    const providerId = window.location.pathname.split('/')[3]

    useEffect(() => {

        userRequest.get(`/inventory/providers/${providerId}/stats`)
        .then(response => {

            setLoading(false)
            
            const items = response.data.items

            if(items.length === 0)
                return

            const itemNames = extractItemNames(items)
            const itemsQuantities = extractItemQuantity(items)


            setLabels(itemNames)
            setData(itemsQuantities)
        })
        .catch(error => {

            setLoading(false)
            console.error(error)
        })

    }, [])



    const extractItemNames = (items) => {

        let names = []

        for(let i=0;i<items.length;i++) {
            names.push(items[i].name)
        }

        return names
    }

    const extractItemQuantity = (items) => {

        let quantities = []

        for(let i=0;i<items.length;i++) {
            quantities.push(Number.parseInt(items[i].totalquantity))
        }

        return quantities
    }

    const submit = () => {

        if(!fromDate) return setFromDateError('التاريخ مطلوب')

        if(!toDate) return setToDateError('التاريخ مطلوب')

        setLoading(true)

        userRequest.get(`/inventory/providers/${providerId}/stats/${fromDate}/${toDate}`)
        .then(response => {
            setLoading(false)

            const items = response.data.items

            if(items.length === 0) {
                setLabels([])
                setData([])

                return  
            }

            const itemsNames = extractItemNames(items)
            const itemsSumsList = extractItemQuantity(items)

            setLabels(itemsNames)
            setData(itemsSumsList)
            
        })
        .catch(error => {
            setLoading(false)
            console.error(error)

            if(error.response.data.field === 'toDate')
                return setToDateError(error.response.data.message)

            if(error.response.data.field === 'fromDate')
                return setFromDateError(error.response.data.message)
        })

    }


    return (
        <>
            <div>
                <div className="graph-input-container">
                    <div className="graph-header">
                        <h2>كمية اصناف المورد</h2>
                    </div>
                    <div>
                        <div>
                            <label>من</label>
                            <p className="error-message">{fromDateError}</p>
                            <input type="date" onClick={ e => setFromDateError() } onChange={ e => setFromDate(e.target.value) } />
                        </div>
                        <div>
                            <label>الي</label>
                            <p className="error-message">{toDateError}</p>
                            <input type="date" onClick={ e => setToDateError() } onChange={ e => setToDate(e.target.value) } />
                        </div>
                        <div>
                            {
                                loading ?
                                <div className="loading-graph">
                                    <TailSpin width="30" height="30" color="red" />
                                </div>
                                :
                                <button onClick={submit}>تم</button>

                            }
                        </div>
                        
                    </div>
                </div>
                <Bar 
                data={{
                    labels: labels,
                    datasets: [{
                        data: data,
                        barPercentage: 0,
                        borderRadius: 0,
                        barThickness: 40,
                        maxBarThickness: 50,
                        backgroundColor: [
                            
                        ],
                        borderColor: [
                            'rgb(255, 99, 132)',
                            'rgb(255, 159, 64)',
                            'rgb(255, 205, 86)'
                        ],
                        borderWidth: 1
                    }]
                }}

                options={{
                    animation: true,
                    plugins: {
                        title: {
                            display: true,
                            text: 'اصناف المورد كمية',
                            fullSize: true
                        },

                        legend: {
                            display: false,
                            position: 'bottom'
                        }
                    }
                }}
            />                    
            </div>       
        </>
    )
}
export default ProvidersQuantityGraph