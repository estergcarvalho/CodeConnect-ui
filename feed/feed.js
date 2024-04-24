$(document).ready(function() {
    $(".card-reactions-like").click(function(e) {
        e.preventDefault();

        var id = $(this).prop("id");
        
        $("#img-like-" + id).removeClass("bi-heart").addClass("bi-heart-fill");
    });

    $(".card-reactions-comment").click(function(e){
        e.preventDefault();

        var id = $(this).prop("id");

        $("#card-comment-text-" + id).focus();
    });
});