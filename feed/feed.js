$(document).ready(function() {
    dadosPerfil();
    listarPostagens();
    carregarAtividadesRecentes();
    carregarMusicas();
    carregarTabNews();
    fazerPublicacao();
    publicarFeed();
    habilitarPublicacao();
    reacaoCurtir();
    removerCurtida();
    totalCurtidas();
    enviarComentario();
    listarAtividadesRecentes();
});

function dadosPerfil() {
    var token = localStorage.getItem('token');
    
    $.ajax({
        url: 'http://localhost:8080/usuarios/perfil',
        type: 'GET',
        contentType: 'application/json',
        headers: {'Authorization': 'Bearer ' + token},
        success : function(perfil) {
            var imagem = carregarImagem(perfil);

            $("#profile-user-data").attr('src', imagem).attr('alt', 'Foto de' + perfil.nome);
            $("#profile-user-link").attr('href','/perfil/perfil.html?id=' + perfil.id);
        },
        error: function(response) {
            tokenExpirado(response);
        }
    });
}

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
                var imagem =  carregarImagem(response);

                $(".card-post-container").prepend(
                    `<div class="card-post card">
                        <div class="card-header">
                             <div class="row">
                                <div class="card-post-avatar col-2">
                                        <a href="/perfil/perfil.html?id=` + response.id + `">
                                        <img src="`+ imagem +`" alt="Foto de `+ response.nome +`">
                                    </a>
                                </div>
                                    
                                <div class="col-10 card-post-user">
                                    <div class="card-post-user-name">
                                        <div>
                                            <a href="/perfil/perfil.html?id=` + response.id + `">`+ response.nome +`</a>
                                        </div>  
                                        <div class="card-post-profession">
                                            `+ response.profissao +`
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
                               <a class="card-reactions-comment" href="#" id="`+ response.id +`">
                               <a class="card-reactions-comment" href="#" id="`+ response.id +`">
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
                                <img class="card-comment-avatar" src="`+ imagem +`" alt="Foto de `+ response.nome +`">

                                <div class="card-comment-text mb-3">
                                    <textarea class="card-comment-text-area" id="card-comment-text-`+ response.id +`" placeholder="Escreva um comentário..."></textarea>
                                    <textarea class="card-comment-text-area" id="card-comment-text-`+ response.id +`" placeholder="Escreva um comentário..."></textarea>
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
                desabilitarPublicacao.attr('disabled', false);
            },
            error: function(response) {
                tokenExpirado(response);
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
                var imagem = carregarImagem(post.usuario);
                let curtidoClasse = post.curtido ? 'card-reactions-unlike' : 'card-reactions-like';
                let curtidoIcone = post.curtido ? 'bi-heart-fill' : 'bi-heart';
                let curtidoTexto = post.curtido ? 'card-reactions-like-text' : '';
                var dataCriacao = new Date(post.data_criacao).toLocaleString();
                
                $('#lista-postagem').append(
                    `<div class="card-post card">
                        <div class="card-header">
                            <div class="row">
                                <div class="card-post-avatar col-2">
                                    <a href="/perfil/perfil.html?id=` + post.usuario.id + `">
                                        <img src=" `+ imagem +`" id="profile-image-user" alt="Foto de `+ post.usuario.nome +`">
                                    </a>
                                </div>
                                
                                <div class="col-10 card-post-user">
                                    <div class="card-post-user-name">
                                        <div>
                                            <a href="/perfil/perfil.html?id=` + post.usuario.id + `">`+ post.usuario.nome +`</a>
                                        </div>  
                                        <div class="card-post-profession">
                                            `+ post.usuario.profissao +`
                                        </div>  
                                        <div class="card-post-date">
                                           `+ dataCriacao +`
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
                                <a href="#" class="card-reactions-count-likes" id="curtida-`+ post.id +`">`+ post.totalCurtidas.total +` curtidas</a>
                                <a href="#" class="card-reactions-count-comment" id="comentario-`+ post.id +`">`+ post.totalComentarios.total +` comentários</a> 
                            </div>

                            <hr class="card-line card-line-count">

                            <div class="card-reactions">
                                <a class="`+ curtidoClasse +`" href="#" id="`+ post.id +`">
                                    <i class="`+ curtidoIcone +`" id="`+ post.id +`"></i>
                                    <span class="`+ curtidoTexto +`">Curtir</span>
                                </a>

                                <a class="card-reactions-comment" href="#" id="`+ post.id +`">
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
                                   <img class="card-comment-avatar" src=" `+ imagem +`" alt="Foto de `+ post.usuario.nome +`">

                                <div class="card-comment-text mb-3">
                                    <textarea class="card-comment-text-area" id="card-comment-text-`+ post.id +`" placeholder="Escreva um comentário..."></textarea>
                                    <label class="form-label d-none" for="card-comment-text-1"></label>
                                    <button class="card-comment-btn" id="`+ post.id +`" type="button">Comentar</button>
                                </div>
                            </div>

                            <div id="comentar-post-`+ post.id +`" class="card-comment-response row">
                            </div>
                        </div>
                    </div>`
                );

                listarComentarios(post.id, post.comentarios);
                focoTextareaComentario();
                expandirTextareaComentario();
                exibirBotaoComentario();
            });
        },
        error: function(response) {
            tokenExpirado(response);
        }
    });                  
}

function listarComentarios(postId, comentarios) {
    comentarios.forEach(comentario => {
        var imagem = carregarImagem(comentario.usuario);
        var dataCriacao = new Date(comentario.data_criacao).toLocaleString();
        
        $('#comentar-post-' + postId).append(
            `<div class="card-comment-response-comment d-flex mb-3">
                <a href="/perfil/perfil.html">
                    <img class="card-comment-avatar col-2" src="` + imagem + `" alt="Foto de ` + comentario.usuario.nome + `">
                </a> 

                <div class="card-response-user col-10">
                    <div class="card-comment-response-text"> 
                        <span>
                            <a href="/perfil/perfil.html?id=` + comentario.usuario.id + `">` + comentario.usuario.nome + `</a>
                                ` + comentario.descricao + ` 
                        </span>
                    </div>

                    <div class="card-comment-response-options">
                        <a href="#">Curtir</a>
                        <a href="#">Comentar</a>
                        `+ dataCriacao +`
                    </div>
                </div>
            </div>`
        );
    });
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


function carregarAtividadesRecentes() {
    var cardTimeline = $(".card-timeline-activity-body");

    cardTimeline.LoadingOverlay("show");

    setTimeout(function() {
        cardTimeline.LoadingOverlay("hide");
    }, 3000);
}

function listarAtividadesRecentes() {
    var token = localStorage.getItem('token');

    $.ajax({
        url: "http://localhost:8080/atividades-recentes",
        type: 'GET',
        dataType: "json",
        headers: {'Authorization': 'Bearer ' + token},
        success: function(data) {
            $('#atividade-recente').append(
                `<div class="card-timeline-header card-header position-relative">
                    <div class="card-timeline-title position-absolute top-50 start-50 translate-middle">
                        <h5>Atividades recentes</h5>
                    </div>
                </div>`
            );

            data.forEach(function(atividade) {
                var imagem = carregarImagem(atividade); 
                var dataCriacao = new Date(atividade.data_criacao).toLocaleString();
                let icone = atividade.atividade === "CURTIDA" ? '<i class="bi bi-heart"></i>' : '<i class="card-icon bi bi-chat"></i>';

                $('#atividade-recente').append(
                    `<div class="card-body card-timeline-activity-body">
                        <div class="card-timeline-activity row">
                            <div class="card-timeline-icon card-timeline-line col-md-1 col-lg-2">
                               `+ icone +`
                            </div>
                            <div class="card-timeline-recent-activity col-md-11 col-lg-10">
                                <div class="card-timeline-content"> 
                                    <div class="card-timeline-card">
                                        <a href="/perfil/perfil.html?id=`+ atividade.id +`">
                                            <img src="`+ imagem +`" alt="Foto de `+ atividade.nome +`">
                                            <span class="card-timeline-name-user">`+ atividade.nome +`</span>
                                        </a>
                                        <p>`+ (atividade.atividade === "CURTIDA" ? "Curtiu" : "Comentou em") + ` uma <a href="/post/`+ atividade.post_id +`">postagem</a>.</p>
                                        <p>`+ dataCriacao +`</p>   
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>`
                );
            });
        },
        error: function(response) {
            tokenExpirado(response);
        }
    });
}
