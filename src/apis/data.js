import { createRequest } from "../utils/createRequest";

const requestData = createRequest("http://localhost:8000")

function fetchDataAPI(selectedProject, selectedTag, selectedDomain, selectedRegion, selectedProtocol, selectedTime, selectedTimeRange, selectedGranularity) {
    console.log(selectedProject, selectedTag, selectedDomain, selectedRegion, selectedProtocol, selectedTime, selectedTimeRange, selectedGranularity)
    return requestData({
        url: 'bandwidth',
        method: 'POST',
        data: {
            project: selectedProject,
            tag: selectedTag,
            domain: selectedDomain,
            region: selectedRegion,
            protocol: selectedProtocol,
            time_shortcut: selectedTime,
            time_range: selectedTimeRange,
            granularity: selectedGranularity
        }
    })
}

function fetchUserInfoAPI() {
    return requestData({
        url: 'options',
        method: 'GET',
    })
}

export { fetchDataAPI, fetchUserInfoAPI }