import express from "express";
import userRoutes from "./routes/usuario.routes";
import enderecoRoutes from "./routes/endereco.routes";

const app = express();

app.use(express.json());
app.use(userRoutes);
app.use("/api", enderecoRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
