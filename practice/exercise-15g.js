export function isWeekend(date){

let dayOfWeek = date.format('dddd');

 if(dayOfWeek === 'Saturday' || dayOfWeek === 'Sunday'){
  console.log("Yes, It is the weekend.");
 }else{
  console.log("No, It is not.");
 }

}