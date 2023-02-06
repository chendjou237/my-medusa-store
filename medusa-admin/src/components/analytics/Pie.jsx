import React from "react"
import {
  AccumulationChartComponent,
  AccumulationSeriesCollectionDirective,
  AccumulationSeriesDirective,
  AccumulationLegend,
  PieSeries,
  AccumulationDataLabel,
  Inject,
  AccumulationTooltip,
} from "@syncfusion/ej2-react-charts"

export const Pie = ({ id, data, legendVisiblity, height }) => {
  function processPieData(input) {
    const values = input
    let sum = 0
    for (let i = 0; i < values.length; i++) { 
      sum+=values[i].quantity
    }
      
    
    for (let i = 0; i < values.length; i++) {

      const percent = (values[i].quantity / sum) * 100
      console.log(values[i].quantity)
      values[i].percent = percent.toFixed(2)
    }

    const formatted = []
    for (let i = 0; i < values.length; i++) {
      console.log(values[i])
      if (values[i].name!==null && values[i].percentage!==null) {
        formatted.push({
        'x': values[i].name,
        'y': values[i].percent,
        'text': `${values[i].percent} %`,
      })
      }
    }
    console.log(formatted)
    return formatted
  }
  return (
    <AccumulationChartComponent
      id={id}
      legendSettings={{ visible: legendVisiblity, background: "white" }}
      height={height}
      background={"#fff"}
      tooltip={{ enable: true }}
    >
      <Inject
        services={[
          AccumulationLegend,
          PieSeries,
          AccumulationDataLabel,
          AccumulationTooltip,
        ]}
      />
      <AccumulationSeriesCollectionDirective>
        <AccumulationSeriesDirective
          name="Sale"
          dataSource={processPieData(data)}
          xName="x"
          yName="y"
          innerRadius="40%"
          startAngle={0}
          endAngle={360}
          radius="70%"
          explode
          explodeOffset="10%"
          explodeIndex={2}
          dataLabel={{
            visible: true,
            name: "text",
            position: "Inside",
            font: {
              fontWeight: "600",
              color: "#fff",
            },
          }}
        />
      </AccumulationSeriesCollectionDirective>
    </AccumulationChartComponent>
  )
}
