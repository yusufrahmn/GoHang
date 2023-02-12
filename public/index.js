async function newEvent() {
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
        res.json().then((data) => {
            window.location.href += data.id;
        });
    });
}