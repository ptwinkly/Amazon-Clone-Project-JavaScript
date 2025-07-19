export const orders = JSON.parse(localStorage.getItem('orders')) || [];

export function addOrder(order){
  //add order at the front of the array, so the new order shows first
  orders.unshift(order);
  saveToStorage();
}

function saveToStorage(){
  localStorage.setItem('order', JSON.stringify(orders));
}