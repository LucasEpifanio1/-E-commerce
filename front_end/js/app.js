document.getElementById("form-produto").addEventListener("submit", async (e) => {
  e.preventDefault();

  const produto = {
    nome: document.getElementById("nome").value,
    descricao: document.getElementById("descricao").value,
    preco: parseFloat(document.getElementById("preco").value),
    foto_url: document.getElementById("foto_url").value
  };

  const response = await fetch("http://localhost:3000/produto", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(produto)
  });

  const data = await response.json();
  console.log("Produto cadastrado:", data);
  alert("Produto cadastrado com sucesso!");
});
