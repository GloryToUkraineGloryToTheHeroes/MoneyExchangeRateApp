import React from 'react'

const privatLink = 'https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5'

export const Privat = () => {
    const [USD_UAH, set_USD_UAH] = React.useState(1)
    const [EUR_UAH, set_EUR_UAH] = React.useState(1)
    const [presentCurrency1, setPresentCurrency1] = React.useState('USD')
    const [presentCurrency2, setPresentCurrency2] = React.useState('UAH')
    const [inputValue, setInputValue] = React.useState(1)
    const [outputValue, setOutputValue] = React.useState(1)

    const currencys1 = [{ccy: 'USD'}, {ccy: 'EUR'}, {ccy: 'UAH'}]
    const currencys2 = [{ccy: 'UAH'}, {ccy: 'EUR'}, {ccy: 'USD'}]

    const getValue = async () => {
        try{
            const thisHeaders = []
            thisHeaders['Content-Type'] = 'application/json'
            const resData = await fetch(privatLink, {body: null, method: 'GET', headers: thisHeaders})
            const data = await resData.json()
            let usduah
            let euruah
            
            for(let i = 0; i < data.length; i++){
                if(data[i].base_ccy === 'UAH'){
                    if(data[i].ccy === 'USD'){
                        set_USD_UAH(((parseFloat(data[i].buy) + parseFloat(data[i].sale))/2).toFixed(2))
                        usduah = ((parseFloat(data[i].buy) + parseFloat(data[i].sale))/2).toFixed(2)
                        console.log(data[i])
                    }else if(data[i].ccy === 'EUR'){
                        set_EUR_UAH(((parseFloat(data[i].buy) + parseFloat(data[i].sale))/2).toFixed(2))
                        euruah = ((parseFloat(data[i].buy) + parseFloat(data[i].sale))/2).toFixed(2)
                        console.log(data[i])
                    }
                    
                }
            }

            const result = firstCalculateValue(1, presentCurrency1, presentCurrency2, usduah, euruah)
            console.log(result)
            setOutputValue(result)
            
        }catch(err){
            console.log(err)
        }
    }

    const firstCalculateValue = (calculateInputValue, currencys1, currency2, USD_UAH, EUR_UAH) => {
        if(currencys1 === 'USD' && currency2 === 'UAH'){
            return calculateInputValue*USD_UAH
        }else if(currencys1 === 'EUR' && currency2 === 'UAH'){
            return calculateInputValue*EUR_UAH
        }
    }

    const calculateValue = (calculateInputValue, currencys1, currency2) => {
        if(currencys1 === 'USD' && currency2 === 'UAH'){
            return calculateInputValue*USD_UAH
        }else if(currencys1 === 'EUR' && currency2 === 'UAH'){
            return calculateInputValue*EUR_UAH
        }else if(currencys1 === 'UAH' && currency2 === 'USD'){
            return calculateInputValue/USD_UAH
        }else if(currencys1 === 'UAH' && currency2 === 'EUR'){
            return calculateInputValue/EUR_UAH
        }else if((currencys1 === 'UAH' && currency2 === 'UAH')||(currencys1 === 'USD' && currency2 === 'USD')||(currencys1 === 'EUR' && currency2 === 'EUR')){
            return calculateInputValue
        }else if(currencys1 === 'USD' && currency2 === 'EUR'){
            return calculateInputValue*(USD_UAH/EUR_UAH)
        }else if(currencys1 === 'EUR' && currency2 === 'USD'){
            return calculateInputValue/(USD_UAH/EUR_UAH)
        }
    }

    const reverseCalculateValue = (calculateInputValue, currencys1, currency2) => {
        if(currencys1 === 'USD' && currency2 === 'UAH'){
            console.log(USD_UAH)
            return calculateInputValue/USD_UAH
        }else if(currencys1 === 'EUR' && currency2 === 'UAH'){
            return calculateInputValue/EUR_UAH
        }else if(currencys1 === 'UAH' && currency2 === 'USD'){
            return calculateInputValue*USD_UAH
        }else if(currencys1 === 'UAH' && currency2 === 'EUR'){
            return calculateInputValue*EUR_UAH
        }else if((currencys1 === 'UAH' && currency2 === 'UAH')||(currencys1 === 'USD' && currency2 === 'USD')||(currencys1 === 'EUR' && currency2 === 'EUR')){
            return calculateInputValue
        }else if(currencys1 === 'USD' && currency2 === 'EUR'){
            return calculateInputValue/(USD_UAH/EUR_UAH)
        }else if(currencys1 === 'EUR' && currency2 === 'USD'){
            return calculateInputValue*(USD_UAH/EUR_UAH)
        }
    }

    React.useEffect(() => {
        getValue()
        // eslint-disable-next-line
    }, [])

    return (
        <div style={{display: 'flex'}}>
            <div style={{margin: '0 100px 0 20px'}}>
                <h2>USD / UAH</h2>
                <h2>{USD_UAH}</h2>
                <h2>EUR / UAH</h2>
                <h2>{EUR_UAH}</h2>
            </div>
            <div>
                <h2>Calculator</h2>
                <div style={{display: 'flex'}}>
                    
                    <input style={{width: '230px'}} type='number' min='0' value={inputValue} onChange={e => {
                        setInputValue(e.target.value)
                        const result = calculateValue(e.target.value, presentCurrency1, presentCurrency2)
                        setOutputValue(result)
                        console.log(result)
                    }} />
                    
                    <div className="input-field col s12">
                        <select style={{display: 'flex'}} onChange={e => {
                            setPresentCurrency1(e.target.value)
                            console.log(e.target.value)
                            const result = calculateValue(1, e.target.value, presentCurrency2)
                            setInputValue(1)
                            setOutputValue(result)
                        }}>
                            {
                                currencys1.map(elem => (
                                    <option value={elem.ccy}
                                        key={elem.ccy}
                                    >{elem.ccy}</option>
                                ))
                            }
                        </select>
                    </div>

                </div>

                <div style={{display: 'flex'}}>
                    
                    <input style={{width: '230px'}} type='number' min='0' value={outputValue} onChange={e => {
                        setOutputValue(e.target.value)
                        const result = reverseCalculateValue(e.target.value, presentCurrency1, presentCurrency2)
                        setInputValue(result)
                    }} />
                    
                    <div className="input-field col s12">
                        <select style={{display: 'flex'}} onChange={e => {
                            setPresentCurrency2(e.target.value)
                            console.log(e.target.value)
                            const result = reverseCalculateValue(1, presentCurrency1, e.target.value)
                            setOutputValue(1)
                            setInputValue(result)
                        }}>
                            {
                                currencys2.map(elem => (
                                    <option value={elem.ccy}
                                        key={elem.ccy}
                                    >{elem.ccy}</option>
                                ))
                            }
                        </select>
                    </div>

                </div>
            </div>

           
        </div>
    )
}




