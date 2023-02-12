async function newEvent() {
    let name = document.getElementById("eventName").value;
    fetch('/api/events/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        redirect: 'follow', 
        body: JSON.stringify({
            name
        })
      })
        .then((res) => { res.json() })
        .then((data) => {
            location.href = `/${data.id}`
        });
    }