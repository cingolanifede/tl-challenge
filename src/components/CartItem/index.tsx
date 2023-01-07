import React, { useState } from "react";
import { useShoppingCart } from "../../context/ShoppingCartContext";

export interface StoreItemProps {
  id: number;
  product: string;
  productType: string;
  price: number;
  color: string;
  size: string;
  imageSrc: string;
  imageAlt: string;
  href: string;
}

export interface CartItemProps {
  product: StoreItemProps;
}

const CartItem: React.FunctionComponent<CartItemProps> = (props) => {
  const { product } = props;
  const {
    getItemQuantity,
    getItemTotal,
    increaseCartQuantity,
    decreaseCartQuantity,
    removeFromCart,
  } = useShoppingCart();

  const quantity = getItemQuantity(product.id);
  const total = getItemTotal(product.id);
  return (
    <div className="mt-8">
      <div className="flex flec-col">
        <ul role="list" className="-my-6 divide-y divide-gray-200">
          <li key={product.id} className="flex py-6">
            <div className="h-32 w-32 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
              <img
                src={product.imageSrc}
                alt={product.imageAlt}
                className="h-full w-full object-cover object-center"
              />
            </div>

            <div className="ml-4 flex flex-col">
              <div>
                <div className="flex items-center font-medium text-gray-900 space-y-2">
                  <div className="max-w-[300px] w-[200px]">
                    <h3>
                      <a href={product.href}>{product.product}</a>
                    </h3>
                  </div>
                  <div
                    className={`${quantity === 0 ? "hidden" : "block"}`}
                    onClick={() => removeFromCart(product.id)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="black"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </div>
                </div>
                <p className="mt-1 text-sm text-gray-500">
                  {product.color}/{product.size}
                </p>
              </div>
              <div className="px-2">
                {quantity === 0 ? (
                  <button
                    type="button"
                    className="font-medium text-indigo-600 hover:text-indigo-500 pt-2"
                    onClick={() => increaseCartQuantity(product)}
                  >
                    + Add To Cart
                  </button>
                ) : (
                  <div className="flex items-center justify-between text-sm bg-white mx-2">
                    <div className="flex items-center space-x-2 py-4">
                      <div className="bg-gray-100 flex flex-row space-x-6 py-1 px-2 rounded-md">
                        <button onClick={() => decreaseCartQuantity(product)}>
                          -
                        </button>
                        <input
                          type="number"
                          value={quantity}
                          className="text-gray-900 bg-gray-100 text-sm rounded-md focus:ing-blue-500 focus:border-blue-500 block w-8 text-center"
                          disabled={true}
                        />
                        <button onClick={() => increaseCartQuantity(product)}>
                          +
                        </button>
                      </div>
                    </div>
                    <div className="mx-2">
                      <p className="ml-8 font-bold text-lg">$ {total}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CartItem;
