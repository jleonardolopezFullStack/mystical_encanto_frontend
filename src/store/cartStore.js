import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCartStore = create(
  persist(
    (set, get) => ({
      stateCart: [{ name: "arroz", quantity: 3, price: 8, discount: 2 }],
      totalPrice: 0,
      totalQuantity: 0,
      totalDiscount: 0,
      handleStateCartNewValue: (value) => {
        set((state) => ({
          stateCart: [
            ...state.stateCart,
            {
              name: value.name,
              quantity: 1,
              price: value.price,
              discount: value.discount,
              idStripe: value.idStripe,
            },
          ],
        }));
      },
      handleStateCartdeleteAll: (value) => {
        let newSubtotal = 0;
        let newQuantity = 0;
        let newdiscount = 0;

        value.forEach((item) => {
          newSubtotal += item.price * item.quantity;
          newdiscount += item.discount * item.quantity;
          newQuantity += item.quantity;
          return;
        });

        set((state) => ({
          stateCart: value,
          totalDiscount: newdiscount,
          totalQuantity: newQuantity,
          totalPrice: newSubtotal,
        }));
      },
      handleStateCartAddToValue: async (value) => {
        const { stateCart, handleStateCartdeleteAll } = get();
        //console.log(stateCart);
        // console.log(value.name);
        const newStateCart = [];
        await stateCart.map((item) => {
          return item.name === value.name
            ? newStateCart.push(value)
            : newStateCart.push(item);
        });
        //console.log(newStateCart);
        handleStateCartdeleteAll(newStateCart);
        //console.log(stateCart);
      },

      handleStateCartRestToValue: async (value) => {
        const { stateCart, handleStateCartdeleteAll } = get();
        //console.log(stateCart);
        // console.log(value.name);
        const newStateCart = [];
        await stateCart.map((item) => {
          return item.name === value.name
            ? newStateCart.push(value)
            : newStateCart.push(item);
        });
        //console.log(newStateCart);
        handleStateCartdeleteAll(newStateCart);
        console.log(stateCart);
      },

      handleStateCartdeleteToValue: async (value) => {
        const { stateCart, handleStateCartdeleteAll } = get();
        //console.log(stateCart);
        // console.log(value.name);
        const newStateCart = await stateCart.filter((item) => {
          if (item.name !== value) {
            return item;
          }
          return;
        });
        console.log(newStateCart);
        handleStateCartdeleteAll(newStateCart);
        //console.log(stateCart);
      },

      handleStateCartSummaryPrice: () => {
        const { stateCart } = get();
        let initialCost = 0;
        let initialQuantity = 0;
        let initialDiscount = 0;
        const totalCost = stateCart.map((cart) => {
          return (
            (initialCost += cart.quantity * cart.price) &&
            (initialQuantity += cart.quantity) &&
            (initialDiscount += cart.discount * cart.quantity)
          );
        });

        set((state) => ({
          totalPrice: initialCost,
          totalQuantity: initialQuantity,
          totalDiscount: initialDiscount,
        }));
        // console.log(totalPrice);
        // console.log(totalDiscount);
      },
      handleDeleteLocalStorageCart: () => {
        set((state) => ({
          stateCart: [],
          totalDiscount: 0,
          totalQuantity: 0,
          totalPrice: 0,
        }));
      },
    }),
    { name: "state" }
  )
);
