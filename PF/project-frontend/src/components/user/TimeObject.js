const DAYS = ['Sun', 'Mon', 'Tues', 'Wed', 'Thu', 'Fri', 'Sat']
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

export function getTimeObj(datetime){
    var dt = new Date(datetime)
    let day = DAYS[dt.getDay()]
    let month = MONTHS[dt.getMonth()]
    let date = dt.getDate()
    let hr = dt.getHours()
    let mni = dt.getMinutes()
    let mn = mni > 10 ? "" + mni : "0" + mni
    return {
        intDat: {
            month: dt.getMonth(),
            date: date,
            hour24: hr,
            hour12: hr % 12,
            minute: mni
        },
        day: day,
        month: month,
        date: "" + date,
        hour24: "" + hr,
        hour12: "" + (hr % 12),
        am: (hr < 13),
        minute: mn
    }
}
