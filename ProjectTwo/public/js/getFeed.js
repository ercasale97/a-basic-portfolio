



// FUNCTION FOR ALL EVENTS

$.ajax({
    url: '/api/events',
    method: 'get'
})
    .then(function (response) {
        console.log(response)
        for (i in response) {
            $('#feed').append(
                `<div class='event'>
                    <div id='event-title' class='event-item'>${response[i].title}</div>
                    <div id='event-date' class='event-item'>${response[i].date}</div>
                    <div id='event-location' class='event-item'>${response[i].location}</div>
                    <div id='event-artist' class='event-item'>${response[i].artist}</div>
                </div>`
            )
        }
    })
