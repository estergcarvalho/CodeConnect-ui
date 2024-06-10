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
        headers: {'Authorization': 'Bearer '+ token},
        success: function(data) {
            var amigos = data.amigos;
            var totalAmigos = data.total;

            $('#total-amigos').html('<h5>Amigos <span>' + '(' + totalAmigos + ')' + '</span></h5>');
            
            amigos.forEach(function(amigo) {
                $('#lista-amigos').append(
                    '<div class="card-friends-content align-items-center text-center col-2"> ' +
                    '<div class="card-friends-user">' +
                    '<a class="card-friends-avatar" href="/perfil/perfil.html">' +
                    '<img class="img-thumbnail rounded-circle" alt="image-user" src="/assets/img/usuarios/luiz.jpg">' +
                    '</a>' +
                    '<p class="card-friends-user-name mb-1">' + amigo.nome + '</p> ' +
                    '<span></span>' +
                    '</div>' +
                    '</div>' 
                );
            });

            setTimeout(function () {
                var listarAmigos = $(".card-post-list-friends-loading");
                listarAmigos.LoadingOverlay("hide");
            }, 2000);
        },
        error: function(status, response, error) {
            console.error("Erro ao listar amigos" + error);
        }
    });
}