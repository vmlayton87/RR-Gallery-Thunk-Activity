import './App.css';
import { useSelector, useDispatch } from 'react-redux'
import { clearData, fetchData, incrementId, decrementId, inputId } from './features/dataSlice'

function App() {
  const dispatch = useDispatch()
  const data = useSelector((state) => state.data)

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

export default App;