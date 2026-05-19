const express = require("express");

const app = express();
const PORT = 3000;

// Middleware para ler dados do formulário
app.use(express.urlencoded({ extended: true }));

// Array em memória
let feedbacks = [];


// ============================
// PÁGINA INICIAL
// ============================
app.get("/", (req, res) => {

    res.send(`
        <h1>Feedback do Curso</h1>

        <form action="/feedbacks/enviar" method="POST">

            <label>Nome:</label><br>
            <input type="text" name="nome" required><br><br>

            <label>Comentário:</label><br>
            <textarea name="comentario" required></textarea><br><br>

            <button type="submit">Enviar Feedback</button>

        </form>
    `);

});


// ============================
// ENVIAR FEEDBACK
// ============================
app.post("/feedbacks/enviar", (req, res) => {

    const { nome, comentario } = req.body;

    // Salva no array
    feedbacks.push({
        nome,
        comentario
    });

    // Redireciona
    res.redirect("/feedbacks/lista");

});


// ============================
// LISTAR FEEDBACKS
// ============================
app.get("/feedbacks/lista", (req, res) => {

    let listaHTML = `
        <h1>Lista de Feedbacks</h1>
    `;

    feedbacks.forEach((feedback, index) => {

        listaHTML += `
            <div style="
                border:1px solid black;
                padding:10px;
                margin-bottom:10px;
            ">

                <h3>${feedback.nome}</h3>

                <p>${feedback.comentario}</p>

                <form action="/feedbacks/remover" method="POST">

                    <input 
                        type="hidden" 
                        name="index" 
                        value="${index}"
                    >

                    <button type="submit">
                        Remover
                    </button>

                </form>

            </div>
        `;
    });

    listaHTML += `
        <a href="/">Voltar</a>
    `;

    res.send(listaHTML);

});


// ============================
// REMOVER FEEDBACK
// ============================
app.post("/feedbacks/remover", (req, res) => {

    const index = req.body.index;

    // Remove 1 item do array
    feedbacks.splice(index, 1);

    // Atualiza página
    res.redirect("/feedbacks/lista");

});


// ============================
// INICIAR SERVIDOR
// ============================
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});