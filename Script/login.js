$(document).ready(function () {
    $("#login,#signup").click(function () {
        $(".login-section, .signup-section, .wrapper, .signup-section").toggleClass('move');
    })
});