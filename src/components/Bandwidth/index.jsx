import './index.css'
import { Typography } from '@arco-design/web-react'

const Bandwidth = ({ type, separation = false, data }) => {
    return (
        <div className={`bandwidth ${separation ? 'vertical-line' : ''}`}>
            <Typography.Title heading={6} style={{ fontWeight: "normal"}}>{type}行带宽峰值</Typography.Title>
            <Typography.Title style={{ display: "inline"}}>{data}</Typography.Title>
            <Typography.Text>Mbps</Typography.Text>
        </div>
    )
}

export default Bandwidth