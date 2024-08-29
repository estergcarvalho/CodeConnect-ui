$(document).ready(function() {
    carregarPerfilUsuario();
    adicionarBotao();
    redesSociais();
    listarPostagens();
    adicionarImagem();
    reacaoCurtir();
    removerCurtida();
    enviarComentario();
});

function carregarPerfilUsuario() {
    var token = localStorage.getItem('token');
    const urlParams = window.location.search;
    const url = new URLSearchParams(urlParams);
    const id = url.get('id');

    if (id != null) {
        $.ajax({
            url: 'http://localhost:8080/usuarios/' + id,
            type: 'GET',
            dataType: "json",
            headers: { 'Authorization': 'Bearer ' + token },
            success: function(usuario) {
                var imagem = carregarImagem(usuario);

                let profissao = usuario.profissao != null ? usuario.profissao : "";
                let localizacao = (usuario.estado != null)
                ? (usuario.pais != null ? usuario.estado + `, ` + usuario.pais : usuario.estado)
                : (usuario.pais != null ? usuario.pais : "");

                $('#perfil-usuario').html(
                    `<div class="card-body-profile row">
                        <div class="col-8">
                            <h4>`+ usuario.nome +`</h4>
    
                            <h5>`+ profissao +`</h5>
    
                            <p>`+ localizacao +`</p>
                             
                            <div id="botao-perfil"></div>
                        </div>
                        <div class="col-4" id="redes-sociais"></div>
                    </div>`
                );

                $('#profile-image').attr('src', imagem);
                
                adicionarBotao(usuario);
                redesSociais(usuario);
            },
            error: function(response) {
                tokenExpirado(response);
            }
        });
    }
}

function adicionarBotao(usuario) {
    const urlParams = window.location.search;
    const url = new URLSearchParams(urlParams);
    const id = url.get('id');
    
    let usuarioLogado = usuario?.usuario_logado;
    let relacionamento = usuario?.status_relacionamento;
    
    var botao = '';

    if (usuarioLogado == true) {
        botao = `<button class="card-body-user-edit-btn" type="button"><a href="/perfil/editar.html?id=` + id + `">Editar Perfil</a></button>`;
    } else {
        if (relacionamento == 'PENDENTE') {
            botao = `<button class="card-body-user-edit-btn" type="button"><a href="/perfil/editar.html?id=` + id + `">Solicitação enviada</a></button>`;
        }

        if (relacionamento == null) {
            botao = `<button class="card-body-user-edit-btn" type="button"><a href="/perfil/editar.html?id=` + id + `">Adicionar</a></button>`;
        }
    } 

    $('#botao-perfil').html(botao);
}

function redesSociais(usuario) {
    let redesUsuario = usuario?.redes_sociais;

    if (redesUsuario != null && redesUsuario.length > 0) {
        redesUsuario.forEach(rede => {
            let imagem = '';
   
            switch(rede.nome.toLowerCase()) {
                case 'github':
                    imagem = 'github.png';
                    break;
                case 'linkedin':
                    imagem = 'linkedin.png';
                    break;
                case 'youtube':
                    imagem = 'youtube.png';
                    break;
                default:
                    imagem = 'default.png'; 
            }

            $('#redes-sociais').append(
                `<div class="card-body-profile-social-media">
                    <a href="` + rede.link + `" target="_blank">
                        <img src="/assets/icons/` + imagem + `">
                    </a>
                </div>`
            );
        });
    }
}

function listarPostagens() {
    var token = localStorage.getItem('token');
    const urlParams = window.location.search;
    const url = new URLSearchParams(urlParams);
    const id = url.get('id');

    if (id != null) {
        $.ajax({
            url: 'http://localhost:8080/posts/' + id,
            type: 'GET',
            dataType: "json",
            headers: { 'Authorization': 'Bearer ' + token },
            success: function(data) {
                var imagem = carregarImagem(data.usuario);

                data.posts.forEach(function(post) {
                    let curtidoClasse = post.curtido ? 'card-reactions-unlike' : 'card-reactions-like';
                    let curtidoIcone = post.curtido ? 'bi-heart-fill' : 'bi-heart';
                    let curtidoTexto = post.curtido ? 'card-reactions-like-text' : '';
                    
                    $('#lista-postagem').append(
                        `<div class="card-post card">
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
                                    <img class="card-comment-avatar" src=" `+ imagem +`" alt="Foto de `+ post.nome +`">
    
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
    
                    listarComentariosPerfil(post.id, post.comentarios);
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
}

function adicionarImagem() {
    var token = localStorage.getItem('token');

    $('.card-profile-update-icon-text').click(function() {
        $('#input-update-img').click();
    });  

    $('#input-update-img').change(function() {
        var arquivo = this.files[0];

        if (arquivo) {
            var formData = new FormData();
            formData.append('imagem', arquivo);
        
            $.ajax({
                url:'http://localhost:8080/usuarios/adicionarImagem',
                type: 'POST',
                enctype: 'multipart/form-data',
                contentType: false,
                processData: false,
                data: formData,
                headers: { 'Authorization': 'Bearer ' + token },
                success: function(response) {
                    $('#profile-image').attr('src', `data:`+ response.tipo_imagem +`;base64, `+ response.imagem);
                },
                error: function(error) {
                    alert('Erro ao carregar a imagem', error);
                }
            });
        }
    }) 
}

function listarComentariosPerfil(postId, comentarios) {
    comentarios.forEach(comentario => {
        var imagem = carregarImagem(comentario.usuario);

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
                        12 min
                    </div>
                </div>
            </div>`
        );
    });
}