/*
Arvutab päikesetõusu ja päikeseloojangu kellaajad. Nende abil päeva pikkuse.
Tagastab tulemustest järjendi, milles iga objekt on üks kuupäev.
Objekti väljad on: date, sunrise, sunset, time.
Arvutuste jaoks kasutan teeki: https://github.com/mourner/suncalc
*/
import suncalc from 'suncalc';

const calculate = (date, latitude, longitude) => {
    // Äärmuslike koordinaatide puhul viskab suncalc errori.
    // Sellisel juhul tagastan 'null' ehk kasutaja valitud asukoht ei ole sobilik.
    try {
        const data = suncalc.getTimes(date, latitude, longitude);
        const sunrise = new Date(data.sunrise.toUTCString());
        const sunset = new Date(data.sunset.toUTCString());
        const time = new Date(sunset - sunrise).getTime();
        return [sunrise.getTime(), sunset.getTime(), time];
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
            sunrise: time[0],
            sunset: time[1],
            time: time[2]};
        result.push(day);
        startDate.setDate(startDate.getDate() + 1)
    }
    if (result.length > 0) {
        return result;
    }
    return null;
};

export default {calculate, calculateMultipleDays};