$(document).ready(function() {
    reacaoCurtir();
    reacaoComentario();
    comentar();
    carregarAtividadesRecentes();
    carregarMusicas();
    carregarTabNews();
    fazerComentario();
    fazerPublicacao();
});

function reacaoCurtir() {
    $(".card-reactions-like").click(function (e) {
        e.preventDefault();

        $(this).find("i.bi-heart").removeClass("bi-heart").addClass("bi-heart-fill");
    });
}

function reacaoComentario() {
    $(".card-reactions-comment").click(function (e) {
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

function carregarAtividadesRecentes() {
    var cardTimeline = $(".card-timeline-activity-body");

    cardTimeline.LoadingOverlay("show");

    setTimeout(function () {
        cardTimeline.LoadingOverlay("hide");
    }, 3000);
}

function carregarMusicas() {
    var cardPlaylistMusica = $(".card-playlist-music-body");

    cardPlaylistMusica.LoadingOverlay("show");

    setTimeout(function () {
        cardPlaylistMusica.LoadingOverlay("hide");
    }, 3000);
}

function carregarTabNews() {
    var cardTabNews = $(".card-tab-news-body");

    cardTabNews.LoadingOverlay("show");

    setTimeout(function () {
        cardTabNews.LoadingOverlay("hide");
    }, 3000);
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

function fazerComentario() {
    $("#card-comment-text-1").on('input', function() {
        $(this).css('height', this.scrollHeight + 'px');

        var texto = $(this).val().trim();

        if (texto === "") {
            $(this).css('height', '');
        }
    });
}