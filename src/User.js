import React, { useState, useEffect } from 'react'
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Button, FormGroup, Input } from 'reactstrap';

const UserDetail = () => {
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [phoneNumber, setPhoneNumber] = React.useState('');
  const [selectedTime, setSelectedTime] = React.useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const onFirstNameChange = event => setFirstName(event.target.value);
  const onLastNameChange = event => setLastName(event.target.value);
  const onPhoneNumberChange = event => setPhoneNumber(event.target.value);

  useEffect(() => {
    var splittedPath = window.location.pathname.split('/');
    var timeSelectedByUser = splittedPath[splittedPath.length - 1];
    var selectedTime = timeSelectedByUser.replace(/hr/g, ':').replace(/-/g, ' - ');
    setSelectedTime(selectedTime);
    var localStorageUserData = JSON.parse(localStorage.getItem("user"));
    if (localStorageUserData && localStorageUserData.length > 0) {
      localStorageUserData.find((data) => {
        if (data.timeSlot === selectedTime) {
          setFirstName(data.firstName);
          setLastName(data.lastName);
          setPhoneNumber(data.phoneNumber);
        }
      });
    }
  }, [currentPage]);

  function goToTimeSlots() {
    window.location.pathname = '/';
  }

  function saveUserDetails() {
    var userDetail = {
      id: 0,
      firstName: firstName,
      lastName: lastName,
      phoneNumber: phoneNumber,
      timeSlot: selectedTime
    };
    var getUserData = JSON.parse(localStorage.getItem("user"));
    if (getUserData === null) {
      getUserData = [];
    }

    for (var i = 0; i < getUserData.length; i++) {
      if (selectedTime === getUserData[i].timeSlot) {
        getUserData.splice(i, 1);
      }
    }

    getUserData.push(userDetail);
    localStorage.setItem('user', JSON.stringify(getUserData));
    window.location.pathname = '/';
  }

  return (

    <div id="container">
      <div className="App">
        <div className="App-header">
          <label>
            Appointment
          </label>
          <div className="Form-Body">
            <FormGroup>
              <Input className="input-first-name"
                autoComplete="off"
                type="text"
                name="name"
                id="name"
                placeholder="First Name..."
                value={firstName}
                onChange={onFirstNameChange}
              />
              <Input className="input-last-name"
                autoComplete="off"
                type="text"
                name="name"
                id="name"
                placeholder="Last Name..."
                value={lastName}
                onChange={onLastNameChange}
              />
              <Input className="input-phone-number"
                autoComplete="off"
                type="text"
                name="name"
                id="name"
                placeholder="Phone Number..."
                value={phoneNumber}
                onChange={onPhoneNumberChange}
              />
              <Button color="danger" className="mb-2 ml-2 mr-3" onClick={() => goToTimeSlots()}> Cancel </Button>
              <Button color="primary" className="mb-2 ml-2 mr-3" onClick={() => saveUserDetails()}> OK </Button>
            </FormGroup>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDetail