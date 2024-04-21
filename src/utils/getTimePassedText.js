import getParsedTimeObj from "./getParsedTimeObj";

export default function getTimePassedText(timestamp) {
    const timeWas = getParsedTimeObj(timestamp);
    const timeNow = getParsedTimeObj(Date.now());
        const date = timeNow.date - timeWas.date; 
        const month = timeNow.month - timeWas.month; 
        const year = timeNow.year - timeWas.year; 
        const hours = timeNow.hours - timeWas.hours; 
        const minutes = timeNow.minutes - timeWas.minutes; 
        const seconds = timeNow.seconds - timeWas.seconds;

    if (year >= 1) {
        return `${year} ${year === 1 ? ' year ago' : ' years ago'}`
    } else if (month >= 1) {
        return `${month} ${month === 1 ? ' month ago' : ' months ago'}`
    } else if (date >= 1) {
        if (date / 7 >= 1) {
            const weeks = Math.floor(date / 7);
            return `${weeks} ${weeks === 1 ? ' week ago' : ' weeks ago'}`
        } else {
            return `${date} ${date === 1 ? 'day ago' : 'days ago'}`
        }
    } else if (hours >= 1) {
        return `${hours} ${hours === 1 ? 'hour ago' : 'hours ago'}`
    } else if (minutes >= 1) {
        return `${minutes} ${minutes === 1 ? 'min ago' : 'min ago'}`
    } else if (seconds >= 1) {
        return `${seconds} ${seconds === 1 ? 'sec ago' : 'sec ago'}`
    } else {
        return 'right now'
    }
}