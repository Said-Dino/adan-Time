import logo from './logo.svg';
import './App.css';
import './Adan.css';
import axios from 'axios';
import { useEffect, useState } from 'react';

function App() {
   const [time, setTime] = useState({
    fajr: "",
    dohr: "",
    asr: "",
    maghreb: "",
    ichaa: "",
    Date: "",
  });
  const [city, setCity] = useState("");
  const today = new Date();
  const getday = today.getDate() - 1;
  const [date, setDate] = useState(getday);

  useEffect(() => {
    axios
      .get("https://api.aladhan.com/v1/calendarByCity?country=DZ&city=" + city)
      .then((response) => {
        setTime({
          ...time,
          fajr: response.data.data[date].timings.Fajr,
          dohr: response.data.data[date].timings.Dhuhr,
          asr: response.data.data[date].timings.Asr,
          maghreb: response.data.data[date].timings.Maghrib,
          ichaa: response.data.data[date].timings.Isha,
          Date: response.data.data[date].date.readable,
        });
      })
      .catch((er) => console.log(er));
  }, [city]);

  return (
    <div className="adan-container">
      <div className="header-selec">
        <select
          value={city}
          onChange={(e) => {
            setCity(e.target.value);
          }}
          className="city-select"
        >
          <option value="Oran">Oran</option>
          <option value="Ain Temouchent">Ain Temouchent</option>
          <option value="Sidi Bel Abbès">Sidi Bel Abbès</option>
          <option value="Alger">Alger</option>
        </select>

        <h5>{time.Date}</h5>
      </div>
      <hr />
      <div className="times-grid">
        <div className="time-card">
          <h1>العشاء</h1>
          <h5>{time.ichaa.slice(0, 5)}</h5>
        </div>
        <div className="time-card">
          <h1>المغرب</h1>
          <h5>{time.maghreb.slice(0, 5)}</h5>
        </div>
        <div className="time-card">
          <h1>العصر</h1>
          <h5>{time.asr.slice(0, 5)}</h5>
        </div>
        <div className="time-card">
          <h1>الظهر</h1>
          <h5>{time.dohr.slice(0, 5)}</h5>
        </div>
        <div className="time-card">
          <h1>الفجر</h1>
          <h5>{time.fajr.slice(0, 5)}</h5>
        </div>
      </div>
    </div>
  );
}

export default App;
