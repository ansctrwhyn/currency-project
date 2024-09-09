import { useEffect, useState } from "react"

export default function CurrencyComponent() {
    // const [currencyData, setCurrencyData] = useState([])
    const [allCurrency, setAllCurrency] = useState([])

    useEffect(() => {
        getData()
    }, [setAllCurrency])

    const getData = async () => {
        try {
            const dataAPI = await fetch('https://api.currencyfreaks.com/v2.0/rates/latest?apikey=6995fcf0e1344540b6295f74b118be78')
            const result = await dataAPI.json()
            setAllCurrency(result.rates)
        } catch (error) {
            console.log(error)
        }
    }

    const handleWeBuy = (currency) => {
        let manipulateDiscount = allCurrency[currency] * 0.5
        let result = Number(allCurrency[currency]) + Number(manipulateDiscount)
        return result
    }

    const handleWeSell = (currency) => {
        let manipulateDiscount = allCurrency[currency] * 0.5
        let result = Number(allCurrency[currency]) - Number(manipulateDiscount)
        return result
    }

    const filterCurrency = ['CAD', 'IDR', 'JPY', 'CHF', 'EUR', 'GBP'];

    let resultManipulate = () => {
        return filterCurrency.map(el => {
            const weBuyResult = handleWeBuy(el);
            const exchangeRate = allCurrency[el];
            const weSellResult = handleWeSell(el);

            return {
                currencyCode: el,
                weBuy: weBuyResult,
                exchangeRate: exchangeRate,
                weSell: weSellResult
            };
        });
    }

    const resultData = resultManipulate();

    return (
        <>
            <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
                <table className="table">
                    <thead>
                        <tr>
                            <th>CURRENCY</th>
                            <th>WE BUY</th>
                            <th>EXCHANGE RATE</th>
                            <th>WE SELL</th>
                        </tr>
                    </thead>
                    <tbody>
                        {resultData.map((data, i) => (
                            <tr key={i}>
                                <td>{data.currencyCode}</td>
                                <td>{data.weBuy}</td>
                                <td>{data.exchangeRate}</td>
                                <td>{data.weSell}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

