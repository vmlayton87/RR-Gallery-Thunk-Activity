import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    objectId: 10245,
    apiData: {}
}

export const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        setData: (state, action) => {
            return {...state, apiData : action.payload}
        },
        clearData: () => {
            return initialState
        },
        inputId: (state, action) => {
            return { ...state, objectId: action.payload }
        },
        incrementId: (state) => {
            return { ...state, objectId: state.objectId + 1 }
        },
        decrementId: (state) => {
            return { ...state, objectId: state.objectId - 1 }
        }
    }
})

export const { setData, clearData, incrementId, decrementId, inputId } = dataSlice.actions

/* 1 */export const fetchData = () => {                                
/* 2 */    const fetchDataThunk = async (dispatch, getState) => {
/* 3 */       let state = getState()
               // console.log("State value inside of the Thunk: ", state)
/* 4*/        const response = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${state.data.objectId}`)
/* 5 */        const rData = await response.json()
/* 6 */        dispatch(setData(rData))
/* 7 */    }
/* 8 */    return fetchDataThunk
/* 9 */}
/*
    A Thunk is an async function that accepts the dispatch and state, then returns a function in order to be used within dispatch in the UI code. A Thunk retrieves information, but won't load anything else until the Thunk fetch is done.
    1: exports and creates the action creator for the Thunk.  
    2: the actual async function that is the Thunk. it accepts as parameters dispatch function and the getState function
    3: creates a state variable
    4: fetch's the museum art gallery api for a specific object ID. uses data from the store.js state b/c it's global. await makes the function wait until the fetch method is finished before continuing to the next line of code.
    5: saves the response from the fetch in a variable named rData. it is saved as JSON and waits for that to be done before continuing to the next line of code.
    6: dispatches the setData reducer and adds the data to the state.
    7: end of the Thunk function
    8: returns the Thunk function
    9: ends the action creator
*/
export default dataSlice.reducer