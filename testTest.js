
function compaireFunc(key) {
  return function(a, b) {
    return b[key] - a[key];
  };
}


const currentMap = "Towers of Doom"
 
  let colWinRate = currentMap + ' win_rate'
  let colPlayRate = currentMap + ' popularity'
  let colBanRate = currentMap + ' ban_rate'
  
  
for (const [key, value] of Object.entries(data)) {
  value['Point'] =
    (100 - 77) * (value[colWinRate]/ 50 / 3.6) +
      77 *
        ((((value[colBanRate] + value[colPlayRate])/ 100) * 88) /
          16 /
          19);
}


dataList = Object.values(data)
  
  dataListSorted = dataList.sort(compaireFunc("Point"));

console.log(dataList)

/*
document.getElementById("test").innerText = JSON.stringify(data)    
*/