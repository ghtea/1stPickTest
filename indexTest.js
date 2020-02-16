/* console.log(dataOriginal[1]['HeroID']);
var test = dataOriginal[1]['BanRate']; */

/* almost constant variables, initialization, functions*/
var URLfront = "https://www.heroesprofile.com/Global/Matchups/?hero=";
var URLback =
  "&timeframe_type=minor&timeframe=2.49.2.77981,2.49.1.77692,2.49.1.77662&game_type=sl";

const numHero = 88;

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

const numSizeWin = 4.6;
const numSizePlay = 0.3;
const stdWinRate = 3.6;
const stdGame = 19;

var roleInitial;
var roleColor;

function compaireFunc(key) {
  return function(a, b) {
    return b[key] - a[key];
  };
}



function showAll() {
  let currentMap = document.getElementById("sltMap").value;
  let currentDifficulty = document.getElementById("sltDifficulty").value;

  
  let colWinRate = currentMap + ' win_rate'
  let colPlayRate = currentMap + ' popularity'
  let colBanRate = currentMap + ' ban_rate'

  
  var rows = document.getElementsByClassName("rowTableMain");

  /* about Ratio */
  var currentRatio = document.getElementById("rgRatio").value;
  
  
  
  for (const [key, value] of Object.entries(data)) {
    value['Point'] =
    (100 - currentRatio) * (value[colWinRate]/ 50 / stdWinRate) +
      currentRatio *
        ((((value[colBanRate] + value[colPlayRate])/ 100) * numHero) /
          16 /
          stdGame);
  }

  dataList = Object.values(data)
  dataListSorted = dataList.sort(compaireFunc("Point"));
  console.log(dataListSorted)
 
  
  if (rows.length > 0) {
    for (var i = 0; i < numHero; i++) {
      tbl.deleteRow(1);
    }
  }

  for (var i = 0; i < numHero; i++) {
    var row = tbl.insertRow(i + 1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);

    row.classList.add("rowTableMain");
    /*row.classList.add("rowShow");*/
    row.setAttribute("id", "rowHeroID" + dataListSorted[i]["HeroID"]);
    row.classList.add("rowDifficulty" + dataListSorted[i]["Difficulty"]);
    row.classList.add("rowRole" + dataListSorted[i]["Role"]);

    cell1.innerHTML =
      "<a target='_blank' rel='noopener noreferrer' href=" +
      URLfront +
      dataListSorted[i]["URLID"] +
      URLback +
      "> <img src=" +
      "heroImages/" +
      dataListSorted[i]["HeroID"] +
      ".png" +
      ">" +
      "</a>";
    
    
    switch (dataListSorted[i]["Role"]) {
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
    rectRole.setAttribute("class", "role" + dataListSorted[i]["Role"]);
    rectRole.innerHTML = roleInitial;
    divRoleTd.appendChild(rectRole);
    cell2.appendChild(divRoleTd);

    for (var k = 0; k < parseInt(dataListSorted[i]["Difficulty"]); k++) {
      var rectDifficulty = [];
      rectDifficulty[k] = document.createElement("div");
      cell3.appendChild(rectDifficulty[k]);
    }
    cell3.setAttribute("class", "difficulty" + dataListSorted[i]["Difficulty"]);

    cell4.setAttribute("class", "cellMain");
    var rectMain = document.createElement("div");
    var rectMainWidth = (dataListSorted[i][colWinRate] - 35) * numSizeWin;
    var rectMainHeight =
      (dataListSorted[i][colPlayRate]+ dataListSorted[i][colBanRate]) * numSizePlay;

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
    var txtGames = (100 / dataListSorted[i][colPlayRate]).toFixed(1);
    var txtWinRate = dataListSorted[i][colWinRate].toFixed(1);
    divText.innerHTML = txtWinRate + "%" + "<br> 1 in " + txtGames + "G";
    divText.setAttribute("class", "divRectText");
    cell4.appendChild(divText);

    /* var txtPoint = dataSorted[i]["Point"].toFixed(1); */

    cell5.innerHTML = "<input type='checkbox' class = 'cbxPerHero'>";
  }

  cbxPerHeroList = document.getElementsByClassName("cbxPerHero");
  for (var i = 0; i < numHero; i++) {
    cbxPerHeroList[i].addEventListener("change", checkSome);
  }
}

function hideSome() {
  let currentMap = document.getElementById("sltMap").value;
  let currentDifficulty = document.getElementById("sltDifficulty").value;
  
  let colWinRate = currentMap + ' win_rate'
  let colPlayRate = currentMap + ' popularity'
  let colBanRate = currentMap + ' ban_rate'
  
  var rows = document.getElementsByClassName("rowTableMain");



  var currentRoleCheckedTank = cbxRoleTank.checked;
  var currentRoleCheckedBruiser = cbxRoleBruiser.checked;
  var currentRoleCheckedMelee = cbxRoleMelee.checked;
  var currentRoleCheckedRanged = cbxRoleRanged.checked;
  var currentRoleCheckedHealer = cbxRoleHealer.checked;
  var currentRoleCheckedSupport = cbxRoleSupport.checked;

  /* about Ratio */
  var currentRatio = document.getElementById("rgRatio").value;
  
  for (const [key, value] of Object.entries(data)) {
    value['Point'] =
    (100 - currentRatio) * (value[colWinRate]/ 50 / stdWinRate) +
      currentRatio *
        ((((value[colBanRate] + value[colPlayRate])/ 100) * numHero) /
          16 /
          stdGame);
  }
  dataList = Object.values(data)
  dataListSorted = dataList.sort(compaireFunc("Point"));
 
 
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
  for (var rowNum = 1; rowNum <= numHero; rowNum++) {
    var currentRow = document.querySelectorAll("#tableMain tr")[rowNum];
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
  for (var rowNum = 0; rowNum < numHero; rowNum++) {
    var currentRow = document.querySelectorAll("#tableMain tbody tr")[
      rowNum + 1
    ];
    var currentChecked = document.querySelectorAll(
      "#tableMain tbody tr .cbxPerHero"
    )[rowNum].checked;
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

window.onload = showAll();
sltMap.addEventListener("change", function() {
  showAll();
  hideSome();
  checkSome();
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
btnClear.addEventListener("click", function() {
  location.reload();
});

rgRatio.addEventListener("change", function() {
  showAll();
  hideSome();
  checkSome();
});
sltDifficulty.addEventListener("change", hideSome);

cbxRoleTank.addEventListener("change", hideSome);
cbxRoleBruiser.addEventListener("change", hideSome);
cbxRoleMelee.addEventListener("change", hideSome);
cbxRoleRanged.addEventListener("change", hideSome);
cbxRoleHealer.addEventListener("change", hideSome);
cbxRoleSupport.addEventListener("change", hideSome);

btnScroll.addEventListener("click", scrollToTop);
