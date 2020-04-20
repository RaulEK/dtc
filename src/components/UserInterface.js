import React, {useState, useEffect} from 'react';
import MapContainer from './MapContainer';
import DatePicker, {registerLocale, setDefaultLocale} from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import et from 'date-fns/locale/et';
import '../App.css';
import calculatorService from '../services/calculator';
import Result from "./Result";

registerLocale('et', et);
setDefaultLocale('et');

const UserInterface = () => {

    const [latitude, setLatitude] = useState(58.371);
    const [longitude, setLongitude] = useState(26.715);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [data, setData] = useState();

    useEffect(() => {
        calculateDayLength();
    }, []);

    const calculateDayLength = () => {
        setData(calculatorService.calculateMultipleDays(startDate, endDate, latitude, longitude));
    };

    const handleChange = (event) => {
        const value = event.target.value;
        if (event.target.name === 'latitude') {
            setLatitude(value);
        } else if (event.target.name === 'longitude') {
            setLongitude(value)
        }
    };

    const handleClick = (event) => {
        event.preventDefault();
        calculateDayLength();
    };

    return (
        <>
            <div className='container'>
                <div className='input-box'>
                    <form onSubmit={handleClick}>
                        <label>
                            Laiuskraad:
                            <input
                                type='number'
                                min='-90'
                                max='90'
                                step="0.001"
                                name='latitude'
                                value={latitude}
                                onChange={handleChange}
                            />
                        </label>
                        <label>
                            Pikkuskraad:
                            <input
                                type='number'
                                min='-180'
                                max='180'
                                step="0.001"
                                name='longitude'
                                value={longitude}
                                onChange={handleChange}
                            />
                        </label>
                        <div className='datepicker'>
                            Alguskuupäev: <DatePicker selected={startDate} onChange={date => setStartDate(date)}
                                                      dateFormat="dd/MM/yyyy"/>
                        </div>
                        <div className='datepicker'>
                            Lõppkuupäev: <DatePicker selected={endDate} onChange={date => setEndDate(date)}
                                                     dateFormat="dd/MM/yyyy"/>
                        </div>
                        <input className='button' type='submit' value='Otsi'/>
                    </form>
                </div>
                <div className='map-box'>
                    <MapContainer className="map-container" latitude={latitude} longitude={longitude}
                                  setLatitude={setLatitude} setLongitude={setLongitude}/>
                </div>

            </div>
            {data ? <Result data={data} /> : "Andmed puuduvad"}
        </>

    )
};

export default UserInterface;