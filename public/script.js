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
  console.log(name)
  fetch('/api/events/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow', 
      body: JSON.stringify({
          name
      })
    }).then((res) => { 
      if (res.status == 200) {
        res.json().then((data) => {
          window.location.href += data.id;
        }) 
      } else if (res.status == 400) {
        alert(res.error)
      }
  }).catch((err) => {
    error(button)
  });
}

function login(){
  let username = document.getElementById("userName").value;
  let password = document.getElementById("password").value;

  const rq = new XMLHttpRequest();
  rq.open("GET", "/api/events/:id/users/:name")

  rq.onload = async function(){
    let resp = await JSON.parse(rq.response);
    if(resp.status != 200){
      alert(resp.error)
    }
    else{
      console.log("succes")
      let data = await resp.json();
      window.location.href = "/" + data.id + "/calendar";
    }
  }

  rq.onerrer = async function(){

  }

  rq.send(JSON.stringify({ username }))
}

async function signup(){
  let username = document.getElementById("userName").value;
  let password = document.getElementById("password").value;

  const rq = new XMLHttpRequest();
  rq.open("POST", "/api/events/:id/users")
  
  rq.onload = async function(){
    let resp = await JSON.parse(rq.response);
    if(resp.status != 200){
      alert(resp.error)
    }
    let data = await resp.json();
    window.location.href = "/" + data.id + "/calendar";
  }
}