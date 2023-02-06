import React from "react"

import { Pie as PieChart } from "../../components/analytics/Pie"

const Pie = ({ isLoading, data, error }) => {

  if (isLoading) {
    return (
      <div className="m-4 md:m-10 mt-24 p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl">
        <div className="w-full">
          
        </div>
      </div>
    )
  } else if (error) {
    return (
      <div className="m-4 md:m-10 mt-24 p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl">
        <div className="w-full">

        </div>
      </div>
    )
  } else {
    console.log("hello This is the data")
    console.log(data)
    return (
      <div className="m-4 md:m-10 mt-24 p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl">
        <div className="w-full">
          <PieChart id="chart-pie" data={data} legendVisiblity height="full" />
        </div>
      </div>
    )
  }
}

export default Pie
