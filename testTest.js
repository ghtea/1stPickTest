const currentMap = "Towers of Doom"
 
  let colWinRate = currentMap + ' win_rate'
  let colPlayRate = currentMap + ' popularity'
  let colBanRate = currentMap + ' ban_rate'
  
  
for (const [key, value] of Object.entries(data)) {
  value['Point'] =
    (100 - 77) * (data[colWinRate]/ 50 / 3.6) +
      77 *
        ((((data[colBanRate] + data[colPlayRate])/ 100) * 88) /
          16 /
          19);
}

console.log(data)


document.getElementById("test").innerText = JSON.stringify(data)