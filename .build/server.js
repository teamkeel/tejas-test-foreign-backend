import { handleRequest, handleJob, handleSubscriber, tracing } from '@teamkeel/functions-runtime';
import { createContextAPI, createJobContextAPI, createSubscriberContextAPI, permissionFns } from '@teamkeel/sdk';
import { createServer } from "http";
import function_getVoucherCode from "../functions/getVoucherCode.ts";
import function_listProducts from "../functions/listProducts.ts";
import function_getProduct from "../functions/getProduct.ts";
const functions = {
    getVoucherCode: function_getVoucherCode,
    listProducts: function_listProducts,
    getProduct: function_getProduct,
}
const jobs = {
}
const subscribers = {
}
const actionTypes = {
    getVoucherCode: "ACTION_TYPE_GET",
    listProducts: "ACTION_TYPE_LIST",
    getProduct: "ACTION_TYPE_GET",
}

const listener = async (req, res) => {
	const u = new URL(req.url, "http://" + req.headers.host);
	if (req.method === "GET" && u.pathname === "/_health") {
		res.statusCode = 200;
		res.end();
		return;
	}

	if (req.method === "POST") {
		const buffers = [];
		for await (const chunk of req) {
			buffers.push(chunk);
		}
		const data = Buffer.concat(buffers).toString();
		const json = JSON.parse(data);

		let rpcResponse = null;
		switch (json.type) {
		case "action":
			rpcResponse = await handleRequest(json, {
				functions,
				createContextAPI,
				actionTypes,
				permissionFns,
			});
			break;
		case "job":
			rpcResponse = await handleJob(json, {
				jobs,
				createJobContextAPI,
			});
			break;
		case "subscriber":
			rpcResponse = await handleSubscriber(json, {
				subscribers,
				createSubscriberContextAPI,
			});
			break;
		default:
			res.statusCode = 400;
			res.end();
		}
		
		res.statusCode = 200;
		res.setHeader('Content-Type', 'application/json');
		res.write(JSON.stringify(rpcResponse));
		res.end();
		if (tracing.forceFlush) {
			await tracing.forceFlush();
		}
		return;
	}

	res.statusCode = 400;
	res.end();
};

tracing.init();

const server = createServer(listener);
const port = (process.env.PORT && parseInt(process.env.PORT, 10)) || 3001;
server.listen(port);
