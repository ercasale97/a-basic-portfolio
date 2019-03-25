// import { read } from "fs";

$('#sign-in-button').on('click', function() {
    var body = {
        email: $('#email').val(),
        password: $('#password').val(),
    }
    $.ajax({
        url: "/api/login",
        data: body,
        method: "post"
    })
    .then(function(response) {
        localStorage.setItem(
            'token', response.token
        )
        location.href = "/profile";
    })
});

$('#sign-up-button').on('click', function() {
    var body = {
        email: $('#new-email').val(),
        password: $('#new-password').val(),
        name: $('#new-name').val(),
    }
    console.log("Sign up request sent...")
    $.ajax({
        url: "/api/user/new",
        data: body,
        method: "post"
    })
    .then(function(response) {
       localStorage.setItem(
           'token', response.token
       )
       if (!response.errors)
       location.href = "/profile";
       else ($('#error').text(response.errors[0].message));
    })
});



$('#logout').on('click', function(){
    // clear local storage
    localStorage.removeItem('token');
    // navigate to login page
    location.href = "/"
})