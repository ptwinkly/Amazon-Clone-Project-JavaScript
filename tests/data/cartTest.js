import { addToCart, cart, loadFromStorage, removeFromCart} from "../../data/cart.js";

describe('test suite: addToCart', () => {
  
  beforeEach(() => {
    // Mocks : localStorage setItem cuz we don't want it to actually save data to the localStorage
    // Mock this before addToCart first cuz order matters
    spyOn(localStorage, 'setItem');
  });

  // [test case 1] : when the product already in the cart
  it('adds an existing product to the cart', () => {

    spyOn(localStorage, 'getItem').and.callFake(() => {
      
      return JSON.stringify([{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 1,
        deliveryOptionId: '1'
      }]);

    });
    
    loadFromStorage();

    addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart[0].quantity).toEqual(2);

    expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify(cart));
  });

  // [test case 2] : when the product NOT in the cart
  it('adds a new product to the cart', () => {

    // Mocks : will replace localStorage getItem to a fake version like we override whatever it was before
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([]); // now cart = '[]'
    });
    
    // reload the cart
    // now cart will be an empty array as we mocks it
    loadFromStorage();

    addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');

    // if the new product was added
    expect(cart.length).toEqual(1);

    // check if setItem was called at some point
    // 1 = at least been called once
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);

    // if the new product was added
    expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart[0].quantity).toEqual(1);

    expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify(cart));
  });

});

describe('test suite: removeFromCart', () => {

  const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
  const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';
  const productId3 = '83d4ca15-0f35-48f5-b7a3-1ea210004f2e';

  beforeEach(() => {

    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([{
        productId: productId1,
        quantity: 2,
        deliveryOptionId: '1'
      },{
        productId: productId2,
        quantity: 1,
        deliveryOptionId: '2'
      }]);
    });

    spyOn(localStorage, 'setItem');

    loadFromStorage();
 
  });
  
  it('removes a productId that is in the cart', () => {

    removeFromCart(productId1);

    expect(cart.length).toEqual(1);

    expect(cart[0].productId).toEqual(productId2);
    expect(cart[0].quantity).toEqual(1);
    expect(cart[0].deliveryOptionId).toEqual('2');

    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify(cart));
  });

  it('removes a productId that is NOT in the cart', () => {
    
    removeFromCart(productId3);

    expect(cart.length).toEqual(2);

    expect(cart[0].productId).toEqual(productId1);
    expect(cart[0].quantity).toEqual(2);
    expect(cart[0].deliveryOptionId).toEqual('1');

    expect(cart[1].productId).toEqual(productId2);
    expect(cart[1].quantity).toEqual(1);
    expect(cart[1].deliveryOptionId).toEqual('2');

    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify(cart));

  });

});