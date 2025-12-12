// Campos do formulário
const inputNome = document.getElementById("cat-nome");
const selectMae = document.getElementById("cat-mae");
const btnSalvar = document.getElementById("btn-salvar-categoria");
const msg = document.getElementById("msg-cat");

// Carregar categorias existentes (para o cadastro)
async function carregarCategorias() {
  try {
    const res = await fetch("http://localhost:3000/categoria");
    const categorias = await res.json();

    selectMae.innerHTML = `<option value="">Nenhuma</option>`;

    categorias.forEach(cat => {
      const option = document.createElement("option");
      option.value = cat.id;
      option.textContent = cat.nome;
      selectMae.appendChild(option);
    });

  } catch (error) {
    console.error("Erro ao carregar categorias:", error);
  }
}

// Salvar nova categoria
btnSalvar?.addEventListener("click", async () => {
  const nome = inputNome.value.trim();
  const mae_id = selectMae.value === "" ? null : selectMae.value;

  if (!nome) {
    msg.textContent = "Digite um nome para a categoria.";
    msg.style.color = "red";
    return;
  }

  try {
    const res = await fetch("http://localhost:3000/categoria", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome, mae_id })
    });

    const resposta = await res.json();

    if (res.ok) {
      msg.textContent = "Categoria cadastrada com sucesso!";
      msg.style.color = "green";

      inputNome.value = "";
      selectMae.value = "";

      carregarCategorias();
    } else {
      msg.textContent = "Erro: " + (resposta.error || "Não foi possível cadastrar");
      msg.style.color = "red";
    }

  } catch (error) {
    console.error("Erro ao salvar categoria:", error);
    msg.textContent = "Erro ao salvar categoria.";
    msg.style.color = "red";
  }
});

// Inicializa cadastro
carregarCategorias();


// -----------------------------------------------------------
// ✔ NOVA FUNÇÃO — preencher o filtro na página de produtos
// -----------------------------------------------------------
async function carregarCategoriasNoFiltro() {
  const select = document.getElementById("categoria");
  if (!select) return; // só executa se existir o select na página

  try {
    const res = await fetch("http://localhost:3000/categoria");
    const categorias = await res.json();

    select.innerHTML = `<option value="0">Todas</option>`;

    categorias.forEach(cat => {
      const option = document.createElement("option");
      option.value = cat.id;
      option.textContent = cat.nome;
      select.appendChild(option);
    });

  } catch (erro) {
    console.error("Erro ao carregar categorias do filtro:", erro);
  }
}

// Executa o carregamento de categorias no filtro (se existir)
carregarCategoriasNoFiltro();
