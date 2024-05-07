$(document).ready(function() {
    reacaoCutir();
    reacaoComentario();
    comentar();
    fazerComentario();
    fazerPublicacao();
});

function reacaoCutir() {
    $(".card-reactions-like").click(function(e) {
        e.preventDefault();

        $(this).find("i.bi-heart").removeClass("bi-heart").addClass("bi-heart-fill");
    });
}

function reacaoComentario() {
    $(".card-reactions-comment").click(function(e) {
        e.preventDefault();

        var id = $(this).prop("id");

        $("#card-comment-text-1" + id).focus();
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

function fazerComentario() {
    $("#card-comment-text-1").on('input', function() {
        $(this).css('height', this.scrollHeight + 'px');

        var texto = $(this).val().trim();

        if (texto === "") {
            $(this).css('height', '');
        }
    });
}

function fazerPublicacao() {
    $("#publicacao").on('input', function() {
        $(this).css('height', this.scrollHeight + 'px');

        var texto = $(this).val().trim();

        if (texto === "") {
            $(this).css('height', '');
        }
    });
}

