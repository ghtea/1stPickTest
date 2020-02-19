function readJson(url) {
  var request = new XMLHttpRequest();
  request.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        return JSON.parse(this.responseText);
    }
  };
  request.open("GET", url, true);
  request.send();
}