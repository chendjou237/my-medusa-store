/* eslint-disable prettier/prettier */
import { useEffect, useState } from "react"
import { Routes, Route } from "react-router-dom"
import Bar from "./Bar"
import Pie from "./Pie"
function AnalyticsIndex() {
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState([])
  const [error, setError] = useState(null)

  // function for the generation of names and quantity

  function getUsableDetails(productData) {
    const prodList = productData.products
 
    let formattedData = []
    for (let i = 0; i < prodList.length; i++){
        
      let quantity = 0
      const  currentProd = prodList[i].variants
      for (let j = 0; j < currentProd.length; j++){
       
        quantity += currentProd[j].inventory_quantity
       }
      formattedData.push({
        "name": prodList[i].title,
        "quantity":quantity
      })
    }
  return formattedData
  }

  useEffect(() => { 
      const  headers = new Headers({ "x-publishable-api-key": "pk_01GRESY6YDJ9ERHDQKXWVB48BW",});
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    headers.append('Access-Control-Allow-Origin', 'http://localhost:9000')
    headers.append("Access-Control-Allow-Methods", "GET, OPTIONS, POST, PUT")

    console.log(headers)
    fetch("http://localhost:9000/admin/products",{
      credentials: "include",
        method: 'GET',
      headers: headers,
    })
      .then((res) => { 
        if (res.ok) {
          return res
        }
        else {
          const error = new Error(`Error ${res.status}: ${res.statusText}`)
          // error.response = res
          throw error
        }
      }).then((res) => res.json())
      .then((products) => {
        setIsLoading(false)
          setData(getUsableDetails(products))
        setError(null)
      })
      .catch((err) => { 
        setError(err)
        setData([])
        setIsLoading(false)
      })
  },[])
  return (
    <div className=" ">
      <h1 className="font-extrabold text-2xl flex justify-center">AnalyTics Of the Shope</h1>
      <h2 className="font-bold text-lg">Total In Stock</h2>
      <Pie isLoading={isLoading} data={data} error={error} />
  <Bar />      
    </div>
  )
}

export default function Analytics() {
  return (
    <Routes>
      <Route  index element={<AnalyticsIndex />} />
    </Routes>
  )
}
