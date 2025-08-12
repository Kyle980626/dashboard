import { Space, Radio, DatePicker } from "@arco-design/web-react";
import { IconLoading } from "@arco-design/web-react/icon";
import SelectorComponent from "../../components/Selector";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

const RadioGroup = Radio.Group

const GRANULARITY = {
  title: "粒度",
  options: ["分钟", "小时", "天", "月"]
};

const TIMES = [
    {
        title: "今天",
        value: "today"
    }, 
    {
        title: "昨天",
        value: "yesterday"
    }, 
    {
        title: "近7天",
        value: "7days"
    }, 
    {
        title: "近30天",
        value: "30days"
    }]

const FilterArea = ({ selectedTimeRange, setSelectProject, setSelectTag, setSelectDomain, setSelectRegion, setSelectProtocol, setSelectTime, setSelectTimeRange, setSelectGranularity }) => {
    const info = useSelector((state) => state.user.info)
    const handleRadioChange = (value) => {
        if (value === 'today') {
            setSelectTimeRange([dayjs().format('YYYY-MM-DD'), dayjs().format('YYYY-MM-DD')])
        } else if (value === 'yesterday') {
            setSelectTimeRange([dayjs().subtract(1, 'day').format('YYYY-MM-DD'), dayjs().subtract(1, 'day').format('YYYY-MM-DD')])
        } else if (value === '7days') {
            setSelectTimeRange([dayjs().subtract(7, 'day').format('YYYY-MM-DD'), dayjs().format('YYYY-MM-DD')])
        } else {
            setSelectTimeRange([dayjs().subtract(30, 'day').format('YYYY-MM-DD'), dayjs().format('YYYY-MM-DD')])
        }
        
    }
    return (
        info?.projects ?
        <Space size="large" wrap align="start" className="content">
            <SelectorComponent item={info.projects} mode="multiple" setSelectedData={setSelectProject}/>
            <SelectorComponent item={info.tags} setSelectedData={setSelectTag}/>
            <SelectorComponent item={info.domains} mode="multiple" setSelectedData={setSelectDomain}/>
            <SelectorComponent item={info.regions} setSelectedData={setSelectRegion}/>
            <SelectorComponent item={info.protocols} mode="multiple" setSelectedData={setSelectProtocol}/>
            <RadioGroup
                type='button'
                defaultValue={TIMES[0].value}
                style={{ marginRight: 20, marginBottom: 20 }}
                onChange={(value) => {
                    handleRadioChange(value)
                }}
            >
                {TIMES.map((item, _) => (
                    <Radio value={item.value} key={item.key}>{item.title}</Radio>
                ))}
            </RadioGroup>
            <DatePicker.RangePicker 
                style={{ width: 350 }} 
                showTime={{
                    defaultValue: ['00:00', '00:00'],
                    format: 'HH:mm'
                }}
                format='YYYY-MM-DD HH:mm'
                value={selectedTimeRange[0] && selectedTimeRange[1] ? [selectedTimeRange[0], selectedTimeRange[1]] : undefined}
                onChange={(dateString, date) => setSelectTimeRange(dateString)} 
                onSelect={(dateString, date) => console.log('onSelect: ', dateString, date)}
                onOk={(dateString, date) => console.log('onOk: ', dateString, date)}
            />
            <SelectorComponent item={GRANULARITY} setSelectedData={setSelectGranularity}/>
        </Space> : <IconLoading />
    )
}

export default FilterArea