export function GetTimeStringComp(timeMap){
    var monthInt = Math.floor(timeMap['days'] / 30)
    var monthIntRem = timeMap['days'] % 30
    var monthComp = monthInt === 0 ? "" : monthInt + (monthInt > 1 ? " months " : " month ")

    var weekInt = Math.floor(monthIntRem / 7)
    var weekIntRem = monthIntRem % 7
    var weekComp = weekInt === 0 ? "" : weekInt + (weekInt > 1 ? " weeks " : " week ")
    var hour = timeMap['hours']
    var min = timeMap['minutes']
    var seconds = timeMap['seconds']

    var daysComp = weekIntRem === 0 ? "" : weekIntRem + (weekIntRem > 1 ? " days " : " day ")
    var hoursComp = hour === 0 ? "" : hour + (hour > 1 ? " hours " : " hour ")
    var minuteComp = min === 0 ? '' : min + (min > 1 ? " minutes " : " minute ")
    var secondsComp = seconds === 0 ? '' : seconds + (seconds > 1 ? ' seconds ' : " second ")

    return {
        main: monthComp + weekComp + daysComp + hoursComp + minuteComp + secondsComp,
        month: monthComp,
        week: weekComp,
        days: daysComp,
        hours: hoursComp,
        minutes: minuteComp,
        seconds: secondsComp
    }
}
