//document.getElementById('form_cadastro').addEventListener('submit', () => {

//});

$('#form_cadastro').submit((event) => {
    event.preventDefault();

    $('#form_cadastro').fadeOut();
    $('#cadastro_ok').hide();
    $('#cadastro_erro').hide();
    //$('#cadastro_btn').attr('disebled', true);

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
        //$('#cadastro-sucesso').modal({ });
        $('#cadastro_ok').fadeIn();
        //$('#cadastro_btn').attr('disebled', false);
        $('#form_cadastro')[0].reset();
      },
      error: (resposta) => {
        $('#cadastro_erro').fadeIn();
       //$('#cadastro_btn').attr('disebled', false);
       //alert('erro.');
      }

    });
});


$('#novo_cadastro').click(() => {
    $('#cadastro_ok').fadeOut();
    $('#form_cadastro').fadeIn();
});
