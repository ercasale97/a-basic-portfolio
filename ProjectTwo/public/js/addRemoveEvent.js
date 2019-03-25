

$('#add-event').on('click', function () {
    let body = {
        eventId: this.val()
    }
    $.ajax({
        url: '/event/add',
        data: body,
        method: 'post',
    })
    .then(function(response){
        
    })
})





$('#not-going').on('click', function () {



})