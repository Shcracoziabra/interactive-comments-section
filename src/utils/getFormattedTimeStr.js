import getMonthName from "./getMonthName";
import getDayName from "./getDayName";

export default function getFormatedTimeStr(parsedTimeObj) {
    const { day, date, month, year, hours, minutes, seconds } = parsedTimeObj;
    return `edited on ${getDayName(day)}, ${date} ${getMonthName(month)} ${year}, ${`${hours}`.padStart(2, '0')}:${`${minutes}`.padStart(2, '0')}:${`${seconds}`.padStart(2, '0')}`;
}