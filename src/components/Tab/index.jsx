import { useState } from "react"
import { Tabs, Typography } from "@arco-design/web-react"
import './index.css'

const TabPane = Tabs.TabPane;
const TABS = [
    {
        title: "宽带用量",
        key: "bandwidth"
    },
    {
        title: "流量用量",
        key: "traffic",
    },
    {
        title: "直播录制",
        key: "recording",
    },
    {
        title: "时移存储",
        key: "timeshift",
    },
    {
        title: "转码时长",
        key: "transcode",
    },
    {
        title: "截图张数",
        key: "screenshot",
    },
    {
        title: "拉流转推",
        key: "relay",
    },
    {
        title: "转推带宽",
        key: "relayBandwidth",
    },
    {
        title: "直播审核",
        key: "review",
    },
    {
        title: "云导播",
        key: "director",
    }
]

const TabsComponent = () => {
    const [activeTab, setActiveTab] = useState("bandwidth")

    return (
        <Tabs
         type="card-gutter"
         activeTab={activeTab}
         onChange={setActiveTab}
        >
            {TABS.map((tab, _) => (
                <TabPane key={tab.key} title={tab.title} className={tab.key === activeTab ? "selectedTab" : ""}></TabPane>
            ))}
        </Tabs>
    )
}

export default TabsComponent