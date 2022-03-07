import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWeatherAction } from './redux/slices/weatherSlices';


function App() {
  const [city, setCity] = useState('seoul');
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(fetchWeatherAction('seoul'));
  }, [city]);
  
  const state = useSelector(state => state.weather);
  const { loading, weather, error } = state || {};

  if(!weather){
    return null
  }

  console.log(weather);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Weather search</h1>
        <h2>Default location is Seoul</h2>
      <input
        className='input'
        type="text"
        value={city}
        onClick={() => dispatch(fetchWeatherAction(city))}
        onChange={event => setCity(event.target.value)}
      />
    <br />
    <br />
        <button onClick={() => dispatch(fetchWeatherAction(city))}>Search</button>
        {weather.map((weatherItem, index) => (
        <div className='info-box' key={index}>
          <p>State of sky: {`${weatherItem.description}`}</p>
          <p>Weather: {`${weatherItem.main}`}</p>
        </div>
      ))}
      </header>
    </div>
  );
}

export default App;
