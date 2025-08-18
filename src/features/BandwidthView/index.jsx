import Toolbar from "../../components/ToolBar"
import BandwidthChart from "./BandwidthChart"
import BandwidthTable from "./BandwidthTable"
import { useEffect, useMemo, useRef } from "react"
import dayjs from "dayjs"
import * as echarts from "echarts"
import * as XLSX from "xlsx"
import { saveAs } from "file-saver"

const Charts = ({ select, setSelect, data = [], handleRefresh }) => {
  const chartRef = useRef(null)
  const chartInstanceRef = useRef(null)
  const roRef = useRef(null)

  const option = useMemo(() => {
    const seriesType = select === "table" ? "line" : select
    // 优化2: 大数据量时渐进式渲染，批量绘制 + 下采样保留拐点但渲染点数大幅降低
    const series = {
      large: true,
      largeThreshold: 2000,
      progressive: 2000,
      progressiveThreshold: 2000,
      sampling: 'lttb',
    }
    return {
      // 优化3: 大数据量时关闭动画
      animation: false,
      animationThreshold: 2000,
      tooltip: { trigger: "axis" },
      grid: { left: "0px", right: "0px", containLabel: true },
      xAxis: {
        type: "time",
        boundaryGap: ["5%", "5%"],
        axisLabel: {
          formatter: (val) => dayjs(val).format("YYYY-MM-DD HH:mm"),
          color: "#666",
        },
        axisLine: { lineStyle: { color: "#60b081", width: 3 } },
        axisTick: { lineStyle: { color: "#666" } },
      },
      yAxis: {
        type: "value",
        axisLabel: { formatter: (val) => `${val}Mbps` },
      },
      series: [
        {
          ...series,
          name: "上行带宽",
          type: seriesType,
          // 优化1: 减少创建Date对象
          // data: data.map((d) => [new Date(d.time), d.upload]),
          data: data.map((d) => [Date.parse(d.time), d.upload]),
          showSymbol: false,
        },
        {
          ...series,
          name: "下行带宽",
          type: seriesType,
          // 优化1: 减少创建Date对象
          // data: data.map((d) => [new Date(d.time), d.download]),
          data: data.map((d) => [Date.parse(d.time), d.download]),
          showSymbol: false,
        },
      ],
      dataZoom: [
        // 优化5: 添加节流，提升缩放和拖动的流畅度
        {type: 'inside', xAxisIndex: 0, throttle: 80},
        { type: "slider", show: true, xAxisIndex: 0, height: 30 }
      ],
    }
  }, [select, data])

  useEffect(() => {
    if (select !== 'table' && chartRef.current && !chartInstanceRef.current) {
      const instance = echarts.init(chartRef.current)
      chartInstanceRef.current = instance

      const ro = new ResizeObserver(() => instance.resize())
      ro.observe(chartRef.current)
      roRef.current = ro
    }
    if (select === "table" && chartInstanceRef.current) {
      roRef.current?.disconnect()
      chartInstanceRef.current.dispose()
      chartInstanceRef.current = null
      roRef.current = null
    }
  }, [select])

  useEffect(() => {
    if (select === "table") return
    const inst = chartInstanceRef.current
    if (!inst) return
    inst.setOption(
      option, 
      // 优化4: 减少重绘
      {
        notMerge: false,
        lazyUpdate: true,
        replaceMerge: ['series']
      }
    )
    requestAnimationFrame(() => inst && inst.resize())
  }, [option, select])

  const handleDownload = () => {
    const inst = chartInstanceRef.current
    if (!inst) return
    const base64 = inst.getDataURL({
      type: "png",
      pixelRatio: 2,
      backgroundColor: "#fff",
    })
    const link = document.createElement("a")
    link.href = base64
    link.download = "chart.png"
    link.click()
  }

  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(data)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, "带宽数据")
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" })
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" })
    saveAs(blob, "带宽数据.xlsx")
  }

  return (
    <div className="charts-container content" style={{ width: "100%" }}>
      <Toolbar
        select={select}
        setSelect={setSelect}
        downloadClick={handleDownload}
        refreshClick={handleRefresh}
        downloadTable={downloadExcel}
      />
      {select === "table" ? (
        <BandwidthTable data={data} />
      ) : (
        <BandwidthChart chartRef={chartRef} />
      )}
    </div>
  )
}

export default Charts