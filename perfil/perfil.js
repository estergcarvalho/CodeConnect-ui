$(document).ready(function() {
    carregarPerfilUsuario();
    adicionarBotao();
    redesSociais();
    listarPostagens();
    carregarImagem();
});

function carregarPerfilUsuario() {
    var token = localStorage.getItem('token');
    const urlParams = window.location.search;
    const url = new URLSearchParams(urlParams);
    const id = url.get('id');

    if (id !== null) {
        $.ajax({
            url: 'http://localhost:8080/usuarios/' + id,
            type: 'GET',
            dataType: "json",
            headers: { 'Authorization': 'Bearer ' + token },
            success: function(usuario) {
                $('#perfil-usuario').html(
                    `<div class="card-body-profile row">
                        <div class="col-8">
                            <h4>`+ usuario.nome +`</h4>
    
                            <h5>`+ usuario.profissao +`</h5>
    
                            <p>`+ usuario.estado +`, `+ usuario.pais +`</p>
                             
                            <div id="botao-perfil"></div>
                        </div>
                        <div class="col-4" id="redes-sociais"></div>
                    </div>`
                );
                
                adicionarBotao(usuario);
                redesSociais(usuario);
            },
            error: function(status, response, error) {
                console.error("Erro ao obter dados do usuário: " + error);
            }
        });
    }
}

function adicionarBotao(usuario) {
    let usuarioLogado = usuario?.usuario_logado;
    let relacionamento = usuario?.status_relacionamento;

    var botao = '';

    if (usuarioLogado == true) {
        botao = `<button class="card-body-user-edit-btn" type="button"><a href="/perfil/editar.html">Editar Perfil</a></button>`;
    } else {
        if (relacionamento == 'PENDENTE') {
            botao = `<button class="card-body-user-edit-btn" type="button"><a href="/perfil/editar.html">Solicitação enviada</a></button>`;
        }

        if (relacionamento == null) {
            botao = `<button class="card-body-user-edit-btn" type="button"><a href="/perfil/editar.html">Adicionar</a></button>`;
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

    if (id !== null) {
    $.ajax({
        url: 'http://localhost:8080/posts/' + id,
        type: 'GET',
        dataType: "json",
        headers: { 'Authorization': 'Bearer ' + token },
        success: function (data) {
            data.forEach(function (post) {
                $('#lista-postagem').prepend(
                    `<div class="card-post card">
                        <div class="card-header">
                            <div class="row">
                                <div class="card-post-avatar col-2">
                                    <a href="/perfil/perfil.html">
                                        <img src="/assets/img/usuarios/ana.jpg" alt="Foto de Ana">
                                    </a>
                                </div>
                                
                                <div class="col-10 position-relative">
                                    <div class="card-post-user-name position-absolute top-50 translate-middle">
                                        <div>
                                            <a href="/perfil/perfil.html">Ana Carvalho</a>
                                        </div>  
                                        <div class="card-post-profession">
                                                Engenheira Software
                                        </div>  
                                        <div class="card-post-date">
                                                10 horas
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="card-body">
                            <p class="card-post-text">
                                `+ post.descricao + `
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
        error: function (status, response, error) {
            console.error("Erro ao listar postagens" + error);
        }
    });
    }
}

function carregarImagem() {
    $('.card-profile-update-icon-text').click(function() {
        $('#input-update-img').click();
    });  
}