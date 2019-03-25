// import { userInfo } from "os";

// FUNCTION FOR PROFILE EVENTS
// console.log(localStorage.getItem(user.id))

$.ajax({
    url: '/api/events/user',
    method: 'get'
})
    .then(function (response) {
        if(response.length) $('.populateMessage').text('')
        console.log(response)
        for (i in response) {
            $.ajax({
                url: '/api/event/'+response[i].EventId,
                method: 'get',
            })
                .then(function (eventRes) {
                    $('#my-events').append(
                        `<div class='event'>
                            <div id='event-title' class='event-item'>${eventRes.title}</div>
                            <div id='event-date' class='event-item'>${eventRes.date}</div>
                            <div id='event-location' class='event-item'>${eventRes.location}</div>
                            <div id='event-artist' class='event-item'>${eventRes.artist}</div>
                        </div>`
                    )
                })
        }
    })



// FUNCTION FOR PROFILE INFO

$.ajax({
    url: "/api/profile",
    method: "GET",
})
.then(function(response){
    console.log(response)
    $('#name').text(response.name);
    $('#email').text(response.email);
})