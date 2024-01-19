import { ListProducts, ListProductsHooks } from "@teamkeel/sdk";

// To learn more about what you can do with hooks, visit https://docs.keel.so/functions
const hooks: ListProductsHooks = {
  beforeQuery: async (ctx, inputs, record) => {
    const products = await fetch(
      "https://65aa4162081bd82e1d967785.mockapi.io/products"
    ).then((r) => r.json());

    return products.map((product) => ({
      id: String(product.id),
      foreignId: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      createdAt: product.createdAt,
      foreignCreatedAt: product.createdAt,
    }));
  },
};

export default ListProducts(hooks);
