import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';

import { isWeekend as isSatSun } from './exercise-15g.js';

// Deal with date exercises

// 15a
const today = dayjs();
const deliveryDate = today.add(5, 'day');
console.log(deliveryDate.format('MMMM dddd'));

// 15b
const oneMonthAfter = today.add(1, 'month');
//console.log(oneMonthAfter.format('DD/MM/YYYY'));
console.log(oneMonthAfter.format('MMMM dddd'));

// 15c
const oneMonthBefore = today.subtract(1, 'month');
console.log(oneMonthBefore.format('MMMM dddd'));

// 15d
const dayOfWeek = today.format('dddd');
//console.log(dayOfWeek);

// 15e
const checkDate = dayjs().subtract(1, 'month');

isSatSun(checkDate);

/*
function isWeekend(date){

let dayOfWeek = date.format('dddd');

 if(dayOfWeek === 'Saturday' || dayOfWeek === 'Sunday'){
  console.log("Yes, It is the weekend.");
 }else{
  console.log("No, It is not.");
 }

}
 */