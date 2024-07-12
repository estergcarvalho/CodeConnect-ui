$(document).ready(function() {
    $('#form-edit-profile-user').submit(function(event) {
        event.preventDefault();
        atualizarDados();
    });

    carregarDadosUsuario();
});

function carregarDadosUsuario() {
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
            success: function(response) {  
                $('#nome').val(response.nome)   
                $('#email').val(response.email)     
                $('#profissao').val(response.profissao);
                $('#pais').val(response.pais);
                $('#estado').val(response.estado);

                let redesUsuario = response.redes_sociais;
                
                if (redesUsuario !== null && redesUsuario.length > 0) {
                    redesUsuario.forEach(rede => {
                        let link = '';

                        switch(rede.nome.toLowerCase()) {
                            case 'github':
                                $('#social-media-github').val(rede.link);
                                break;
                            case 'linkedin':
                                $('#social-media-linkedin').val(rede.link);
                                break;
                            case 'youtube':
                                $('#social-media-youtube').val(rede.link);
                                break;
                            default:
                                link = 'null';
                            }
                        });
                    }
                },
            error: function(status, response, error) {
                console.error("Erro ao obter dados do usuário: " + error);
            }
        });
    } 
}

function atualizarDados() {
    var token = localStorage.getItem('token');

    var dadosAtualizados = {
        profissao: $('#profissao').val(),
        pais: $('#pais').val(),
        estado: $('#estado').val(),
        redesSociais: [
            {
                nome: 'Github',
                link: $('#social-media-github').val()
            },
            {
                nome: 'Linkedin',
                link: $('#social-media-linkedin').val()
            },
            {
                nome: 'Youtube',
                link: $('#social-media-youtube').val()
            }
        ]
    };

    $.ajax({
        url: 'http://localhost:8080/usuarios',
        type: 'PUT',
        dataType: "json",
        headers: { 'Authorization': 'Bearer ' + token },
        contentType: 'application/json',
        data: JSON.stringify(dadosAtualizados),
        success: function() {
            alert("Cadastro editado com sucesso");
        },
        error: function(status, response, error) {
            console.error("Erro ao atualizar dados do usuário:", error);
        }
    });
}   