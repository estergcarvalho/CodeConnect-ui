$(document).ready(function() {
    validarToken();

    $('#navbar-content').load("/topo/topo.html");
    $('#navbar-menu-scrollbar').load("/menu-lateral/menu-lateral.html");
    $('#footer-content').load("/rodape/rodape.html");

    $.LoadingOverlaySetup({
        image: '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="#64ccc5" d="M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z"><animateTransform attributeName="transform" dur="0.75s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12"/></path></svg>',
        imageColor: "#64CCCC",
        background: "rgba(0, 0, 0, 0.6)",
        size: 13
    });

    carregarDadosPerfil();
});

function validarToken() {
    var token = localStorage.getItem("token");

    if (token == null) {
        window.location.href = "/login/login.html";
    }
}

function logout() { 
    localStorage.removeItem("token");

    window.location.href = "/login/login.html";
}

function tokenExpirado(response) {
    let statusError = response.responseJSON;
    let error = response.status;

    if (statusError == 401 || error == 401) {
        localStorage.removeItem("token");
        
        window.location.href = "/login/login.html";
    }
}

function carregarImagem(usuario) {
    return usuario.imagem ?  `data:`+ usuario.tipo_imagem  +`;base64, ` + usuario.imagem : `/assets/img/usuarios/foto.jpg`;
}

function carregarDadosPerfil() {
    var token = localStorage.getItem('token');

    $.ajax({
        url: 'http://localhost:8080/usuarios/perfil',
        type: 'GET',
        contentType: 'application/json',
        headers: {'Authorization': 'Bearer ' + token},
        success: function(perfil) {
            var imagem = carregarImagem(perfil);

            $('#profile-user-image').attr('src', imagem).attr('alt', 'Foto de' + perfil.nome);
            $('#item-profile-user').attr('href','/perfil/perfil.html?id=' + perfil.id);
            $('#item-profile-edit').attr('href','/perfil/editar.html?id=' + perfil.id);
        },
        error: function(response) {
            tokenExpirado(response);
        }
    });
}

function reacaoCurtir() {
    $(document).on('click', '.card-reactions-like', function(e) {
        e.preventDefault();

        var token = localStorage.getItem('token');
        var $this = $(this);
        var id = $(this).attr('id');

        $.ajax({
            url: 'http://localhost:8080/posts/' + id + '/curtir',
            type:'POST',
            contentType:'application/json',
            headers: {'Authorization': 'Bearer ' + token},
            success: function() {
                $this.removeClass("card-reactions-like").addClass("card-reactions-unlike");
                $this.find("i").removeClass("bi-heart").addClass("bi-heart-fill");
                $this.find("span").addClass("card-reactions-like-text");

                totalCurtidas(id);
            },
            error: function(error) {
                console.log("Erro ao curtir", error);
            }
         }); 
    });           
}

function removerCurtida() {
    $(document).on('click', '.card-reactions-unlike', function(e) {
        e.preventDefault();
       
        var token = localStorage.getItem('token');
        var $this = $(this);
        var id = $(this).attr('id');

        if (id != null) {
            $.ajax({
                url: 'http://localhost:8080/posts/' + id + '/remover-curtida',
                type: 'DELETE',
                contentType: 'application/json',
                headers: {'Authorization': 'Bearer ' + token},
                success: function() {
                    $this.removeClass("card-reactions-unlike").addClass("card-reactions-like");
                    $this.find("i").removeClass("bi-heart-fill").addClass("bi-heart");
                    $this.find("span").removeClass("card-reactions-like-text");

                    totalCurtidas(id);
                },
                error: function(error) {
                    console.log("Erro ao remover curtida", error);
                }
            });
        }
    }); 
}

function totalCurtidas(id) {
    var token = localStorage.getItem('token');

    if (id != null) {
        $.ajax({
            url: 'http://localhost:8080/posts/' + id + '/total-curtidas',
            type: 'GET',
            contentType: 'application/json',
            headers: {'Authorization': 'Bearer ' + token},
            success: function(response) {
                var total = response.total;
                var textoCurtida = total > 1 ? 'curtidas' : 'curtida';

                $('#curtida-' + id).text(total + ' ' + textoCurtida);
            },
            error: function(error) {
                console.log("Erro ao retornar total de curtidas", error);
            },
        });
    }
}

function enviarComentario() {
    $(document).on('click', '.card-comment-btn', function() {
        var token = localStorage.getItem('token');
        var id = $(this).attr('id');
        var descricao = $('#card-comment-text-' + id).val().trim();
        var comentarRequest = {id: id, descricao: descricao};

        if (descricao === "") {
            alert("O comentário  não pode estar vazio");
        }
    
        if (id != null) {
            $.ajax({
                url:"http://localhost:8080/posts/comentar",
                type:'POST',
                contentType:"application/json",
                data:JSON.stringify(comentarRequest),
                headers: {'Authorization': 'Bearer ' + token},
                success: function(data) { 
                    var imagem = carregarImagem(data.usuario);

                    $("#comentar-post-" + id).append(
                        `<div class="card-comment-response-comment d-flex mb-3">
                            <a href="/perfil/perfil.html">
                                <img class="card-comment-avatar col-2" src=" `+ imagem +`" alt="Foto de `+ data.usuario.nome +`">
                            </a> 

                            <div class="card-response-user col-10">
                                <div class="card-comment-response-text"> 
                                    <span>
                                        <a href="/perfil/perfil.html?id=` + data.usuario.id + `">`+ data.usuario.nome +`</a>
                                            `+ descricao +` 
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

                    $("#card-comment-text-" + id).val('');
                    $(".card-comment-btn").hide();

                    totalComentarios(id);
                    diminuirTamanhoTextarea();
                },
                error: function(error) {
                    console.log("Erro ao adicionar comentário", error);
                },
            });
         };    
    });
}

function expandirTextareaComentario() {
    $(".card-comment-text-area").on('input', function() {
        $(this).css('height', this.scrollHeight + 'px');

        var texto = $(this).val().trim();

        if (texto === "") {
            $(this).css('height', '');
        }
    });
}

function diminuirTamanhoTextarea() {
    $(".card-comment-text-area").css('height', '40px'); 
}

function exibirBotaoComentario() {
    $(".card-comment-text-area").on("keyup", function() {
        $(this).siblings(".card-comment-btn").hide();

        var texto = $(this).val().trim();

        if (texto !== "") {
            $(this).siblings(".card-comment-btn").show();
        }
    });
}

function focoTextareaComentario() {
    $(document).on('click', '.card-reactions-comment', function(e) {
        e.preventDefault();

        var id = $(this).prop("id");

        $("#card-comment-text-" + id).focus();
    });    
}

function totalComentarios(id) {
    var token = localStorage.getItem('token');

    if (id != null) {
        $.ajax({
            url: 'http://localhost:8080/posts/' + id + '/total-comentarios',
            type:'GET',
            contentType:'application/json',
            headers:{'Authorization':'Bearer ' + token},
            success: function(response) {
                var total = response.total;

                var textoComentario = total > 1 ? 'comentarios' : 'comentario';

                $('#comentario-' + id).text(total + ' ' + textoComentario);
            },
            error: function(error) {
                console.log("Erro retornar total de comentários", error);
            },
        });
    };
}