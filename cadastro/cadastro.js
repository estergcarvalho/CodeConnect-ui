$(document).ready(function() {
    $('#form-cadastro').submit(function(event) {
        event.preventDefault();
        
        validaCampos();
    });
});

function validaCampos() {
    var nome = $("#nome").val();
    var email = $("#email").val();
    var senha = $("#senha").val();
    var confirmasenha = $("#confirma-senha").val();

    if (nome.trim() === "") {
        alert("É necessário preencher o campo nome");
    }

    if (email.trim() === "") {
        alert("É necessário preencher o campo e-mail.");
    }

    if (senha.legth < 5) {
        alert("A senha deve ter o minimo de 5 caracteres");
    }

    if (senha !== confirmasenha) {
        alert("As senhas devem ser iguais");
    }
 
    alert("Cadastro realizado com sucesso");

}