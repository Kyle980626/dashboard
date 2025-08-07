import Toolbar from "../../components/ToolBar"
import BandwidthChart from "./BandwidthChart"
import BandwidthTable from "./BandwidthTable"
import { useEffect, useRef } from "react"
import dayjs from "dayjs"
import * as echarts from 'echarts';

const Charts = ({ select, setSelect, data, handleRefresh }) => {
  const chartRef = useRef(null)
  const chartInstanceRef = useRef(null)

  const renderChart = (select, data) => {
    if (!chartInstanceRef.current) return
      const option = {
        tooltip: {
          trigger: 'axis'
        },
        grid: {
          left: '0px',
          right: '0px',
          containLabel: true
        },
        xAxis: {
          type: 'time',
          boundaryGap: ['5%', '5%'],
          axisLabel: {
            formatter: val => dayjs(val).format('YYYY-MM-DD HH:mm'),
            color: '#666'
          },
          axisLine: {
            lineStyle: {
                color: '#60b081',
                width: 3
            }
          },
          axisTick: {
            lineStyle: {
                color: '#666'
            }
          }
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            formatter: val => `${val}Mbps`
          }
        },
        series: [
            {
                name: '上行带宽',
                type: select,
                data: data.map(d => [new Date(d.time), d.upload])
            },
            {
                name: '下行带宽',
                type: select,
                data: data.map(d => [new Date(d.time), d.download])
            }
        ],
        dataZoom: [
            {
                type: 'slider',
                show: true,
                xAxisIndex: 0,
                height: 30
            }
        ],
      };
    chartInstanceRef.current.setOption(option, true)
  }

  const handleDownload = () => {
    if (!chartInstanceRef.current) {
      console.log(111)
      return
    }
    console.log(222)
    const base64 = chartInstanceRef.current.getDataURL({
      type: 'png',
      pixelRatio: 2,
      backgroundColor: '#fff'
    })

    const link = document.createElement('a')
    link.href = base64
    link.download = 'chart.png'
    link.click()
  }

  useEffect(() => {
    if (!chartRef.current) return

    const instance = echarts.init(chartRef.current)
    chartInstanceRef.current = instance

    renderChart(select, data)
  })
    return (
        <div className="charts-container content" style={{ width: '100%'}}>
            <Toolbar select={select} setSelect={setSelect} downloadClick={handleDownload} refreshClick={handleRefresh}/>
            {
              select === 'table' ?
              <BandwidthTable data={data} /> : 
              <BandwidthChart chartRef={chartRef} />
            }
        </div>
    )
}

export default Charts