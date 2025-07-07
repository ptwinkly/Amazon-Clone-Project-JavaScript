// export variables from a file
export const cart = [];

// check matching items in the cart
// if it matches = exists then add up the cart quantity
// if not add the new product to the cart
export function addToCart(productId){
  
  let matchingItem;

  cart.forEach((cartItem) => {
    if(productId === cartItem.productId){
      matchingItem = cartItem;
    }
  });

  if(matchingItem){
    matchingItem.quantity += 1;
  }else{
    cart.push({
      productId: productId,
      quantity: 1
    });
  }
}