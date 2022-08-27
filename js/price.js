

let check_in_date= '2022-08-15';
let check_out_date= '2022-08-17';

let price_per_night =( new Date (check_out_date) - new Date (check_in_date) )/(1000*3600*24)

console.log(price_per_night)