// ID's:

//   event-title
//   event-date
//   event-location
//   event-artist

// post and create new event
$(document).ready(function() {
    $('#formSubmit').on('click', function() {
          var body = {
            title: $('#title').val(),
            date: $('#date').val(),
            location: $('#location').val(),
            artist: $('#artist').val(),
        }
        console.log("Body to be sent: " + body)
        $.ajax({
            url: "/api/event/new",
            data: body,
            method: "post",
        })
        .then(function(response) {
            console.log("Response"+response)
            // close modal
            modal.style.display = "none"
            location.href = "/profile"
        })
    })
}); 
