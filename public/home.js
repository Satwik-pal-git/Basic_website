$(document).ready(function () {
    $("a").on("click", function (event) {
        if (this.hash !== "") {
            event.preventDefault();

            var hash = this.hash;
            $("html, body").animate(
                {
                    scrollTop: $(hash).offset().top,
                },
                800,
                function () {
                    window.location.hash = hash;
                }
            );
        }
    });
    var myDiv = $("#UserDiv");

    myDiv.show();
    setTimeout(function () {
        myDiv.hide();
    }, 5000);
});

$(".menu-items a").click(function () {
    $("#checkbox").prop("checked", false);
});

$(".user").click(function () {
    console.log("clicked");
    $('#logged').toggleClass('disp');
});