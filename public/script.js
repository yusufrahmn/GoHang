// Loading Button

function loading(buttonID, text) {
  let button = document.getElementById(buttonID);
  button.disabled = true;
  button.ariaBusy = true;
  button.innerHTML = text;
  return button;
}

// Error Button

function error(button, text='Error') {
  button.ariaBusy = false;
  button.innerHTML = text;
  button.classList.add("redButton");
  button.disabled = false;
}


// New Event

async function newEvent() {
  let button = loading('eventButton', 'One moment...');

  var name = document.getElementById("eventName").value;
  fetch('/api/events/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name })
    }).then((res) => { 
      if (res.status == 200) {
        res.json().then((data) => {
          window.location.href += data.id;
        }) 
      } else if (res.status == 400) {
        res.json().then((data) => error(button, data.error))
      } else {
        error(button)
      }
  }).catch((err) => {
    error(button)
  });
}

async function signup() {
  let button = loading('signupBtn', 'One moment...');

  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;
  let id = window.location.href.split('/')[3];

  fetch(`/api/events/${id}/users`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${password}`
    },
    body: JSON.stringify({ name: username })
  }).then((res) => { 
    if (res.status == 200) {
      res.json().then((data) => {
        sessionStorage.setItem("username", username);
        sessionStorage.setItem("password", password);
        window.location.href += '/calendar';
      }) 
    } else if (res.status == 400) {
      res.json().then((data) => error(button, data.error))
    } else {
      error(button)
    }
  }).catch((err) => {
    error(button)
  });
}

function login(){
  let button = loading('loginBtn', 'One moment...');

  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;
  let id = window.location.href.split('/')[3];

  fetch(`/api/events/${id}/users/${username}`, {
    method: 'GET',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${password}`
    }
  }).then((res) => { 
    if (res.status == 200) {
      res.json().then((data) => {
        sessionStorage.setItem("username", username);
        sessionStorage.setItem("password", password);
        window.location.href += '/calendar';
      }) 
    } else if (res.status == 400) {
      res.json().then((data) => error(button, data.error))
    } else {
      error(button)
    }
  }).catch((err) => {
    error(button)
  });
}