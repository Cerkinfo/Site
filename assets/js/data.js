const moment = require('moment');

const MAX_DISTANCE = moment().month(3);

/* @desc : Insert an "event" into the "list" and ensure
 *      chronology.
 *
 * @param {event} : Event to insert in the list.
 * @param {list} : List to insert the event on.
 *
 * @return : Newly formatted list.
 */
const insert = (event, list) => {
    for (let i in list) {
        if (event.start < list[i].start) {
            list.splice(i, 0, event);
            return list;
        }
    }

    list.push(event);

    return list;
};

/* @desc : Remove the event from the "list" that are after 
 *      the "date".
 *
 * @param {list} : 
 * @param {date} :
 *
 * @return : Filtered list.
 */
const filterByDate = (list, date) => {
    const result = []
    for (let event of list) {
        if (event.end < date) {
            result.push(event);
        }
    }

    return result;
};

/* @desc : Ensure readability of the datas.
 *
 * @param {data} : parsed data.
 */
const analyze = (data, bounds) => {
    if (bounds.length > MAX_DISTANCE) {
        bounds.up = bounds.low + MAX_DISTANCE;
        bounds.length = bounds.up - bounds.low;
        data = filterByDate(data, bounds.up);
    }

};

module.exports.parse = (data) => {
    const now = new moment();
    let min = new moment();
    let max = new moment();

    let ret = [];
    for (let event of data) {
        var startFrom = new moment(event.begin);
        var finishOn = new moment(event.end);

        if (startFrom.isBefore(now) && finishOn.isBefore(now)) {
            continue; 
        }

        if (startFrom.isBefore(min)) {
            min = startFrom;
        }

        if (max.isBefore(finishOn)) {
            max = finishOn;
        }

        ret = insert({
            start: startFrom, 
            end: finishOn, 
            length: finishOn.diff(startFrom),
            summary: event.summary,
            description: event.description,
        }, ret);
    }

    const bounds = {
        first: new moment(min),
        last: new moment(max),
        low: new moment(min).startOf('month'),
        up: new moment(max).endOf('month'),
        length: 0,
    };
    bounds.length = bounds.up.diff(bounds.low);
    
    analyze(ret, bounds);

    return {
        data: ret,
        bounds : bounds,
    };
};
