
function timeFormatter(time){
   const timeDiff = (Date.now() - new Date(time).getTime())/1000;
   
   if (timeDiff > 60 * 60 * 24) return `${Math.floor(timeDiff / (60 * 60 * 24))} days`;
   else if (timeDiff > 60 * 60) return `${Math.floor(timeDiff / (60 * 60))} hours`;
   else if (timeDiff > 60) return `${Math.floor(timeDiff / 60)} minutes`;
   else return `${Math.floor(timeDiff)} seconds`;
}
export default timeFormatter