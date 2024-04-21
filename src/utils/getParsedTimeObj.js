export default function getParsedTimeObj(timestamp) {
    const time = new Date(timestamp);
    const day = time.getDay();
    const date = time.getDate();
    const month = time.getMonth();
    const year = time.getFullYear();
    const hours = time.getHours();
    const minutes = time.getMinutes();
    const seconds = time.getSeconds();
    return {day, date, month, year, hours, minutes, seconds};
}