import { createContext, ReactNode, useContext, useState } from "react";
import { StoreItemProps } from "../components/CartItem";
import { useLocalStorage } from "../hooks/useLocalStorage";
import storeProducts from "../data/products.json";
import { DiscountProgressConfig, ILineItem } from "../types";

type ShoppingCartProviderProps = {
  children: ReactNode;
};
type CartItem = {
  id: number;
  quantity: number;
  price: number;
  total: number;
};

type ShoppingCartContextProps = {
  cartQuantity: number;
  cartItems: CartItem[];

  openCart: () => void;
  closeCart: () => void;
  getItemQuantity: (id: number) => number;
  getItemTotal: (id: number) => number;
  getItemPrice: (id: number) => number;
  increaseCartQuantity: (product: StoreItemProps) => void;
  decreaseCartQuantity: (product: StoreItemProps) => void;
  removeFromCart: (id: number) => void;
  getTotal: () => { total: number; save: any; discount: any };
};

// This is the current configuration but could change at any point.
// the key is the total and the value is the discount apply
export const breakpoints: DiscountProgressConfig = {
  135: 15,
  150: 20,
  200: 30,
  300: 50,
};

const ShoppingCartContext = createContext({} as ShoppingCartContextProps);

export function useShoppingCart() {
  return useContext(ShoppingCartContext);
}

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [lineItems, setLineItems] = useState<ILineItem[]>([]);
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>(
    "shopping-cart",
    []
  );
  const cartQuantity = cartItems.reduce(
    (quantity, item) => item.quantity + quantity,
    0
  );

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  const getItemQuantity = (id: number) => {
    return cartItems.find((item) => item.id === id)?.quantity || 0;
  };

  const getItemPrice = (id: number) => {
    return cartItems.find((item) => item.id === id)?.price || 0;
  };

  const getItemTotal = (id: number) => {
    return cartItems.find((item) => item.id === id)?.total || 0;
  };

  const increaseCartQuantity = (item: StoreItemProps) => {
    const { id, price } = item;
    setCartItems((currItems) => {
      if (currItems.find((item) => item.id === id) == null) {
        return [...currItems, { id, quantity: 1, price, total: price }];
      } else {
        return currItems.map((item) => {
          if (item.id === id) {
            return {
              ...item,
              quantity: item.quantity + 1,
              total: item.price * (item.quantity + 1),
            };
          } else {
            return item;
          }
        });
      }
    });
  };

  const decreaseCartQuantity = (item: StoreItemProps) => {
    const { id, price } = item;
    setCartItems((currItems) => {
      if (currItems.find((item) => item.id === id)?.quantity === 1) {
        return currItems.filter((item) => item.id !== id);
      } else {
        return currItems.map((item) => {
          if (item.id === id) {
            return {
              ...item,
              quantity: item.quantity - 1,
              total: item.total - price,
            };
          } else {
            return item;
          }
        });
      }
    });
  };

  const removeFromCart = (id: number) => {
    setCartItems((currItems) => {
      return currItems.filter((item) => item.id !== id);
    });
  };

  const getTotal = () => {
    const total = cartItems.reduce((total, cartItem) => {
      const item = storeProducts.find((i) => i.id === cartItem.id);
      return total + (item?.price || 0) * cartItem.quantity;
    }, 0);

    const discountApply = Object.entries(breakpoints)
      .reverse()
      .find(([limit, _]) => {
        return total >= parseInt(limit);
      });
    const discount = discountApply ? discountApply[1] : 0;
    return {
      total,
      save: total - discount,
      discount,
    };
  };

  return (
    <ShoppingCartContext.Provider
      value={{
        getItemQuantity,
        getItemTotal,
        getItemPrice,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
        getTotal,
        openCart,
        closeCart,
        cartItems,
        cartQuantity,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
}
