import express from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";

const prisma = new PrismaClient();

const app = express();

app.use(cors());
app.use(express.json());

// Endpoint to create a new product
app.post("/product", async (req, res) => {
  const { name, description, price } = req.body;
  const product = await prisma.product.create({
    data: { name, description, price },
  });
  res.json(product);
});

app.get("/products", async (req, res) => {
  const products = await prisma.product.findMany();
  res.json(products);
});

app.get("/product/:id", async (req, res) => {
  const { id } = req.params;
  const product = await prisma.product.findUnique({
    where: { id: Number(id) },
  });
  res.json(product);
});

// Other endpoints (e.g., for orders) can be added here

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
