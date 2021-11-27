import CartActionTypes from "./cart.types";

export const toggleCartHidden = () => ({
  type: CartActionTypes.TOGGLE_CART_HIDDEN,
});

export const addItemToCart = (item) => ({
  type: CartActionTypes.ADD_CART_ITEM,
  payload: item,
});

export const removeItemFromCart = (item) => ({
  type: CartActionTypes.REMOVE_CART_ITEM,
  payload: item,
});

export const addQuantityToCartItem = (item) => ({
  type: CartActionTypes.CART_ITEM_ADD_QUANTITY,
  payload: item,
});

export const removeQuantityFromCartItem = (item) => ({
  type: CartActionTypes.CART_ITEM_REMOVE_QUANTITY,
  payload: item,
});

export const selectedAttributesList = (item) => ({
  type: CartActionTypes.SELECTED_ATTRIBUTES_LIST,
  payload: item,
});

export const selectAttribute = (item) => ({
  type: CartActionTypes.SELECT_ATTRIBUTE,
  payload: item,
});
