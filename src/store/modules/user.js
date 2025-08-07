import { createSlice } from '@reduxjs/toolkit'
import { fetchUserInfoAPI } from '../../apis/data'

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        info: {}
    },
    reducers: {
        setInfo: (state, action) => {
            state.info = action.payload
        }
    }
})

const { setInfo } = userSlice.actions

const fetchUserInfo = () => {
    return async (dispatch) => {
        try {
            const res = await fetchUserInfoAPI()
            dispatch(setInfo(res))
        } catch (error) {
            console.log(error)
        }
    }
}

export { fetchUserInfo }

export default userSlice.reducer