import storeProducts from "./data/products.json";
import DiscountProcessBar from "./components/DiscountProgressBar";
import CartItem from "./components/CartItem";
import { breakpoints, useShoppingCart } from "./context/ShoppingCartContext";

function App() {
  const { getTotal } = useShoppingCart();
  const { total, save, discount } = getTotal();

  return (
    <div className="mx-auto flex bg-white mt-1">
      <div className="border rounded-md mx-auto p-12">
        <div className="text-center">
          <p className="font-bold text-2xl">Build Your Kit & Save</p>
          <p className="text-lg">
            Spend ${total}, Save ${discount}{" "}
          </p>
        </div>
        <div className="py-4">
          <DiscountProcessBar
            actualDiscount={discount}
            breakpoints={breakpoints}
          />
        </div>

        <div className="min-w-80 w-96">
          {storeProducts.map((product) => (
            <CartItem key={product.id} product={product} />
          ))}
        </div>

        <div className="flex flex-row justify-between items-center">
          <div className="font-semibold text-xl text-[#2C272D]">
            Build Your Kit Subtotal
          </div>
          <div className="text-xl font-bold my-4">${total} </div>
        </div>

        <div className="flex flex-row justify-between items-center">
          <div className="font-semibold text-[#2C272D]">
            Discount (Spend ${total}, Save ${discount})
          </div>
          <div className="text-xl text-[#C51D1E] font-bold">-${discount}</div>
        </div>
        <div className="flex flex-row justify-between items-center">
          <div className="font-semibold text-xl text-[#2C272D]">Total</div>
          <div className="text-xl font-bold my-4">${total - discount} </div>
        </div>
        <div className="mt-4">
          <button className="bg-[#f00] w-full py-2 text-white rounded-md">
            <div className="flex flex-row items-center justify-center space-x-2">
              <div className="font-bold text-lg">CHECKOUT</div>
              <div className="-mt-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="white"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                  />
                </svg>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
