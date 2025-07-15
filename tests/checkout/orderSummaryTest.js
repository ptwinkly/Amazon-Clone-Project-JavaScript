import { renderOrderSummary } from "../../scripts/checkout/orderSummary.js";
import { loadFromStorage, cart} from "../../data/cart.js";
import { loadProducts } from "../../data/products.js";

describe('test suite: renderOrderSummary', () => {

  const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
  const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';

  // load products first
  beforeAll((done) => {
    loadProducts(() => {
      done(); // go to next step
    });
  });

  beforeEach(() => {

    spyOn(localStorage, 'setItem');
    
    document.querySelector('.js-test-container').innerHTML = `
      <div class="js-checkout-header"></div>
      <div class="js-order-summary"></div>
      <div class="js-payment-summary"></div>
    `;

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
        
    loadFromStorage();

    renderOrderSummary();
  
  });

  afterEach(() => {
    document.querySelector('.js-test-container').innerHTML = '';
  });

  it('displays the cart', () => {

    // [test case 1] : How the page looks
    expect(
      document.querySelectorAll('.js-cart-item-container').length
    ).toEqual(2);

    // Check if there is 'Quantity: 2' text somewhere in the element, on the page
    expect(
      document.querySelector(`.js-product-quantity-${productId1}`).innerText
    ).toContain('Quantity: 2');

    expect(
      document.querySelector(`.js-product-quantity-${productId2}`).innerText
    ).toContain('Quantity: 1');

    // check product name display
    expect(
      document.querySelector(`.js-product-name-${productId1}`).innerText
    ).toContain('Black and Gray Athletic Cotton Socks - 6 Pairs');
    expect(
      document.querySelector(`.js-product-name-${productId2}`).innerText
    ).toContain('Intermediate Size Basketball');

    // check product price display
    expect(
      document.querySelector(`.js-product-price-${productId1}`).innerText
    ).toContain('$10.90');
    expect(
      document.querySelector(`.js-product-price-${productId2}`).innerText
    ).toContain('$20.95');
  });

  // [test case 2] : How the page behaves
  it('removes a product', () => {

    document.querySelector(`.js-delete-link-${productId1}`).click();

    expect(
      document.querySelectorAll('.js-cart-item-container').length
    ).toEqual(1);

    expect(
      document.querySelector(`.js-cart-item-container-${productId1}`)
    ).toEqual(null);

    expect(
      document.querySelector(`.js-cart-item-container-${productId2}`)
    ).not.toEqual(null);

    // Check the cart array
    expect(cart.length).toEqual(1);
    expect(cart[0].productId).toEqual(productId2);

  });

});