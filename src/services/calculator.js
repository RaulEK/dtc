import suncalc from 'suncalc';

const calculate = (date, latitude, longitude) => {
    try {
        const data = suncalc.getTimes(date, latitude, longitude);
        const sunrise = new Date(data.sunrise.toISOString());
        const sunset = new Date(data.sunset.toISOString());
        // const time = new Date(sunset - sunrise).toISOString().slice(11, -5);
        const time2 = new Date(sunset - sunrise).getTime();
        // console.log(new Date(time2).toISOString().slice(11, -5));
        // const values = time.split(':');
        // return (parseInt(values[0]) * 60 + parseInt(values[1])) * 60 + parseInt(values[2])
        return time2;
    } catch (e) {
        return null;
    }
};

const calculateMultipleDays = (firstDate, secondDate, latitude, longitude) => {
    const startDate = new Date(firstDate.getTime());
    const endDate = new Date(secondDate.getTime());
    const result = [];
    endDate.setDate(endDate.getDate() + 1);
    while (startDate < endDate) {
        const time = calculate(startDate, latitude, longitude);
        if (time === null) {
            return null;
        }
        const day = {date: startDate.getDate() + '/' + (startDate.getMonth() + 1) + '/' + startDate.getFullYear(),
            time: time};
        result.push(day);
        startDate.setDate(startDate.getDate() + 1)
    }
    if (result.length > 0) {
        return result;
    }
    return null;
};

export default {calculate, calculateMultipleDays};