$(document).ready(function() {
    $(".card-reactions-like").click(function(e) {
        e.preventDefault();

        var id = $(this).prop("id");
        
        $("#img-like-" + id).attr("src", "/assets/icons/curtido.png");
    });

    $(".card-reactions-comment").click(function(e){
        e.preventDefault();

        var id = $(this).prop("id");

        $("#card-comment-text-" + id).focus();
    });
});