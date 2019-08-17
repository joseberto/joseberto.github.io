
const listarUsuarios = () => {

  $('#tabela-usuarios').html('');

  $.ajax({
    url: `${api_url}/usuarios.json`,
    success: (resposta) => {
      for (let id in resposta) {
        let cadaUsuario = resposta[id]
        $('#tabela-usuarios').append(`
          <tr>
            <td>${cadaUsuario.nome}</td>
            <td>${cadaUsuario.email}</td>
            <td></td>
            <td>
              <a href="#" class="btn btn-warning btn-sn">
              Editar
              </a>
              <a href="#" onclick="excluirUsuario('${id}', '${cadaUsuario.nome}')" class="btn btn-danger btn-sn">
              Excluir
              </a>
            </td>
          `);
      }
    },

  });
  };



  const excluirUsuario = (id, nome) => {

  $('#user-excluir').html(nome);
  $('#modal-excluir').modal();

  $('#confirmar-excluir').click(() => {
    $.ajax({
      url: `${api_url}/usuarios/${id}.json`,
      type: 'DELETE',
      success: (resposta) => {
        $('#modal-excluir').modal('hide');
        janelaAlert('Exclusão',`Usuário, ${nome} Excluído!`,
            'info');

        listarUsuarios();
      },
    });
  })

};


$('#form-cadastro').submit((event) => {
  event.preventDefault();

  const usuario = {
    nome: $('#cadastro_nome').val(),
    email: $('#cadastro_email').val(),
    senha: $('#cadastro_senha').val(),
  };

  $.ajax({
    url: `${api_url}/usuarios.json`,
    type: 'POST',
    dataType: 'json',
    contentType: 'application/json',
    data: JSON.stringify(usuario),
    success: (resposta) => {
      $('#modal-novo-usuario').modal('hide');
      $('#form-cadastro')[0].reset();
      janelaAlert('Cadastro',`Usuário, ${usuario.nome} Cadastrado!`,
          'success');

      listarUsuarios();
    },
    error: (resposta) => {
      alert('erro.');
    }

  });
});

const editarUsuario = (id, nome, email, senha) => {


  $('#modal-editar-usuario').modal();

  $('#form-editar').click(() => {
    $.ajax({
      url: `${api_url}/usuarios/${id}.json`,
      type: 'PUT',
      success: (resposta) => {
        $('#modal-editar-usuario').modal('hide');

        listarUsuarios();
      },
    });
  })

};

const janelaAlert = (titulo, texto, tipo) => {
  $.toast().reset('all');
  $.toast({
    text: texto, // Text that is to be shown in the toast
    heading: titulo, // Optional heading to be shown on the toast
    icon: tipo, // Type of toast icon success
    showHideTransition: 'fade', // fade, slide or plain
    allowToastClose: true, // Boolean value true or false
    hideAfter: 3000, // false to make it sticky or number representing the miliseconds as time after which toast needs to be hidden
    stack: 5, // false if there should be only one toast at a time or a number representing the maximum number of toasts to be shown at a time
    position: 'top-right', // bottom-left or bottom-right or bottom-center or top-left or top-right or top-center or mid-center or an object representing the left, right, top, bottom values



    textAlign: 'left',  // Text alignment i.e. left, right or center
    loader: true,  // Whether to show loader or not. True by default
    loaderBg: '#9EC600',  // Background color of the toast loader
    beforeShow: function () {}, // will be triggered before the toast is shown
    afterShown: function () {}, // will be triggered after the toat has been shown
    beforeHide: function () {}, // will be triggered before the toast gets hidden
    afterHidden: function () {}  // will be triggered after the toast has been hidden

  });

};


  listarUsuarios();

