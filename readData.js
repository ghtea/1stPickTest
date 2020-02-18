function readData (dataUrl) {
    readFile(dataUrl, function(jsonObj, error){
        if(error){
         console.log("There is a problem in readData");
        }
        else {
            return jsonObj;
        }
    });
};

function readFile(fileUrl, callback) {
    var req = new XMLHttpRequest();
    req.onreadystatechange = function() {
        if(req.readyState ==4) {
            if(req.status == 200) {
                callback(req.response, false/*no error*/);
            } else {
                callback(null, true/* error*/);
            }
        }
    }
    req.open("GET", fileUrl, true);
    req.responseType = "json";
    req.send(null);
}

