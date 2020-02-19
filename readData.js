function readJson(url) {
  var request = new XMLHttpRequest();
  request.onreadystatechange = function() {
    if (request.readyState == 4 && request.status == 200) {
        return JSON.parse(request.responseText);
    }
    else {
      console.log("error in readJson");
    }
  };
  request.open("GET", url, true);
  request.send();
}