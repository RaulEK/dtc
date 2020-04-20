import React from 'react';
import '../App.css'
import {AreaChart, ResponsiveContainer, CartesianGrid, XAxis, YAxis, Tooltip, Area} from 'recharts';


const Result = ({data}) => {

    const tickFormatter = (ms) => {
        return new Date(ms).toISOString().slice(11, -5);
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

    return (
        <div className='result-box'>
            <p>Alguskuupäeval <strong>{data[0].date}</strong> on päeva
                pikkus <strong>{tickFormatter(data[0].time)}</strong></p>
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