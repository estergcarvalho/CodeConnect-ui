$(document).ready(function() {
    $('#form-login').submit(function(event) {
        event.preventDefault();

        validaCampos();
        login();
    });
});

function validaCampos() {
    var email = $("#email").val();
    var senha = $("#senha").val();

    if (email.trim() === "") {
        alert("É necessário preencher o campo e-mail.");
    }

    if (senha.trim() === "") {
        alert("É necessário preencher o campo de senha");
    }
}

function login() {
    var email = $("#email").val();
    var senha = $("#senha").val();

    $.ajax({
        url: "http://localhost:8080/login",
        type: 'POST',
        contentType: "application/json",
        dataType: 'json',
        data: JSON.stringify({ email, senha }),
        success: function(response) {
            localStorage.setItem('token', response.access_token);
            window.location.href = '/feed/feed.html';
        },
        error: function(xhr, status, error) {
            alert('Erro ao fazer login', error);
        }
    });
}