import {renderCheckoutHeader} from './checkout/checkoutHeader.js';

import {renderOrderSummary} from './checkout/orderSummary.js';

import {renderPaymentSummary} from './checkout/paymentSummary.js';

import {loadProducts, loadProductsFetch} from '../data/products.js';

import { loadCart } from '../data/cart.js';

//import '../data/backend-practice.js';
//import '../data/cart-oop.js'
//import '../data/cart-class.js'

async function loadPage(){
  
  try{ //error handling

    //throw 'error1'; // manually create error

    //load product
    await loadProductsFetch();

    //load cart
    await new Promise((resolve, reject) => {
      //throw 'error2';
      loadCart(() => {
        //reject('error3');
        resolve();
      });
    });

  }catch(error){
    console.log('unexpected error. Please try again later.');
  }

  //load pages
  renderCheckoutHeader();
  renderOrderSummary();
  renderPaymentSummary();

}

loadPage();

/*
Promise.all([
  loadProductsFetch(),
  new Promise((resolve) => {
    loadCart(() => {
      resolve();
    });
  })
]).then((values) => {
  //console.log(values);
  renderCheckoutHeader();
  renderOrderSummary();
  renderPaymentSummary();
});
*/

/*
Promise.all([
  new Promise((resolve) => {
    loadProducts(() => {
      resolve('value1');
    });
  }),
  new Promise((resolve) => {
    loadCart(() => {
      resolve();
    });
  })
]).then((values) => {
  console.log(values);
  renderCheckoutHeader();
  renderOrderSummary();
  renderPaymentSummary();
});
*/

/*
new Promise((resolve) => {
  //console.log("start promise");
  loadProducts(() => {
    //console.log("finsh loading");
    resolve('value1');
  });
}).then((value) => {
  //console.log("next step");
  console.log(value);

  return new Promise((resolve) => {
    loadCart(() => {
      resolve();
    });
  });
 
}).then(() => {
    renderCheckoutHeader();
    renderOrderSummary();
    renderPaymentSummary();
});
*/

/*
loadProducts(() => {

  loadCart(() => {

    renderCheckoutHeader();

    renderOrderSummary();

    renderPaymentSummary();
  });

});
*/