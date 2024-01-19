const { sql, NoResultError } = require("kysely")
const runtime = require("@teamkeel/functions-runtime")

const permissionFns = {
    getVoucherCode: [
        async (records, ctx, db) => {
            const { rows } = await sql`SELECT DISTINCT "voucher_code"."id" FROM "voucher_code" WHERE (true) AND "voucher_code"."id" IN (${(records.length > 0) ? sql.join(records.map(x => x.id)) : []})`.execute(db);
            return rows.length === records.length;
        },
    ],
    listProducts: [
        async (records, ctx, db) => {
            const { rows } = await sql`SELECT DISTINCT "product"."id" FROM "product" WHERE (true) AND "product"."id" IN (${(records.length > 0) ? sql.join(records.map(x => x.id)) : []})`.execute(db);
            return rows.length === records.length;
        },
    ],
    getProduct: [
        async (records, ctx, db) => {
            const { rows } = await sql`SELECT DISTINCT "product"."id" FROM "product" WHERE (true) AND "product"."id" IN (${(records.length > 0) ? sql.join(records.map(x => x.id)) : []})`.execute(db);
            return rows.length === records.length;
        },
    ],
}
module.exports.permissionFns = permissionFns;
function createFunction({ model, valueInputs }) {
  return function (hooks = {}) {
    return async function (ctx, inputs) {
      let values = {};
      for (const key of valueInputs) {
        if (key in inputs) {
          values[key] = inputs[key];
        }
      }

      if (hooks.beforeWrite) {
        values = await runtime.tracing.withSpan("beforeWrite", () => {
          return hooks.beforeWrite(ctx, inputs, values);
        });
      }

      let data = await model.create(values);

      if (hooks.afterWrite) {
        const v = await runtime.tracing.withSpan("afterWrite", () => {
          return hooks.afterWrite(ctx, inputs, data);
        });
        if (v !== undefined) {
          data = v;
        }
      }

      return data;
    };
  };
}

function deleteFunction({ model, whereInputs }) {
  return function (hooks = {}) {
    return async function (ctx, inputs) {
      let wheres = {};
      for (const key of whereInputs) {
        if (key in inputs) {
          wheres[key] = inputs[key];
        }
      }

      let data = model.where(wheres);

      if (hooks.beforeQuery) {
        data = await runtime.tracing.withSpan("beforeQuery", () => {
          return hooks.beforeQuery(ctx, inputs, data);
        });
      }

      const constructor = data?.constructor?.name;
      if (constructor === "QueryBuilder") {
        data = await data.findOne();
      }

      if (data === null) {
        throw new NoResultError();
      }

      if (hooks.beforeWrite) {
        await runtime.tracing.withSpan("beforeWrite", () => {
          return hooks.beforeWrite(ctx, inputs, data);
        });
      }

      await model.delete({ id: data.id });

      if (hooks.afterWrite) {
        await runtime.tracing.withSpan("afterWrite", () => {
          return hooks.afterWrite(ctx, inputs, data);
        });
      }

      return data.id;
    };
  };
}

function getFunction({ model, whereInputs }) {
  return function (hooks = {}) {
    return async function (ctx, inputs) {
      let wheres = {};
      for (const key of whereInputs) {
        if (key in inputs) {
          wheres[key] = inputs[key];
        }
      }

      let data = model.where(wheres);

      if (hooks.beforeQuery) {
        data = await runtime.tracing.withSpan("beforeQuery", () => {
          return hooks.beforeQuery(ctx, inputs, data);
        });
      }

      const constructor = data?.constructor?.name;
      if (constructor === "QueryBuilder") {
        data = await data.findOne();
      }

      if (data === null) {
        return null;
      }

      if (hooks.afterQuery) {
        data = await runtime.tracing.withSpan("afterQuery", () => {
          return hooks.afterQuery(ctx, inputs, data);
        });
      }

      return data;
    };
  };
}

function listFunction({ model, whereInputs }) {
  return function (hooks = {}) {
    return async function (ctx, inputs) {
      let wheres = {};
      for (const key of whereInputs) {
        if (inputs.where && key in inputs.where) {
          wheres[key] = inputs.where[key];
        }
      }

      let data = model.where(wheres);

      if (hooks.beforeQuery) {
        data = await runtime.tracing.withSpan("beforeQuery", () => {
          return hooks.beforeQuery(ctx, inputs, data);
        });
      }

      const constructor = data?.constructor?.name;
      if (constructor === "QueryBuilder") {
        data = await data.findMany({ limit: inputs.first });
      }

      if (hooks.afterQuery) {
        data = await runtime.tracing.withSpan("afterQuery", () => {
          return hooks.afterQuery(ctx, inputs, data);
        });
      }

      return data;
    };
  };
}

function updateFunction({ model, whereInputs, valueInputs }) {
  return function (hooks = {}) {
    return async function (ctx, inputs) {
      let wheres = {};
      let values = {};
      for (const key of whereInputs) {
        if (inputs.where && key in inputs.where) {
          wheres[key] = inputs.where[key];
        }
      }
      for (const key of valueInputs) {
        if (inputs.values && key in inputs.values) {
          values[key] = inputs.values[key];
        }
      }

      let data = model.where(wheres);

      if (hooks.beforeQuery) {
        data = await runtime.tracing.withSpan("beforeQuery", () => {
          return hooks.beforeQuery(ctx, inputs, data);
        });
      }

      const constructor = data?.constructor?.name;
      if (constructor === "QueryBuilder") {
        data = await data.findOne();
      }

      if (data === null) {
        throw new NoResultError();
      }

      if (hooks.beforeWrite) {
        values = await runtime.tracing.withSpan("beforeWrite", () => {
          return hooks.beforeWrite(ctx, inputs, values, data);
        });
      }

      data = await model.update({ id: data.id }, values);

      if (hooks.afterWrite) {
        const v = await runtime.tracing.withSpan("afterWrite", () => {
          return hooks.afterWrite(ctx, inputs, data);
        });
        if (v !== undefined) {
          data = v;
        }
      }

      return data;
    };
  };
}

const tableConfigMap = {
    "voucher_code_products": {
        "foreignProductId": {
            "foreignKey": "foreign_product_id_id",
            "referencesTable": "product",
            "relationshipType": "belongsTo"
        },
        "voucherCode": {
            "foreignKey": "voucher_code_id",
            "referencesTable": "voucher_code",
            "relationshipType": "belongsTo"
        }
    }
};
function createContextAPI({ responseHeaders, meta }) {
    const headers = new Headers(meta.headers);
    const response = { headers: responseHeaders }
    const now = () => { return new Date(); };
    const { identity } = meta;
    const isAuthenticated = identity != null;
    const env = {
    };
    const secrets = {
    };
    return { headers, response, identity, env, now, secrets, isAuthenticated };
};
function createJobContextAPI({ meta }) {
    const now = () => { return new Date(); };
    const { identity } = meta;
    const isAuthenticated = identity != null;
    const env = {
    };
    const secrets = {
    };
    return { identity, env, now, secrets, isAuthenticated };
};
function createSubscriberContextAPI({ meta }) {
    const now = () => { return new Date(); };
    const env = {
    };
    const secrets = {
    };
    return { env, now, secrets };
};
function createModelAPI() {
    return {
        voucherCode: new runtime.ModelAPI("voucher_code", () => ({}), tableConfigMap),
        product: new runtime.ModelAPI("product", () => ({}), tableConfigMap),
        voucherCodeProducts: new runtime.ModelAPI("voucher_code_products", () => ({}), tableConfigMap),
        identity: new runtime.ModelAPI("identity", () => ({}), tableConfigMap),
    };
};
function createPermissionApi() {
    return new runtime.Permissions();
};
const models = createModelAPI();
module.exports.models = models;
module.exports.permissions = createPermissionApi();
module.exports.createContextAPI = createContextAPI;
module.exports.createJobContextAPI = createJobContextAPI;
module.exports.createSubscriberContextAPI = createSubscriberContextAPI;
module.exports.useDatabase = runtime.useDatabase;
module.exports.GetVoucherCode = getFunction({model: models.voucherCode, whereInputs: ["code"], valueInputs: []})
module.exports.ListProducts = listFunction({model: models.product, whereInputs: [], valueInputs: []})
module.exports.GetProduct = getFunction({model: models.product, whereInputs: ["id"], valueInputs: []})
