import { Layout, Space } from '@arco-design/web-react';
import FilterArea from './features/FilterArea';
import TabsComponent from './components/Tab';
import Bandwidth from './components/Bandwidth';
import '@arco-design/web-react/dist/css/arco.css';
import { useEffect, useState, useCallback } from 'react';
import { fetchUserInfo } from './store/modules/user';
import { useDispatch } from 'react-redux';
import { fetchDataAPI } from './apis/data';
import Charts from './features/BandwidthView';

function App() {
  const [data, setData] = useState([])
  const [maxUpload, setMaxUpload] = useState(0)
  const [maxDownload, setMaxDownload] = useState(0)
  const [select, setSelect] = useState('line')
  const [selectedProject, setSelectedProject] = useState([])
  const [selectedTag, setSelectedTag] = useState('')
  const [selectedDomain, setSelectedDomain] = useState([])
  const [selectedRegion, setSelectedRegion] = useState('')
  const [selectedProtocol, setSelectedProtocol] = useState([])
  const [selectedTime, setSelectedTime] = useState('')
  const [selectedTimeRange, setSelectedTimeRange] = useState([])
  const [selectedGranularity, setSelectedGranularity] = useState('')
  const dispatch = useDispatch()

  const fetchData = useCallback(async() => {
    try {
      const data = await fetchDataAPI(selectedProject, selectedTag, selectedDomain, selectedRegion, selectedProtocol, selectedTime, selectedTimeRange, selectedGranularity)
      setData(data.data)
      setMaxDownload(data.maxDownload)
      setMaxUpload(data.maxUpload)
    } catch (error) {
      console.log(error)
    }
  }, [selectedProject, selectedTag, selectedDomain, selectedRegion, selectedProtocol, selectedTime, selectedTimeRange, selectedGranularity])

  const handleRefresh = () => {
    fetchData()
  }

  useEffect(() => {
      fetchData()
  }, [fetchData])

  useEffect (() => {
    dispatch(fetchUserInfo())
  }, [dispatch])
  return (
    <Layout>
      <Layout.Header>
        <TabsComponent />
      </Layout.Header>
      <Layout.Content>
        <Space direction='vertical'>
          <FilterArea 
            selectedTimeRange={selectedTimeRange}
            setSelectProject={setSelectedProject} 
            setSelectTag={setSelectedTag} 
            setSelectDomain={setSelectedDomain}
            setSelectRegion={setSelectedRegion}
            setSelectProtocol={setSelectedProtocol}
            setSelectTime={setSelectedTime}
            setSelectTimeRange={setSelectedTimeRange}
            setSelectGranularity={setSelectedGranularity}
          />
          <div style={{ display: "flex", width: "100vw"}}>
            <Bandwidth type="上" data={maxUpload}/>
            <Bandwidth type="下" separation={true} data={maxDownload}/>
          </div>
          {/* <Toolbar select={select} setSelect={setSelect} /> */}
          {/* {select === 'table' ?
          <BandwidthTable data={data} /> : 
          <BandwidthChart select={select} data={data} />} */}
          <Charts select={select} setSelect={setSelect} data={data} handleRefresh={handleRefresh}/>
        </Space>
      </Layout.Content>
    </Layout>
  );
}

export default App;
