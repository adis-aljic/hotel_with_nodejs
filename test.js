const date1 = new Date(2022,8,15).toISOString().slice(0,10)
const date2 = new Date(2022,8,25).toISOString().slice(0,10)

if(date1<date2) console.log("a");
else console.log("B");