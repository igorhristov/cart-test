import CartActionTypes from "./cart.types";

import {
  addItemToCart,
  removeItemFromCart,
  addQuantityToCartItem,
  removeQuantityFromCartItem,
  selectedAttributesListing,
  selectAttributeUtil,
} from "./cart.utils";

const INITIAL_STATE = {
  hidden: true,
  cartItems: [],
  selectedAttributes: [],
};

const cartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CartActionTypes.TOGGLE_CART_HIDDEN:
      return {
        ...state,
        hidden: !state.hidden,
      };

    case CartActionTypes.ADD_CART_ITEM:
      return {
        ...state,
        cartItems: addItemToCart(state.cartItems, action.payload),
      };

    case CartActionTypes.REMOVE_CART_ITEM:
      return {
        ...state,
        cartItems: removeItemFromCart(state.cartItems, action.payload),
      };

    case CartActionTypes.CART_ITEM_ADD_QUANTITY:
      return {
        ...state,
        cartItems: addQuantityToCartItem(state.cartItems, action.payload),
      };

    case CartActionTypes.CART_ITEM_REMOVE_QUANTITY:
      return {
        ...state,
        cartItems: removeQuantityFromCartItem(state.cartItems, action.payload),
      };

    case CartActionTypes.SELECTED_ATTRIBUTES_LIST:
      return {
        ...state,
        selectedAttributes: selectedAttributesListing(
          state.selectedAttributes,
          action.payload
        ),
      };

    case CartActionTypes.SELECT_ATTRIBUTE:
      return {
        ...state,
        selectedAttributes: selectAttributeUtil(
          state.selectedAttributes,
          action.payload
        ),
      };

    default:
      return state;
  }
};

export default cartReducer;
