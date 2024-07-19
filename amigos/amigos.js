$(document).ready(function() {
    listarAmigos();
});

function listarAmigos() {
    var amigosUsuario = $(".card-post-list-friends-loading");
    amigosUsuario.fadeIn();
    amigosUsuario.LoadingOverlay("show");

    var token = localStorage.getItem('token');

    $.ajax({
        url: "http://localhost:8080/usuarios/amigos",
        type: 'GET',
        dataType: "json",
        headers: {'Authorization': 'Bearer ' + token},
        success: function(data) {
            var amigos = data.amigos;
            var totalAmigos = data.total;

            $('#total-amigos').html('(' + totalAmigos + ')');
            
            var contador = 1;
            amigos.forEach(function(amigo) {
                $('#lista-amigos').append(
                `<div class="card-friends-content align-items-center text-center col-2"> 
                    <div class="card-friends-user">
                        <a class="card-friends-avatar" href="/perfil/perfil.html?id= `+ amigo.idAmigo +`">
                            <img class="img-thumbnail rounded-circle" alt="image-user" src="/assets/img/usuarios/luiz.jpg">
                            <p class="card-friends-user-name mb-1">` + amigo.nome + `</p> 
                        </a>
                        <span></span>
                    </div>
                 </div>`
                );

                if (contador == 6) {
                    $(".card-post-list-friends-loading .card-body").append(
                        '<hr class="card-friends-divisor">'
                    );
                }

                contador++;
            });

            var listarAmigos = $(".card-post-list-friends-loading");
            listarAmigos.LoadingOverlay("hide");
        },
        error: function(response) {
            tokenExpirado(response);
        }
    });
}