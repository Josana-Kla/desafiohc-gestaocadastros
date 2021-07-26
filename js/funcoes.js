function validarProduto(idNomeCliente, idNomeProduto, idCodProduto, idQtidadeProduto) {
    let cliente = document.getElementById(idNomeCliente).value;
    let nome = document.getElementById(idNomeProduto).value;
    let codigo = document.getElementById(idCodProduto).value;
    let qtidade = document.getElementById(idQtidadeProduto).value;

    if (cliente == "") {
        alert("O campo nome do cliente não pode estar vazio. Por favor, preencha-o!");
    } if (nome == "") {
        alert("O campo nome do produto não pode estar vazio. Por favor, preencha-o!");
    } if (codigo == "") {
        alert("Código do produto não pode estar vazio. Por favor, preencha-o!");
    } else {
        cadastrarProduto(cliente, nome, codigo, parseInt(qtidade));
    }
}

function cadastrarProduto(client, produto, codig, qtidade) {
    let novoProduto = {cliente:client, nome:produto, codigo:codig, quantidade:qtidade};

    if (typeof(Storage) !== "undefined") {
        let produtos = localStorage.getItem("produtos");
        if (produtos == null) produtos = []; 
        else produtos = JSON.parse(produtos);
        produtos.push(novoProduto);
        localStorage.setItem("produtos",JSON.stringify(produtos))
        alert(`Sucesso! O cliente ${client} e ${qtidade} unidade(s) do produto ${produto} foram cadastrados!`);
        atualizarTotalEstoque("totalEstoque");
        location.reload();
    } 
    else alert("Não é possível rodar a aplicação. A versão do seu navegador é muito antiga, por favor, atualize-a!");
}

function atualizarTotalEstoque(idCampo) {
    localStorage.setItem("totalEstoque",++document.getElementById(idCampo).innerHTML)
}

function carregarTotalEstoque(idCampo) {
    if (typeof(Storage) !== "undefined") {
        let totalEstoque = localStorage.getItem("totalEstoque");
        if (totalEstoque == null) totalEstoque = 0;
        document.getElementById(idCampo).innerHTML = totalEstoque;
    }
    else alert("Não é possível rodar a aplicação. A versão do seu navegador é muito antiga, por favor, atualize-a!");
}

function listarEstoque() {
    if (typeof(Storage) !== "undefined") {
        let produtos = localStorage.getItem("produtos");
        document.write("<h1>Estoque:</h1>")
        if (produtos == null)
            document.write("<h3>Ainda não há itens cadastrados no estoque</h3>");
        else {
            produtos = JSON.parse(produtos);
            produtos.forEach(produto => {
                document.write("<ul>");
                document.write("<li>Nome do cliente: "+produto.cliente+"</li>");
                document.write("<li>Nome do produto: "+produto.nome+"</li>");
                document.write("<li>Código do produto: "+produto.codigo+"</li>");
                document.write("<li>Quantidade no estoque: "+produto.quantidade+"</li>");
                document.write("</ul>");
            });
        }
    } 
    else alert("A versão do seu navegador é muito antiga, por favor, atualize-a para ver o estoque!");    
}