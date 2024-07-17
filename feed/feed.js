$(document).ready(function() {
    reacaoCurtir();
    reacaoComentario();
    comentar();
    carregarAtividadesRecentes();
    carregarMusicas();
    carregarTabNews();
    fazerComentario();
    fazerPublicacao();
    publicarFeed();
    habilitarPublicacao();
    listarPostagens();
});

function publicarFeed() {
    $("#btn-publicar").click(function() {
        var cardPublicarFeed = $(".card-post-publish-loading");
        cardPublicarFeed.fadeIn();
        cardPublicarFeed.LoadingOverlay("show");

        var desabilitarPublicacao = $('.card-post-create-publish-btn');
        desabilitarPublicacao.attr('disabled', true);

        var publicacao = $("#publicacao");
        var publicacaoTexto = publicacao.val();

        var token = localStorage.getItem('token');

        $.ajax({
            url: 'http://localhost:8080/posts',
            type: 'POST',
            contentType: 'application/json',
            headers: {'Authorization': 'Bearer ' + token},
            data: JSON.stringify({ descricao: publicacaoTexto }),
            success: function(response) {
                $(".card-post-container").prepend(
                    `<div class="card-post card">
                        <div class="card-header">
                            <div class="row">
                                <div class="card-post-avatar col-2">
                                    <a href="/perfil/perfil.html">
                                        <img src="/assets/img/usuarios/caique.jpg" alt="Foto de Caique">
                                    </a>
                                </div>
                                <div class="col-10 position-relative">
                                    <div class="card-post-user-name position-absolute top-50 translate-middle">
                                        <div>
                                            <a href="/perfil/perfil.html">Teste2</a>
                                        </div>  
                                        <div class="card-post-profession">
                                                Engenheiro Software
                                        </div>  
                                        <div class="card-post-date">
                                                1 hora
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="card-body">
                            <p class="card-post-text">
                            `+ response.descricao +`
                            </p>
                        </div>
                        <div class="card-footer pb-0">
                            <div class="card-reactions-count">
                                <a href="#" class="card-reactions-count-likes">10 curtidas</a>
                                <a href="#">2 comentários</a>
                            </div>
                            <hr class="card-line card-line-count">
                            <div class="card-reactions">
                                <a class="card-reactions-like" href="#" id="0">
                                    <i class="bi bi-heart" id="img-like-1"></i>
                                    <span>Curtir</span>
                                </a>
                                <a class="card-reactions-comment" href="#" id="0">
                                    <i class="bi bi-chat"></i>
                                    <span>Comentar</span>
                                </a>
                                <a href="#">
                                    <i class="bi bi-share"></i>
                                    <span>Compartilhar</span>
                                </a>
                            </div>
                            <hr class="card-line card-line-reactions">
                            <div class="card-comment">
                                <img class="card-comment-avatar" src="/assets/img/usuarios/ana.jpg" alt="Foto de ana">
                                <div class="card-comment-text mb-3">
                                    <textarea class="card-comment-text-area" id="card-comment-text-1" placeholder="Escreva um comentário..."></textarea>
                                    <label class="form-label d-none" for="card-comment-text-1"></label>
                                    <button class="card-comment-btn" id="btnComentar" type="button">Comentar</button>
                                </div>
                            </div>
                        </div>
                    </div>`
                );

                cardPublicarFeed.LoadingOverlay("hide");
                cardPublicarFeed.fadeOut();
                publicacao.val('');
                desabilitarPublicacao.attr('disabled', false)
            },
            error: function(status, response, error) {
                console.error("Erro realizar a postagem" + error);
              
            }
        });
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

function habilitarPublicacao() {
    $("#publicacao").on('input', function() {
        var habilitarBtn = $('.card-post-create-publish-btn');
        var publicacao = $(this).val().trim();

        if (publicacao === "") {
            habilitarBtn.attr('disabled', true);
        } else {
            habilitarBtn.removeAttr('disabled');
        }
    });
}

function listarPostagens() {
    var token = localStorage.getItem('token');

    $.ajax({
        url: "http://localhost:8080/posts/recentes",
        type: 'GET',
        dataType: "json",
        headers: {'Authorization': 'Bearer ' + token},
        success: function(data) {
            data.forEach(function(post) {
                let profissao = usuario.profissao != null && usuario.profissao !== "" ? usuario.profissao : "";

                $('#lista-postagem').append(
                    `<div class="card-post card">
                        <div class="card-header">
                            <div class="row">
                                <div class="card-post-avatar col-2">
                                    <a href="/perfil/perfil.html?id=` + post.usuario.id + `">
                                        <img src="/assets/img/usuarios/ana.jpg" alt="Foto de Ana">
                                    </a>
                                </div>
                                
                                <div class="col-10 card-post-user">
                                    <div class="card-post-user-name">
                                        <div>
                                            <a href="/perfil/perfil.html?id=` + post.usuario.id + `">`+ post.usuario.nome +`</a>
                                        </div>  
                                        <div class="card-post-profession">
                                            `+ profissao +`
                                        </div>  
                                        <div class="card-post-date">
                                            1 hora
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="card-body">
                            <p class="card-post-text">
                                `+ post.descricao +`
                            </p>
                        </div>
                        <div class="card-footer pb-0">
                            <div class="card-reactions-count">
                                <a href="#" class="card-reactions-count-likes">0 curtidas</a>
                                <a href="#">0 comentários</a>
                            </div>

                            <hr class="card-line card-line-count">

                            <div class="card-reactions">
                                <a class="card-reactions-like" href="#" id="0">
                                    <i class="bi bi-heart" id="img-like-1"></i>
                                    <span>Curtir</span>
                                </a>

                                <a class="card-reactions-comment" href="#" id="0">
                                    <i class="bi bi-chat"></i>
                                    <span>Comentar</span>
                                </a>

                                <a href="#">
                                    <i class="bi bi-share"></i>
                                    <span>Compartilhar</span>
                                </a>
                            </div>

                            <hr class="card-line card-line-reactions">

                            <div class="card-comment">
                                <img class="card-comment-avatar" src="/assets/img/usuarios/ana.jpg" alt="Foto de ana">

                                <div class="card-comment-text mb-3">
                                    <textarea class="card-comment-text-area" id="card-comment-text-2" placeholder="Escreva um comentário..."></textarea>
                                    <label class="form-label d-none" for="card-comment-text-1"></label>
                                    <button class="card-comment-btn" id="btnComentar" type="button">Comentar</button>
                                </div>
                            </div>
                        </div>
                    </div>`
                );
            });
        },
        error: function(status, response, error) {
            console.error("Erro ao listar postagens" + error);
        }
    });                  
}

function reacaoCurtir() {
    $(".card-reactions-like").click(function(e) {
        e.preventDefault();

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

function carregarAtividadesRecentes() {
    var cardTimeline = $(".card-timeline-activity-body");

    cardTimeline.LoadingOverlay("show");

    setTimeout(function() {
        cardTimeline.LoadingOverlay("hide");
    }, 3000);
}

function carregarMusicas() {
    var cardPlaylistMusica = $(".card-playlist-music-body");

    cardPlaylistMusica.LoadingOverlay("show");

    setTimeout(function() {
        cardPlaylistMusica.LoadingOverlay("hide");
    }, 3000);
}

function carregarTabNews() {
    var cardTabNews = $(".card-tab-news-body");

    cardTabNews.LoadingOverlay("show");

    setTimeout(function() {
        cardTabNews.LoadingOverlay("hide");
    }, 3000);
}

function fazerComentario() {
    $(".card-comment-text-area").on('input', function() {
        $(this).css('height', this.scrollHeight + 'px');

        var texto = $(this).val().trim();

        if (texto === "") {
            $(this).css('height', '');
        }
    });
}

