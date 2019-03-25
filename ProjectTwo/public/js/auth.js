// pull token from localStorage to auth header

function attachToken(token) {
  if (token) {
    localStorage.setItem("token", token)
  }
    // the attachToken function adds the token to EVERY ajax request
    $.ajaxSetup({
        headers: {
          Authorization: "Bearer " + localStorage.getItem('token')
        }
      });
}

attachToken();