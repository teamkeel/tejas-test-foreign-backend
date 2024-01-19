import { GetVoucherCode, models, GetVoucherCodeHooks } from "@teamkeel/sdk";

// To learn more about what you can do with hooks, visit https://docs.keel.so/functions
const hooks: GetVoucherCodeHooks = {
  async afterQuery(ctx, inputs, record) {
    const products = await models.voucherCodeProducts.findMany({
      where: { voucherCodeId: record.id },
    });
    const appliesToProductsWithId = products.length
      ? products.map((p) => p.foreignProductIdId)
      : [];

    return { ...record, appliesToProductsWithId };
  },
};

export default GetVoucherCode(hooks);
