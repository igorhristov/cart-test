export const addItemToCart = (cartItems, cartItemToAdd) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToAdd.id
  );

  if (existingCartItem) {
    return cartItems;
  }

  return [...cartItems, { ...cartItemToAdd, quantity: 1 }];
};

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
  return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove);
};

export const addQuantityToCartItem = (cartItems, cartItemQuantityToAdd) => {
  return cartItems.map((cartItem) =>
    cartItem.id === cartItemQuantityToAdd.id
      ? { ...cartItem, quantity: cartItem.quantity + 1 }
      : cartItem
  );
};

export const removeQuantityFromCartItem = (
  cartItems,
  cartItemQuantityToRemove
) => {
  return cartItems.map((cartItem) => {
    if (cartItem.id === cartItemQuantityToRemove.id && cartItem.quantity > 1) {
      return { ...cartItem, quantity: cartItem.quantity - 1 };
    }
    return cartItem;
  });
};

export const selectedAttributesListing = (
  existingProductsAttributes,
  newProductAttributes
) => {
  const id = newProductAttributes.id;
  const attributes = newProductAttributes.attributes.map((item) => {
    const id = item.id;
    const items = item.items[0];

    const defaultAttribute = {
      id,
      items,
    };
    return defaultAttribute;
  });

  const selectedProductAttributes = {
    id,
    attributes,
  };

  if (existingProductsAttributes.length === 0) {
    return existingProductsAttributes.concat([selectedProductAttributes]);
  }

  const existProductAttributeInList = existingProductsAttributes.find(
    (item) => item.id === newProductAttributes.id
  );

  if (existProductAttributeInList) {
    return existingProductsAttributes;
  }

  return existingProductsAttributes.concat([selectedProductAttributes]);
};

export const selectAttributeUtil = (existingProductsAttributes, item) => {
  return existingProductsAttributes.map((product) => {
    if (product.id === item.currentProductId) {
      const productAtt = product.attributes.map((attribute) => {
        if (attribute.id === item.attributeId) {
          return {
            id: attribute.id,
            items: {
              value: item.itemId,
              id: item.itemVal,
              selected: !item.selectedVal
            },
          };
        }
        return attribute;
      });

      return {
        id: product.id,
        attributes: productAtt,
      };
    }

    return product;
  });
};
