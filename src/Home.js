import React from 'react';
import './App.css';

function UserDetail() {
    var starttime = "09:00:00";
    var interval = "60";
    var endtime = "17:00:00";
    var timeslots = [starttime];
    var timeSlotsArr = [];

    while (starttime !== endtime) {
        starttime = addMinutes(starttime, interval);
        timeslots.push(starttime);
    }

    for (var i = 0; i < timeslots.length; i++) {
        timeSlotsArr.push(timeslots[i] + " - " + timeslots[i + 1]);
    }
    timeSlotsArr.pop();

    function addMinutes(time, minutes) {
        var date = new Date(new Date('01/01/2015 ' + time).getTime() + minutes * 60000);
        var tempTime = ((date.getHours().toString().length === 1) ? '0' + date.getHours() : date.getHours()) + ':' +
            ((date.getMinutes().toString().length === 1) ? '0' + date.getMinutes() : date.getMinutes()) + ':' +
            ((date.getSeconds().toString().length === 1) ? '0' + date.getSeconds() : date.getSeconds());
        return tempTime;
    }

    return (
        <header className="App-header">
                <label>
                    Time Slots:-
        </label>
                <div className="timeSlots">
                    <ul>
                        {timeSlotsArr.map((row, index) => (
                            <li key={index}>
                                {row}
                            </li>
                        ))}
                    </ul>
                </div>
        </header>
    );
}

export default UserDetail