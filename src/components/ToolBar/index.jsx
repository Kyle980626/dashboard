import { Radio, Button, Space } from '@arco-design/web-react';
import { IconDownload, IconRefresh } from '@arco-design/web-react/icon';
import { ReactComponent as Linechart } from '../../assets/linechart.svg'
import { ReactComponent as Barchart } from '../../assets/barchart.svg'
import { ReactComponent as Table } from '../../assets/table.svg'
import { ReactComponent as LinechartSelected } from '../../assets/linechart-selected.svg'
import { ReactComponent as BarchartSelected } from '../../assets/barchart-selected.svg'
import { ReactComponent as TableSelected } from '../../assets/table-selected.svg'
import './index.css'

const options = [
    {
        value: 'line',
        label: <Linechart className='radio-icon' />,
        selected: <LinechartSelected className='radio-icon' />
    },
    {
        value: 'bar',
        label: <Barchart className='radio-icon' />,
        selected: <BarchartSelected className='radio-icon' />
    },
    {
        value: 'table',
        label: <Table className='radio-icon' />,
        selected: <TableSelected className='radio-icon' />
    }
]

const ToolBar = ({ select, setSelect, downloadClick, refreshClick }) => {
    return (
        <div className='toolbar-container'>
            <div className='graph-selector-constainer'>
                <Radio.Group
                    type='button'
                    defaultValue={options[0].value}
                    onChange={(val) => {
                        setSelect(val)
                        console.log(val)
                    }}
                >
                    {options.map((item, _) => (
                        <Radio value={item.value} key={item.value} >
                            {select === item.value ? item.selected : item.label}
                        </Radio>
                    ))}
                </Radio.Group>
            </div>
            <div className='graph-btn-container'>
                <Space size='large'>
                    <Button type='text' icon={<IconRefresh />} onClick={() => refreshClick()}>刷新</Button>
                    <Button type='text' icon={<IconDownload />} onClick={() => downloadClick()}>下载</Button>
                </Space>
            </div>
        </div>
    )
}

export default ToolBar