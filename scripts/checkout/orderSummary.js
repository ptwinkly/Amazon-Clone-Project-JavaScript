import {cart, removeFromCart, calculateCartQuantity,updateDeliveryOption, updateCartQuantity} from '../../data/cart.js';
import { products, getProduct } from '../../data/products.js';
import { formatCurrency } from '../utils/money.js';
import {hello} from 'https://unpkg.com/supersimpledev@1.0.1/hello.esm.js';
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import {deliveryOptions, getDeliveryOption} from '../../data/deliveryOption.js';
import { renderPaymentSummary } from './paymentSummary.js';
import { renderCheckoutHeader } from './checkoutHeader.js';

export function renderOrderSummary(){

  let cartSummaryHTML = '';
  cart.forEach((cartItem) => {

    //console.log(cartItem);

    const productId = cartItem.productId;
    const matchingProduct = getProduct(productId);

    // text show after Delivery date:
    const deliveryOptionId = cartItem.deliveryOptionId;

    const deliveryOption = getDeliveryOption(deliveryOptionId);

    const today = dayjs();
    const deliveryDate = today.add(
      deliveryOption.deliveryDays,
      'days'
    );
    const dateString = deliveryDate.format('dddd, MMMM D');

    cartSummaryHTML += `
      <div class="cart-item-container js-cart-item-container js-cart-item-container-${matchingProduct.id}">
        <div class="delivery-date">
          Delivery date: ${dateString}
        </div>

        <div class="cart-item-details-grid">
          <img class="product-image"
            src="${matchingProduct.image}">

          <div class="cart-item-details">
            <div class="product-name js-product-name-${matchingProduct.id}">
              ${matchingProduct.name}
            </div>
            <div class="product-price js-product-price-${matchingProduct.id}">
              ${matchingProduct.getPrice()}
            </div>
            <div class="product-quantity js-product-quantity-${matchingProduct.id}">
              
                <span class="js-quantity-label-container-${matchingProduct.id}">
                  Quantity: <span class="quantity-label">${cartItem.quantity} </span>
                </span>
                <span class="js-update-to-save-link-container-${matchingProduct.id}">
                  <span class="update-quantity-link link-primary js-update-link js-update-link-${matchingProduct.id}" data-product-id="${matchingProduct.id}">
                    Update
                  </span>
                  <span class="save-quantity-link link-primary js-save-quantity-link js-save-quantity-link-${matchingProduct.id}" data-product-id="${productId}">
                  Save
                  </span>
            
              <span class="delete-quantity-link link-primary js-delete-link js-delete-link-${matchingProduct.id}" data-product-id="${matchingProduct.id}">
                Delete
              </span>
            </div>
          </div>
          <div class="delivery-options">
            <div class="delivery-options-title">
              Choose a delivery option:
            </div>
            ${deliveryOptionHTML(matchingProduct,cartItem)}
            </div>
          </div>
        </div>
      </div>
    `;
  });

  function deliveryOptionHTML(matchingProduct,cartItem){
    
    let html = ``;

    deliveryOptions.forEach((deliveryOption) => {
      const today = dayjs();
      const deliveryDate = today.add(
        deliveryOption.deliveryDays,
        'days'
      );
      const dateString = deliveryDate.format('dddd, MMMM D');
      const priceString = deliveryOption.priceCents === 0
      ? 'FREE'
      : `$${formatCurrency(deliveryOption.priceCents)} - `;
      
      const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

      html +=
      `
      <div class="delivery-option js-delivery-option" data-product-id="${matchingProduct.id}" data-delivery-option-id="${deliveryOption.id}">
        <input type="radio" ${isChecked ? 'checked':''}
        class="delivery-option-input"
        name="delivery-option-${matchingProduct.id}">
        <div>
        <div class="delivery-option-date">
          ${dateString}
        </div>
        <div class="delivery-option-price">
          ${priceString} - Shipping
        </div>
        </div>
      </div>
      `
    });
    return html;
  }

  document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;

  // Update btn link
  document.querySelectorAll('.js-update-link').forEach((link) => {
    link.addEventListener('click', () => {

      const productId = link.dataset.productId;

      cart.forEach((cartItem) => {
        if(cartItem.productId === productId){
          cartItem = cartItem;

          document.querySelector(`.js-quantity-label-container-${productId}`).innerHTML = `      
            Quantity: <input type="number" class = "quantity-input js-quantity-input-${productId}" name="quantity" value="${cartItem.quantity}">
          `

          document.querySelector(`.js-update-link-${productId}`).style.display = 'none';

          document.querySelector(`.js-save-quantity-link-${productId}`).style.display = 'initial';
          
        }
      });
    });
  });

  // Save update
  document.querySelectorAll('.js-save-quantity-link').forEach((link) => {
    //console.log(link);
    link.addEventListener('click',() => {
      const productId = link.dataset.productId;
      const newQuantityElement = document.querySelector(`.js-quantity-input-${productId}`);
      const newQuantity = newQuantityElement.value;
      cart.forEach((cartItem) => {
        if(cartItem.productId === productId){
          cartItem = cartItem;
          updateCartQuantity(cartItem, newQuantity);
        }
      });
      renderCheckoutHeader();
      renderOrderSummary();
      renderPaymentSummary();
    });
  });

  // Delete btn link: remove items
  document.querySelectorAll('.js-delete-link').forEach((link) => {
    link.addEventListener('click', ()=> {
      const productId = link.dataset.productId;
      removeFromCart(productId);

      const container = document.querySelector(`.js-cart-item-container-${productId}`);
      container.remove();
      renderCheckoutHeader();
      renderPaymentSummary();
    });
  });

  // Update delivery option [*unfinished*]
  document.querySelectorAll('.js-delivery-option')
    .forEach((element) => {
      element.addEventListener('click', () => {
        const {productId, deliveryOptionId} = element.dataset;
        updateDeliveryOption(productId, deliveryOptionId);
        renderCheckoutHeader();
        renderOrderSummary();
        renderPaymentSummary();
      });
    });
}