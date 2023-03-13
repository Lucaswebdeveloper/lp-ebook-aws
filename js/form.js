$("#formulario").submit(function () {

   
    const receivesEmailLabelInfo = $("#receberTodasInfo").is(':checked') ? "Sim" : "Não"

    // api de e-mail
    var email = $("#email").val();
    var nome = $("#nome").val();
    var ebook = $("ebook").val();

    if (email == "" || nome == "") {
        swal("Hummm!", "Para baixar o ebook é necessário colocar todos os campos.", "error");
        return false;
    } else {
        if (!validateEmail(email)) {
            swal("Hummm!", "O e-mail está invalido.", "error");
            return false;
        }
    }
    $.ajax({
        type: 'POST',
        url: 'https://5dgf587r45.execute-api.us-east-1.amazonaws.com/prod/send/email',
        contentType: 'application/json',
        data: JSON.stringify({
            plataform: "Ebook - Aplicações Modernizar Refatorar",
            infos: "Nome: " + $("#nome").val() + " <br/> Sobrenome: " + $("#sobreNome").val() + " <br/> E-mail Corporativo: " + $("#email").val() + " <br/> Nome da Empresa: " + $("#nomeEmpresa").val() + "<br/> Cargo: " + $("#cargo").val() + " <br/>  Receber todas as Informações da Darede:" + receivesEmailLabelInfo,
            to: "marketing@darede.com.br", //de quem vem marketing@darede.com.br
            cc: ["carolina.fernandes@darede.com.br, lucas.vieira@darede.com.br, gustavo.viana@damidia.com.br, emily.lima@damidia.com.br"], //copia carolina.fernandes@darede.com.br, lucas.vieira@darede.com.br
            cco: [],
        }),
        success: function (data) {
            if (data.error == 1) {
                swal("Erro!", data.messege, "error");
            } else {
                swal("Obrigado!", "Você será redirecionado para o arquivo.", "success");
                setTimeout(() => { window.open("https://lps-geral.s3.amazonaws.com/lp-aplicacoes-modernizar-refatorar/assets/e-book/e-book-aplicacoes-modernizar-ou-refatorar.pdf", '_blank'); }, 1000);
            }
            setTimeout(() => { window.location.replace("https://www.darede.com.br/agradecimento/"); }, 3000);
        },
        error: function (xhr, textStatus, error) {
            swal("Erro!", "Erro ao enviar o e-mail.", "error");
        },
    });
    $.ajax({
        type: 'POST',
        url: 'https://5dgf587r45.execute-api.us-east-1.amazonaws.com/prod/send/email/custom',
        contentType: 'application/json',
        data: JSON.stringify({
            "from": "marketing@darede.com.br", //de quem vem marketing@darede.com.br

            "to": $("#email").val(),// pra quem vai

            "cc": "", //copia carolina.fernandes@darede.com.br, lucas.vieira@darede.com.br

            "bcc": "", //copia oculta

            "subject": "Fique por dentro do mercado de TI e AWS!", //assunto titulo caixa de e-mail,

            "html": ' <table width="600" border="0" cellspacing="0" cellpadding="0"> <tr> <td><img src="https://lp-guias-pratico-reduzir-custos-aws.s3.amazonaws.com/assets/assets/email-externo-header-darede.jpg" alt="banner-header" width="600" height="386"/></td></tr><tr> <td width="600" height="206" bgcolor="#0f5139"><a href="https://www.youtube.com/c/Daredeti" target="_blank"><img src="https://lp-guias-pratico-reduzir-custos-aws.s3.amazonaws.com/assets/assets/main-live-darede.jpg" alt="banner-live" name="live" width="600" height="206" id="live"/></a></td></tr><tr> <td><a href="https://open.spotify.com/show/28IWUqZPTXYj0bbWuOJrcZ" target="_blank"><img src="https://lp-guias-pratico-reduzir-custos-aws.s3.amazonaws.com/assets/assets/email-externo-section-cast-2-darede.jpg" alt="banner-cast" name="cast" width="600" height="313" id="cast"/></a></td></tr><tr> <td><a href="https://www.darede.com.br/lp-todos-os-ebooks/" target="_blank"><img src="https://lp-guias-pratico-reduzir-custos-aws.s3.amazonaws.com/assets/assets/email-externo-section-ebook-darede.jpg" alt="banner-ebook" name="ebooks" width="600" height="360" id="ebooks"/></a></td></tr><tr> <td><a href="https://www.darede.com.br/blog/" target="_blank"><img src="https://lp-guias-pratico-reduzir-custos-aws.s3.amazonaws.com/assets/assets/email-externo-section-blog-darede.jpg" alt="banner-blog" name="blog" width="600" height="260" id="blog"/></a></td></tr><tr> <td><a href="https://www.darede.com.br/" target="_blank"><img src="https://lp-guias-pratico-reduzir-custos-aws.s3.amazonaws.com/assets/assets/email-externo-footer-darede.jpg" alt="banner-footer" name="footer" width="600" height="132" id="footer"/></a></td></tr></table>'// corpo do email
        }),

    });

    return false;
})

function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}
