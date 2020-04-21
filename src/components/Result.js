import React from 'react';
import '../App.css'

// Graafiku joonistamiseks kasutasin: https://recharts.org/en-US/
// Kood on nende näidete põhjal
import {AreaChart, ResponsiveContainer, CartesianGrid, XAxis, YAxis, Tooltip, Area} from 'recharts';


const Result = ({data}) => {

    // Aja teisendamise kood võetud siit: https://stackoverflow.com/questions/9763441/milliseconds-to-time-in-javascript
    const tickFormatter = (ms) => {
        return new Date(ms).toUTCString().slice(17, -7);
    };

    let highest = data[0].time;
    let lowest = data[0].time;
    for (let i = 1; i < data.length; i++) {
        if (data[i].time > highest) {
            highest = data[i].time
        }
        if (data[i].time < lowest) {
            lowest = data[i].time
        }
    }

    const CustomTooltip = ({active, payload, label}) => {
        if (active) {
            return (
                <p className="label">{`${label} - ${tickFormatter(payload[0].value)}`}</p>
            );
        }
        return null;
    };

    // Aja kujutamiseks y-teljel aitas: https://github.com/recharts/recharts/issues/956
    return (
        <div className='result-box'>
            <p>Alguskuupäeval <strong>{data[0].date}</strong> on päeva
                pikkus <strong>{tickFormatter(data[0].time).split(':')[0]} tundi ja {tickFormatter(data[0].time).split(':')[1]} minutit</strong></p>
            <p> Päikesetõus: <strong>{tickFormatter(data[0].sunrise)} UTC</strong>
                , päikeseloojang: <strong>{tickFormatter(data[0].sunset)} UTC</strong>
            </p>
            <ResponsiveContainer width='100%' height={400}>
                <AreaChart data={data}>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis label={{value: 'Kuupäev', angle: 0, position: 'top'}} dataKey='date'/>
                    <YAxis label={{value: 'Päeva pikkus', angle: 0, position: 'right'}} tickFormatter={tickFormatter}
                           domain={[lowest - 1000000, highest + 1000000]}/>
                    <Tooltip content={<CustomTooltip/>}/>
                    <Area type='monotone' dataKey='time' stroke='#8884d8' fill='#8884d8'/>
                </AreaChart>
            </ResponsiveContainer>
        </div>
    )
};

export default Result;