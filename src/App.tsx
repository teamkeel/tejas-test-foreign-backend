import { createSignal, type Component, For, Switch, Match } from "solid-js";
import "./index.css";

type Cart = {
  id: number;
  price: number;
  quantity: number;
}[];

const App: Component = () => {
  const [products, setProducts] = createSignal([]);
  const [cart, setCart] = createSignal<Cart>([]);
  const [voucherCode, setVoucherCode] = createSignal("");
  const [discountPercentage, setDiscountPercentage] = createSignal(0);
  const [qualifyingProductIds, setQualifyingProductIds] = createSignal<
    number[]
  >([]);

  fetch("http://localhost:3001/products")
    .then((r) => r.json())
    .then(setProducts);

  const applyVoucher = () => {
    if (!voucherCode()) return;
    fetch("http://localhost:8000/api/json/getVoucherCode", {
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ code: voucherCode() }),
      method: "POST",
    })
      .then((r) => r.json())
      .then((v) => {
        if (!v?.discountPercent) {
          alert("Invalid voucher code");
          return;
        }
        setDiscountPercentage(v.discountPercent);
        setQualifyingProductIds(
          v.appliesToProductsWithId.map(parseFloat) || []
        );
      });
  };

  const calculateDiscountedPrice = (id: number) => {
    const item = products().find((p) => p.id === id);
    if (qualifyingProductIds().includes(id)) {
      return item.price * (1 - discountPercentage() / 100);
    }
    return item.price;
  };

  const totalPrice = () =>
    cart().reduce(
      (acc, item) => acc + calculateDiscountedPrice(item.id) * item.quantity,
      0
    );

  return (
    <div
      style={{
        "background-image": `linear-gradient(
        135deg,
        rgba(255, 255, 255, 0.15) 25%,
        transparent 25%,
        transparent 50%,
        rgba(255, 255, 255, 0.15) 50%,
        rgba(255, 255, 255, 0.15) 75%,
        transparent 75%,
        transparent
      )`,
        "background-color": "#ec4899", // This is Tailwind's 'gray-600'
        "background-size": "28px 28px",
      }}
      class="min-h-screen p-6 text-white grid place-items-center"
    >
      <div class="bg-white text-gray-800 rounded-lg shadow-lg p-6 grid gap-4">
        <h1 class="text-4xl font-bold text-center">Welcome to Our Store!</h1>

        <div class="grid gap-4">
          <div class="font-semibold text-lg">Here are your products:</div>
          <ul class="list-disc grid gap-2">
            <For each={products()}>
              {(product) => {
                const isItemInCart = () =>
                  cart().find((item) => item.id === product.id);
                return (
                  <li class="flex justify-between">
                    <div class="flex gap-2">
                      <input
                        type="checkbox"
                        checked={Boolean(isItemInCart())}
                        onclick={() => {
                          Boolean(isItemInCart())
                            ? setCart(
                                cart().filter((item) => item.id !== product.id)
                              )
                            : setCart([
                                ...cart(),
                                {
                                  id: product.id,
                                  price: product.price,
                                  quantity:
                                    cart().find(
                                      (item) => item.id === product.id
                                    )?.quantity ?? 1,
                                },
                              ]);
                        }}
                      />
                      {product.name}
                      <Switch fallback={` ($${product.price})`}>
                        <Match
                          when={qualifyingProductIds().includes(product.id)}
                        >
                          <span class="line-through text-red-500">
                            (${product.price})
                          </span>
                          <span>(${calculateDiscountedPrice(product.id)})</span>
                        </Match>
                      </Switch>
                    </div>
                    <div class="text-sm flex items-center gap-2">
                      Qty{" "}
                      <input
                        min={1}
                        size={2}
                        class="disabled:cursor-not-allowed max-w-[32px] ml-auto"
                        type="number"
                        disabled={!isItemInCart()}
                        value={isItemInCart()?.quantity ?? 0}
                        onchange={(e) => {
                          const newQuantity = Number(e.currentTarget.value);
                          setCart(
                            cart().map((item) =>
                              item.id === product.id
                                ? { ...item, quantity: newQuantity }
                                : item
                            )
                          );
                        }}
                      />
                    </div>
                  </li>
                );
              }}
            </For>
          </ul>
          <div class="grid gap-2">
            <div>
              <span class="font-semibold">Total Price:</span> ${totalPrice()}
            </div>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              applyVoucher();
            }}
            class="grid gap-2"
          >
            <div class="flex gap-2 items-center">
              <span>Add a voucher:</span>
              <input
                class="px-1 rounded border border-gray-300"
                value={voucherCode()}
                oninput={(e) => setVoucherCode(e.target.value)}
                type="text"
                placeholder="Your Code Here"
              />
              <button
                disabled={!voucherCode()}
                class="bg-blue-500 hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400 text-white font-bold px-4 rounded"
              >
                Apply
              </button>
            </div>
          </form>

          <button class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
