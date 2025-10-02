import express from "express";
import userRoutes from "./routes/usuario.routes";
import enderecoRoutes from "./routes/endereco.routes";
import livroRoutes from "./routes/livro.routes";
import exemplarRoutes from "./routes/exemplar.routes";
import tradeRouter from "./routes/troca.routes";
import avaliacaoRoutes from "./routes/avaliacao.routes";
import autorRoutes from "./routes/autor.routes";

const app = express();

app.use(express.json());
app.use(userRoutes);
app.use("/api", enderecoRoutes);
app.use("/api", livroRoutes);
app.use("/api", exemplarRoutes);
app.use("/api", tradeRouter);
app.use("/api", avaliacaoRoutes);
app.use("/api", autorRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
