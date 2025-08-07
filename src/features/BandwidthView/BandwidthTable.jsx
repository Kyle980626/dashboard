import { Table } from "@arco-design/web-react";

const columns = [
    {
        title: '时间',
        dataIndex: 'time'
    },
    {
        title: '总带宽',
        dataIndex: 'total',
        render: (value) => `${value}Mbps`
    },
    {
        title: '上行带宽',
        dataIndex: 'upload',
        render: (value) => `${value}Mbps`
    },
    {
        title: '下行带宽',
        dataIndex: 'download',
        render: (value) => `${value}Mbps`
    }
]

const BandwidthTable = ({ data }) => {

    return (
        <Table columns={columns} data={data} />
    )
}

export default BandwidthTable