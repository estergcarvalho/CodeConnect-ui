$(document).ready(function() {
    $('#form-login').submit(function (event) {
        event.preventDefault();

        validaCampos();

    });
});

function validaCampos() {
    var email = $("#email").val();
    var senha = $("#senha").val();

    if(email.trim() === ""){
        alert("É necessário preencher o campo e-mail.");
    }

    if(senha.trim() === ""){
        alert("É necessário preencher o campo de senha");
    }
}