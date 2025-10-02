import express from "express";
import userRoutes from "./routes/usuario.routes";
import enderecoRoutes from "./routes/endereco.routes";
import livroRoutes from "./routes/livro.routes";
import exemplarRoutes from "./routes/exemplar.routes";

const app = express();

app.use(express.json());
app.use(userRoutes);
app.use("/api", enderecoRoutes);
app.use("/api", livroRoutes);
app.use("/api", exemplarRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
