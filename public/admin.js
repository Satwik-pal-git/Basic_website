function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $('#imagePreview').css('background-image', 'url(' + e.target.result + ')');
            $('#imagePreview').hide();
            $('#imagePreview').fadeIn(650);
        }
        reader.readAsDataURL(input.files[0]);
    }
}
$("#imageUpload").change(function () {
    readURL(this);
});

var isRemoved = true;
$("#UserProfile").click(function () {
    console.log("clicked");
    if (isRemoved) {
        $(".logout").attr("id", "");
        isRemoved = !isRemoved;
    } else {
        $(".logout").attr("id", "disp");
        isRemoved = !isRemoved;
    }

    // $('.logout').toggleId('disp');
});