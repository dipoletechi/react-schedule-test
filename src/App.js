import React, {Component} from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import UserDetail from './User';

class App extends Component {

render() {

  var onNextPage = true;
  if(window.location.href === window.location.origin + "/"){
    onNextPage = false;
  }

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
    var newTime = {
      time: timeslots[i] + " - " + timeslots[i + 1],
      saved: false
    };
    timeSlotsArr.push(newTime);
  }
  timeSlotsArr.pop();

  var getUserData = JSON.parse(localStorage.getItem("user"));
  if(getUserData && getUserData.length > 0){
    for(var k = 0; k < getUserData.length; k++){
      for(var j = 0; j < timeSlotsArr.length; j++){
        if(getUserData[k].timeSlot === timeSlotsArr[j].time){
          timeSlotsArr[j].saved = true;
          break;
        }
      }
    }
  }
  
  function addMinutes(time, minutes) {
    var date = new Date(new Date('01/01/2015 ' + time).getTime() + minutes * 60000);
    var tempTime = ((date.getHours().toString().length === 1) ? '0' + date.getHours() : date.getHours()) + ':' +
      ((date.getMinutes().toString().length === 1) ? '0' + date.getMinutes() : date.getMinutes()) + ':' +
      ((date.getSeconds().toString().length === 1) ? '0' + date.getSeconds() : date.getSeconds());
    return tempTime;
  }
  
  function goToEditUserData(row) {
    var startingTime = row.split(" - ")[0];
    var endingTime = row.split(" - ")[1];
    window.location.href = '/user/' + startingTime.replace(/:/g, 'hr') + "-" + endingTime.replace(/:/g, 'hr');
  }

  return (
    <Router>
      <div id="container">
        <div hidden={onNextPage} className="App">
          <div className="App-header">
          <label>
              Time Slots
          </label>
            <div className="timeSlots">
              <ul>
                {timeSlotsArr.map((row, index) => (
                  <li key={index} className={row.saved ? "time-slot-active" : "time-slot"} onClick={() => goToEditUserData(row.time)}>
                    {row.time} {row.saved}
                  </li>
                ))}
              </ul>
            </div>
          </div>
            <Link hidden={true} id="userDetailPage" to="/user/:time">GO To User Detail</Link>
            <Link hidden={true} id="goBackToTimeSlots" to="/">GO Back</Link>
        </div>
        <Switch>
            <Route path="/user/:time" component={UserDetail}/>
            <Route path="/" />
        </Switch>
      </div>
    </Router>
  );
}
}

export default App;
