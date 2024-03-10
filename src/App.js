import './App.css';
import { useSelector, useDispatch, connect } from 'react-redux'
import { clearData, fetchData, incrementId, decrementId, inputId } from './features/dataSlice'
import { useEffect } from 'react';

// makes the object ID available as a prop
const mapStateToProps = (state) => ({
  objectId: state.data.objectId
})



function App(props) {
  const dispatch = useDispatch()
  const data = useSelector((state) => state.data)

  // useEffect will re-render when the objectID changes and when dispatch is used instead of waiting for the Thunk button to be selected, and the gallery image will display everytime the object ID changes.
  useEffect(() => {
    dispatch(fetchData())
  }, [props.objectId, dispatch])

  const renderImg = () => {
    if(data.apiData) {
      return <img style={{'width': '100vw'}} src={data.apiData.primaryImage} alt={data.apiData.title} />
    } else {
      return <p>image here</p>
    }
  }


  return (
    <div className="App">
      <div>
        <button onClick={() => dispatch(fetchData())}>Thunk!</button>
        {/* Without a useEffect, the Thunk button has to be selected in order for any image to be changed from the API. Thunk receives the new object ID and outputs the data for that particular object ID. */}
        <button onClick={() => dispatch(clearData())}>Clear</button>
        <button onClick={() => dispatch(incrementId())}>Next</button>
        <button onClick={() => dispatch(decrementId())}>Back</button>
      </div>
      <input value={ data.objectId } onChange={(e) => {
        dispatch(inputId(Number(e.target.value)))
      }} />
      <div>
        {data.objectId}
        {renderImg()}
      </div>
    </div>
  );
}

export default connect(mapStateToProps)(App)
;