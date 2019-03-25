// only in our client-side logic (as this) do we make sure to add api routes

$(document).ready(function() {

    var queryURL = "/api/events";

    $("#info").on("click", function() {
         const body = {
            email: $("#email").val()
    }

    $.ajax({
        url: queryURL,
        method: "POST"
    })
    .then(function(response) {
        console.log(response)
    })
    })
});

function fix_onChange_editable_elements()
{
  var tags = document.querySelectorAll('[contenteditable=true][onChange]');//(requires FF 3.1+, Safari 3.1+, IE8+)
  for (var i=tags.length-1; i>=0; i--) if (typeof(tags[i].onblur)!='function')
  {
    tags[i].onfocus = function()
    {
      this.data_orig=this.innerHTML;
    };
    tags[i].onblur = function()
    {
      if (this.innerHTML != this.data_orig)
        this.onchange();
      delete this.data_orig;
    };
  }
}
