import { GetProduct, GetProductHooks } from "@teamkeel/sdk";

// To learn more about what you can do with hooks, visit https://docs.keel.so/functions
const hooks: GetProductHooks = {
  beforeQuery: async (ctx, inputs, record) => {
    console.log("hi");
    const product = await fetch(
      "https://65aa4162081bd82e1d967785.mockapi.io/products/" + inputs.id
    ).then((r) => r.json());
    console.log("hi 2", { product });

    return {
      id: String(product.id),
      foreignId: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      createdAt: product.createdAt,
      foreignCreatedAt: product.createdAt,
      updatedAt: null,
    };
  },
};

export default GetProduct(hooks);
