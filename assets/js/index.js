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
            $('#item-perfil-user').attr('href','/perfil/perfil.html?id=' + perfil.id);
            $('#item-perfil-edit').attr('href','/perfil/editar.html?id=' + perfil.id);
        },
        error: function(response) {
            tokenExpirado(response);
        }
    });
}