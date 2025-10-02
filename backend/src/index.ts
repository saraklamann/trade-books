import express from "express";
import swaggerUi from 'swagger-ui-express';

import swaggerDocument from '../swagger.json';
import userRoutes from "./routes/usuario.routes";
import enderecoRoutes from "./routes/endereco.routes";
import livroRoutes from "./routes/livro.routes";
import exemplarRoutes from "./routes/exemplar.routes";
import tradeRouter from "./routes/troca.routes";
import avaliacaoRoutes from "./routes/avaliacao.routes";
import autorRoutes from "./routes/autor.routes";
import generoRoutes from "./routes/genero.routes";
import editoraRoutes from "./routes/editora.routes";
import livroAutorRoutes from "./routes/livroAutor.routes";
import livroEditoraRoutes from "./routes/livroEditora.routes";
import livroGeneroRoutes from "./routes/livroGenero.routes";
import trocaExemplarRoutes from "./routes/trocaExemplar.routes";
import authRoutes from "./routes/auth.routes";

const app = express();

app.use(express.json());
app.use("/api", userRoutes);
app.use("/api", enderecoRoutes);
app.use("/api", livroRoutes);
app.use("/api", exemplarRoutes);
app.use("/api", tradeRouter);
app.use("/api", avaliacaoRoutes);
app.use("/api", autorRoutes);
app.use("/api", generoRoutes);
app.use("/api/publishers", editoraRoutes);
app.use("/api/book-authors", livroAutorRoutes);
app.use("/api/book-publishers", livroEditoraRoutes);
app.use("/api/book-genres", livroGeneroRoutes);
app.use("/api/trades-exemplars", trocaExemplarRoutes);
app.use("/api/auth", authRoutes);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
