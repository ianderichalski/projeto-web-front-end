const STORAGE_KEY = 'fluenty_usuarios';

const formCadastro = document.getElementById('form-cadastro');
const inputNome = document.getElementById('input-nome');
const inputEmail = document.getElementById('input-email');
const listaUsuarios = document.getElementById('lista-usuarios');
const btnLimpar = document.getElementById('btn-limpar');
const btnExcluirTodos = document.getElementById('btn-excluir-todos');
const inputPesquisa = document.getElementById('input-pesquisa');

const getUsuarios = () => {
    const usuariosJSON = localStorage.getItem(STORAGE_KEY);
    return usuariosJSON ? JSON.parse(usuariosJSON) : [];
};

const saveUsuarios = (usuarios) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(usuarios));
};

const renderizarLista = (usuarios) => {
    const listaParaRenderizar = usuarios || getUsuarios();
    listaUsuarios.innerHTML = '';

    if (listaParaRenderizar.length === 0) {
        listaUsuarios.innerHTML = '<li>Nenhum usuário cadastrado.</li>';
        return;
    }

    listaParaRenderizar.forEach((usuario, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <div>
                <strong>${usuario.nome}</strong> (${usuario.email})
                <br>
                <small>Cadastrado em: ${usuario.data}</small>
            </div>
            <button class="delete-item-btn" data-index="${index}">&times; Excluir</button>
        `;
        listaUsuarios.appendChild(li);
    });

    document.querySelectorAll('.delete-item-btn').forEach(button => {
        button.addEventListener('click', excluirUsuario);
    });
};

const cadastrarUsuario = (event) => {
    event.preventDefault();

    const nome = inputNome.value.trim();
    const email = inputEmail.value.trim();

    if (nome === '' || email === '') {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    const dataCadastro = new Date().toLocaleString('pt-BR');

    const novoUsuario = {
        nome: nome,
        email: email,
        data: dataCadastro
    };

    const usuarios = getUsuarios();
    usuarios.push(novoUsuario);

    saveUsuarios(usuarios);
    renderizarLista();
    limparCampos(); 
};

const limparCampos = () => {
    inputNome.value = '';
    inputEmail.value = '';
    inputNome.focus();
};

const excluirUsuario = (event) => {
    const indexParaExcluir = parseInt(event.currentTarget.getAttribute('data-index'));

    if (!confirm(`Tem certeza que deseja excluir o usuário no índice ${indexParaExcluir + 1}?`)) {
        return;
    }

    const usuarios = getUsuarios();
    
    usuarios.splice(indexParaExcluir, 1); 

    saveUsuarios(usuarios);
    renderizarLista();
};


const excluirTodosUsuarios = () => {
    if (getUsuarios().length === 0) {
        alert('Não há usuários para excluir.');
        return;
    }

    if (confirm('ATENÇÃO: Você tem certeza que deseja EXCLUIR TODOS os usuários de forma permanente?')) {
        localStorage.removeItem(STORAGE_KEY);
        renderizarLista();
        alert('Todos os usuários foram excluídos.');
    }
};


const pesquisarUsuarios = (event) => {
    const termo = event.target.value.toLowerCase().trim();
    const usuarios = getUsuarios();

    if (termo.length < 2) {
        renderizarLista(usuarios);
        return;
    }

    const resultados = usuarios.filter(usuario => {
        const nomeMatch = usuario.nome.toLowerCase().includes(termo);
        const emailMatch = usuario.email.toLowerCase().includes(termo);
        return nomeMatch || emailMatch;
    });

    renderizarLista(resultados);
};

document.addEventListener('DOMContentLoaded', () => {
    renderizarLista(); 
    formCadastro.addEventListener('submit', cadastrarUsuario);
    btnLimpar.addEventListener('click', limparCampos);
    btnExcluirTodos.addEventListener('click', excluirTodosUsuarios);
    inputPesquisa.addEventListener('input', pesquisarUsuarios);
});