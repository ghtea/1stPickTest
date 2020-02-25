/* console.log(dataOriginal[1]['HeroID']);
var test = dataOriginal[1]['BanRate']; */

/* almost constant variables, initialization, functions*/


var data= objHeroMapBasic;
var dataHH = objHeroHero;


var dataList = [];
var dataHHList = [];

/* make obj as array */
dataHHList = Object.values(dataHH);

const numHero = 88;
const meanWinRate = 49.47;
const stdWinRate = 4.27;
const meanGameRate = 24.80;
const stdGameRate = 31.55
const meanDiff = 2.97
const stdDiff = 0.93
const adjustDiff= 1;


let btnHeroList = [];
var cbxPerHeroList = [];
var checkedRoles = [];
var checkedDifficulties = [];

var body = document.getElementsByTagName("body");
var tbl = document.getElementById("tableMain");
var sltMap = document.getElementById("sltMap");
var sltDifficulty = document.getElementById("sltDifficulty");
var rgRatio = document.getElementById("rgRatio");
var cbxRoleTank = document.getElementById("cbxRoleTank");
var cbxRoleBruiser = document.getElementById("cbxRoleBruiser");
var cbxRoleMelee = document.getElementById("cbxRoleMelee");
var cbxRoleRanged = document.getElementById("cbxRoleRanged");
var cbxRoleHealer = document.getElementById("cbxRoleHealer");
var cbxRoleSupport = document.getElementById("cbxRoleSupport");
var btnClear = document.getElementById("btnClear");
var divScroll = document.getElementById("divScroll");
var btnScroll = document.getElementById("btnScroll");

let divBonus = document.getElementById('divBonus')
let btnCloseBonus = document.getElementById("btnCloseBonus");

const numSizeWin = 4.6;
const numSizePlay = 0.5;

var roleInitial;
var roleColor;

function compaireFunc(key) {
  return function(a, b) {
    return b[key] - a[key];
  };
}


function makeRows() {
  let currentMap = document.getElementById("sltMap").value;
  let currentDifficulty = document.getElementById("sltDifficulty").value;
  let currentRatio = document.getElementById("rgRatio").value;
  let rows = document.getElementsByClassName("rowTableMain");
  
  let colWinRate = currentMap + ' win_rate';
  let colGameRate = currentMap + ' popularity';
  let colBanRate = currentMap + ' ban_rate';
  
  /*
  dataListSorted = dataList.sort(compaireFunc("Point"));
  console.log(dataListSorted)
 
  if (rows.length > 0) {
    for (var i = 0; i < numHero; i++) {
      tbl.deleteRow(1);
    }
  }
  */
  dataList = Object.values(data)
  
  for (var i = 0; i < numHero; i++) {
    var row = tbl.insertRow(i + 1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);

    row.classList.add("rowTableMain");
    /*row.classList.add("rowShow");*/
    row.setAttribute("id", "rowHeroID" + dataList[i]["HeroID"]);
    row.classList.add("rowDifficulty" + dataList[i]["Difficulty"]);
    row.classList.add("rowRole" + dataList[i]["Role"]);
    row.setAttribute("data-point", dataList[i]["Point"].toString());
      
    cell1.innerHTML =
      "<button class='btnHero' id='btn" +
      dataList[i]["HeroID"] + "'> <img src='" + "heroImages/" + dataList[i]["HeroID"] +
      ".png'> </button>";
    
    
    switch (dataList[i]["Role"]) {
      case "Tank":
        roleInitial = "T";
        break;
      case "Bruiser":
        roleInitial = "B";
        break;
      case "Melee":
        roleInitial = "M";
        break;
      case "Ranged":
        roleInitial = "R";
        break;
      case "Healer":
        roleInitial = "H";
        break;
      case "Support":
        roleInitial = "S";
        break;
    } 
    
    var divRoleTd = document.createElement("div");
    var rectRole = document.createElement("div");
    rectRole.setAttribute("class", "role" + dataList[i]["Role"]);
    rectRole.innerHTML = roleInitial;
    divRoleTd.appendChild(rectRole);
    cell2.appendChild(divRoleTd);

    for (var k = 0; k < parseInt(dataList[i]["Difficulty"]); k++) {
      var rectDifficulty = [];
      rectDifficulty[k] = document.createElement("div");
      cell3.appendChild(rectDifficulty[k]);
    }
    cell3.setAttribute("class", "difficulty" + dataList[i]["Difficulty"]);

    cell4.setAttribute("class", "cellMain");
    var rectMain = document.createElement("div");
    var rectMainWidth = (dataList[i][colWinRate] - 35) * numSizeWin;
    var rectMainHeight =
      dataList[i][colGameRate] * numSizePlay;

    rectMain.style =
      "width:" +
      rectMainWidth +
      "px;height:" +
      rectMainHeight +
      "px; background: linear-gradient(200deg, rgba(105,245,168,1) 0%, rgba(17,226,97,1) 40%, rgba(17,226,97,1) 100%); ";
    rectMain.setAttribute("class", "rectMain");
    /* followings don't work
        Rect.style.width = RectWidth + "px;" ;
        Rect.style.height = RectHeight + "px;" ;
        Rect.setAttribute("class", "boxWG");
        */
    cell4.appendChild(rectMain);

    var divText = document.createElement("div");
    var txtGames = (100 / dataList[i][colGameRate]).toFixed(1);
    var txtWinRate = dataList[i][colWinRate].toFixed(1);
    divText.innerHTML = txtWinRate + "%" + "<br> 1 in " + txtGames + "G";
    divText.setAttribute("class", "divRectText");
    cell4.appendChild(divText);

    /* var txtPoint = dataSorted[i]["Point"].toFixed(1); */

    cell5.innerHTML = "<input type='checkbox' class = 'cbxPerHero'>";
  }

  cbxPerHeroList = document.getElementsByClassName("cbxPerHero");
  btnHeroList = document.getElementsByClassName("btnHero")
  for (var i = 0; i < numHero; i++) {
    cbxPerHeroList[i].addEventListener("change", checkSome);
    btnHeroList[i].addEventListener("click", updateMatchup);
  }
}
  
  
function updatePoint() {
  let currentMap = document.getElementById("sltMap").value;
  let currentDifficulty = document.getElementById("sltDifficulty").value;
  let currentRatio = document.getElementById("rgRatio").value;
  let currentRatio2 = document.getElementById("rgRatio2").value;
  
  let rows = document.getElementsByClassName("rowTableMain");
  
  let colWinRate = currentMap + ' win_rate';
  let colGameRate = currentMap + ' popularity';
  let colBanRate = currentMap + ' ban_rate';
  
  for (const [key, value] of Object.entries(data)) {
    value['Point'] =
      (100 - currentRatio) * ((value[colWinRate]- meanWinRate)/ stdWinRate) 
      + currentRatio *
        ((value[colBanRate] + value[colGameRate] - meanGameRate) / stdGameRate)
      + (currentRatio2 - 50) * adjustDiff * (value['Difficulty'] -meanDiff)/stdDiff;
  }

  dataList = Object.values(data)
}
 

 
 

  
function  applyTable() {
  let currentMap = document.getElementById("sltMap").value;
  let currentDifficulty = document.getElementById("sltDifficulty").value;
  let currentRatio = document.getElementById("rgRatio").value;
  let rows = document.getElementsByClassName("rowTableMain");
  
  let colWinRate = currentMap + ' win_rate';
  let colGameRate = currentMap + ' popularity';
  let colBanRate = currentMap + ' ban_rate';
  for (var i = 0; i < numHero; i++) {
    let currentPoint = parseFloat(rows[i].getAttribute("data-point"));
    for (var k=0; k<numHero; k++) {
      if(rows[k].getAttribute("id") == "rowHeroID" + dataList[i]["HeroID"]) {
        
        rows[k].setAttribute("data-point", dataList[i]["Point"].toString());
        
        let rectMain = document.querySelectorAll(".rowTableMain .rectMain")[k]
        let rectMainWidth = (dataList[i][colWinRate] - 35) * numSizeWin;
        let rectMainHeight =
      dataList[i][colGameRate] * numSizePlay;

        rectMain.style =
          "width:" +
          rectMainWidth +
          "px;height:" +
          rectMainHeight +
          "px; background: linear-gradient(200deg, rgba(105,245,168,1) 0%, rgba(17,226,97,1) 40%, rgba(17,226,97,1) 100%); ";
        
        
        let divText = document.querySelectorAll(".rowTableMain .divRectText")[k]
        let txtGames = (100 / dataList[i][colGameRate]).toFixed(1);
        let txtWinRate = dataList[i][colWinRate].toFixed(1);
        divText.innerHTML = txtWinRate + "%" + "<br> 1 in " + txtGames + "G";
      }
    }
  }
}

function sortTable() {
  let rows = document.getElementsByClassName("rowTableMain");
  let switching, x, y, shouldSwitch;
  
  switching = true;
  /*Make a loop that will continue until
  no switching has been done:*/
  while (switching) {
    //start by saying: no switching is done:
    switching = false;
    /*Loop through all table rows (except the
    first, which contains table headers):*/
    for (var k=0; k<numHero-1; k++) {
      //start by saying there should be no switching:
      shouldSwitch = false;
      /*Get the two elements you want to compare,
      one from current row and one from the next:*/
      x = parseFloat(rows[k].getAttribute('data-point'));
      y = parseFloat(rows[k + 1].getAttribute('data-point'));
      //check if the two rows should switch place:
      if (x < y) {
        //if so, mark as a switch and break the loop:
        shouldSwitch = true;
        break;
      }
    }
    if (shouldSwitch) {
      /*If a switch has been marked, make the switch
      and mark that a switch has been done:*/
      rows[k].parentNode.insertBefore(rows[k + 1], rows[k]);
      switching = true;
    }
  }
}




function hideSome() {
  let currentMap = document.getElementById("sltMap").value;
  let currentDifficulty = document.getElementById("sltDifficulty").value;
  
  let colWinRate = currentMap + ' win_rate'
  let colGameRate = currentMap + ' popularity'
  let colBanRate = currentMap + ' ban_rate'
  
  let rows = document.getElementsByClassName("rowTableMain");

  var currentRoleCheckedTank = cbxRoleTank.checked;
  var currentRoleCheckedBruiser = cbxRoleBruiser.checked;
  var currentRoleCheckedMelee = cbxRoleMelee.checked;
  var currentRoleCheckedRanged = cbxRoleRanged.checked;
  var currentRoleCheckedHealer = cbxRoleHealer.checked;
  var currentRoleCheckedSupport = cbxRoleSupport.checked;
 
  checkedRoles = [];
  if (currentRoleCheckedTank == true) {
    checkedRoles.push("rowRoleTank");
  }
  if (currentRoleCheckedBruiser == true) {
    checkedRoles.push("rowRoleBruiser");
  }
  if (currentRoleCheckedMelee == true) {
    checkedRoles.push("rowRoleMelee");
  }
  if (currentRoleCheckedRanged == true) {
    checkedRoles.push("rowRoleRanged");
  }
  if (currentRoleCheckedHealer == true) {
    checkedRoles.push("rowRoleHealer");
  }
  if (currentRoleCheckedSupport == true) {
    checkedRoles.push("rowRoleSupport");
  }

  checkedDifficulties = [];
  switch (currentDifficulty) {
    case "1":
      checkedDifficulties = ["rowDifficulty1"];
      break;
    case "2":
      checkedDifficulties = ["rowDifficulty1", "rowDifficulty2"];
      break;
    case "3":
      checkedDifficulties = [
        "rowDifficulty1",
        "rowDifficulty2",
        "rowDifficulty3"
      ];
      break;
    case "4":
      checkedDifficulties = [
        "rowDifficulty1",
        "rowDifficulty2",
        "rowDifficulty3",
        "rowDifficulty4"
      ];
      break;
    case "5":
      checkedDifficulties = [
        "rowDifficulty1",
        "rowDifficulty2",
        "rowDifficulty3",
        "rowDifficulty4",
        "rowDifficulty5"
      ];
      break;
  }

  /*console.log(rows[3]);*/
  /*just check https://stackoverflow.com/questions/31831651/javascript-filter-array-multiple-conditions*/
  for (var k = 0; k < numHero; k++) {
    var currentRow = rows[k];
    /* https://stackoverflow.com/questions/16312528/check-if-an-array-contains-any-element-of-another-array-in-javascript/29447130 */
    /* 한 배열에 여러 특정 값들이 있는지 확인 */
    if (
      checkedDifficulties.some(element =>
        Array.from(currentRow.classList).includes(element)
      ) &&
      checkedRoles.some(element =>
        Array.from(currentRow.classList).includes(element)
      )
    ) {
      /* https://stackoverflow.com/questions/11444640/add-a-class-to-a-div-with-javascript */
      currentRow.classList.remove("rowHide");
      currentRow.classList.add("rowShow");
    } else {
      currentRow.classList.add("rowHide");
      currentRow.classList.remove("rowShow");
    }
  }
}

function checkSome() {

  let rows = document.getElementsByClassName("rowTableMain");
  for (var k = 0; k < numHero; k++) {
    var currentRow = rows[k];
    var currentChecked = document.querySelectorAll("#tableMain tbody tr .cbxPerHero")[k].checked;
    /*console.log(currentChecked);*/
    if (currentChecked == true) {
      currentRow.classList.add("rowCheck");
    } else {
      currentRow.classList.remove("rowCheck");
    }
  }
}

function scrollToTop() {
  window.scrollTo(0, 0);
}


function updateMatchup() {

  divBonus.style.visibility = "visible";
  
  let mainHeroBtnId = this.getAttribute("id");
  let mainHeroId = mainHeroBtnId.replace(/^btn/, "");

  let BestAlliesGold = dataHH[mainHeroId]['BestAlliesGold'].split(", ");
  let BestAlliesSilver = dataHH[mainHeroId]['BestAlliesSilver'].split(", ");
  let BestAlliesBronze = dataHH[mainHeroId]['BestAlliesBronze'].split(", ");
  let BestCountersGold= dataHH[mainHeroId]['BestCountersGold'].split(", ");
  let BestCountersSilver= dataHH[mainHeroId]['BestCountersSilver'].split(", ");
  let BestCountersBronze = dataHH[mainHeroId]['BestCountersBronze'].split(", ");
  let sixBigArrays = [BestAlliesGold, BestAlliesSilver, BestAlliesBronze, BestCountersGold, BestCountersSilver, BestCountersBronze];
  console.log(BestAlliesGold);
  console.log(BestAlliesSilver);
  console.log(BestAlliesBronze);
  console.log(BestCountersGold);
  console.log(BestCountersSilver);
  console.log(BestCountersBronze);
  
  let divMainHero = document.getElementById('divMainHero');
  let divAllies = document.getElementById('divAllies');
  let divCounters = document.getElementById('divCounters');
  divMainHero.innerHTML= data[mainHeroId]['HeroName'];
  divAllies.innerHTML = "";
  divCounters.innerHTML = "";
  
  if (BestAlliesGold[0]) {
  for (const j in BestAlliesGold ) {
    let currentSet = document.createElement("div");
    currentSet.classList.add("divHeroSmallSet");
    currentSet.innerHTML = "<p>🥇</p><img class='lvlGold' src='heroImages/"+ BestAlliesGold[j] + ".png'>";
    divAllies.appendChild(currentSet);
  }}
  if (BestAlliesSilver[0]) {
  for (const j in BestAlliesSilver ) {
    let currentSet = document.createElement("div");
    currentSet.classList.add("divHeroSmallSet");
    currentSet.innerHTML = "<p>🥈</p><img class='lvlSilver' src='heroImages/"+ BestAlliesSilver[j] + ".png'>";
    divAllies.appendChild(currentSet);
  }}
  if (BestAlliesBronze[0]) {
  for (const j in BestAlliesBronze ) {
    let currentSet = document.createElement("div");
    currentSet.classList.add("divHeroSmallSet");
    currentSet.innerHTML = "<p>🥉</p><img class='lvlBronze' src='heroImages/"+ BestAlliesBronze[j] + ".png'>";
    divAllies.appendChild(currentSet);
  }}
  if (BestCountersGold[0]) {
  for (const j in BestCountersGold ) {
    let currentSet = document.createElement("div");
    currentSet.classList.add("divHeroSmallSet");
    currentSet.innerHTML = "<p>🥇</p><img class='lvlGold' src='heroImages/"+ BestCountersGold[j] + ".png'>";
    divCounters.appendChild(currentSet);
  }}
  if (BestCountersSilver[0]) {
  for (const j in BestCountersSilver ) {
    let currentSet = document.createElement("div");
    currentSet.classList.add("divHeroSmallSet");
    currentSet.innerHTML = "<p>🥈</p><img class='lvlSilver' src='heroImages/"+ BestCountersSilver[j] + ".png'>";
    divCounters.appendChild(currentSet);
    }}
  if (BestCountersBronze[0]) {
  for (const j in BestCountersBronze ) {
    let currentSet = document.createElement("div");
    currentSet.classList.add("divHeroSmallSet");
    currentSet.innerHTML = "<p>🥉</p><img class='lvlBronze' src='heroImages/"+ BestCountersBronze[j] + ".png'>";
    divCounters.appendChild(currentSet);
    }}
}



window.onload = function(){
  makeRows();
  updatePoint();
  applyTable();
  sortTable();
};

btnClear.addEventListener("click", function() {
  location.reload();
});

sltMap.addEventListener("change", function() {
  updatePoint();
  applyTable();
  sortTable();
  
  /*
document.getElementById("sltDifficulty").value = 5;
  cbxRoleTank.checked = true;
  cbxRoleBruiser.checked = true;
  cbxRoleMelee.checked = true;
  cbxRoleRanged.checked = true;
  cbxRoleHealer.checked = true;
  cbxRoleSupport.checked = true;
  */
});


rgRatio.addEventListener("change", function() {
  updatePoint();
  applyTable();
  sortTable();
});

rgRatio2.addEventListener("change", function() {
  updatePoint();
  applyTable();
  sortTable();
});



sltDifficulty.addEventListener("change", hideSome);

cbxRoleTank.addEventListener("change", hideSome);
cbxRoleBruiser.addEventListener("change", hideSome);
cbxRoleMelee.addEventListener("change", hideSome);
cbxRoleRanged.addEventListener("change", hideSome);
cbxRoleHealer.addEventListener("change", hideSome);
cbxRoleSupport.addEventListener("change", hideSome);

btnScroll.addEventListener("click", scrollToTop);
btnCloseBonus.addEventListener("click", function(){divBonus.style.visibility="hidden";});