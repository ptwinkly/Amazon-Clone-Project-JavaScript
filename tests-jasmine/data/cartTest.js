import { addToCart, cart, loadFromStorage} from "../../data/cart.js";

describe('test suite: addToCart', () => {
  
  // [test case 1] : when the product already in the cart
  it('adds an existing product to the cart', () => {

    spyOn(localStorage, 'setItem');

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
  });

  // [test case 2] : when the product NOT in the cart
  it('adds a new product to the cart', () => {
    
    // Mocks : localStorage setItem cuz we don't want it to actually save data to the localStorage
    // Mock this before addToCart first cuz order matters
    spyOn(localStorage, 'setItem');

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
  });

});