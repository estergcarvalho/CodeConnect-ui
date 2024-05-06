$(document).ready(function() {
    reacaoCutir();
    reacaoComentario();
    comentar();
});

function reacaoCutir() {
    $(".card-reactions-like").click(function(e) {
        e.preventDefault();

        var id = $(this).prop("id");

        $(this).find("i.bi-heart").removeClass("bi-heart").addClass("bi-heart-fill");
    });
}

function reacaoComentario() {
    $(".card-reactions-comment").click(function(e) {
        e.preventDefault();

        var id = $(this).prop("id");

        $("#card-comment-text-" + id).focus();
    });
}

function comentar() {  
    $(".card-comment-text-area").on("keyup", function() {
        $(this).siblings("#btnComentar").hide();

        var texto = $(this).val().trim();

        if (texto !== "") {
            $(this).siblings("#btnComentar").show();
        }
    });
   
}