function error(elementID, text='Error') {
    let element = document.getElementById(elementID);
    element.ariaBusy = false;
    element.innerHTML = text;
}

window.onload = () => {
    // fetch(`/api/events/${id}`, {
    //     method: 'GET',
    //     headers: { 
    //       'Content-Type': 'application/json'
    //     }
    //   }).then((res) => { 
    //     if (res.status == 200) {
    //       res.json().then((data) => {
    //         //
    //       }) 
    //     } else if (res.status == 400) {
    //       res.json().then((data) => error('gcCalendar', data.error))
    //     } else {
    //       error('gcCalendar')
    //     }
    //   }).catch((err) => {
    //     error('gcCalendar')
    //   });
}