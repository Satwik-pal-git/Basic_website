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

var isRemoved = true;
$("#UserProfile").click(function () {
    console.log("clicked");
    if (isRemoved) {
        $(".logout").attr("id", "disp-t");
        isRemoved = !isRemoved;
    } else {
        $(".logout").attr("id", "disp-f");
        isRemoved = !isRemoved;
    }

    // $('.logout').toggleId('disp');
});