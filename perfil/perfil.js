$(document).ready(function() {
    listarPostagens();
    carregarImagem();
});

function listarPostagens() {
    var token = localStorage.getItem('token');

    $.ajax({
        url: "http://localhost:8080/posts",
        type: 'GET',
        dataType: "json",
        headers: { 'Authorization': 'Bearer ' + token },
        success: function(data) {
            data.forEach(function(post) {
                $('#lista-postagem').prepend(
                    `<div class="card-post card">
                        <div class="card-header">
                            <div class="row">
                                <div class="card-post-avatar col-2">
                                    <a href="/perfil/perfil.html">
                                        <img src="/assets/img/usuarios/ana.jpg" alt="Foto de Caique">
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
        error: function (status, response, error) {
                console.error("Erro ao listar postagens" + error);
        }
    });
}

function carregarImagem() {
    $('.card-profile-update-icon-text').click(function() {
        $('#input-update-img').click();
    });  
}