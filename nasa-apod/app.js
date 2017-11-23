var API_KEY = 'h8OxdGuyii1zJEaow0TLOotyipLQRz8SHyRKAEef';

var url = "https://api.nasa.gov/planetary/apod?api_key=" + API_KEY + "&date=";

var datePicker = document.getElementById('date-picker');

datePicker.max = getTodayDate();

datePicker.value = getTodayDate();

var count = 1;

makeApiRequest(url + getTodayDate(), function(response) {
	getResponse(response);
});

datePicker.addEventListener('input', function(e) {
	document.getElementById("date-picker").disabled = true;
	document.getElementById("progress").style.visibility = "visible";
	removeImage = document.getElementById("image" + count);
	removeImage.parentNode.removeChild(removeImage);
	document.getElementById("details").style.visibility = "hidden";
	var date = datePicker.value;
	count++;
	makeApiRequest(url + date, function(response) {
		getResponse(response);
		document.getElementById("progress").style.visibility = "hidden";
		document.getElementById("date-picker").disabled = false;
		document.getElementById("details").style.visibility = "visible";
	});
});

function getResponse(response) {
	var title = response.title;
	var picture = response.url;
	var explanation = response.explanation;
	document.getElementById("title").innerHTML = title;
	var image = document.createElement("img");
	image.src = picture;
	image.id = "image" + count;
	document.getElementById("picture").appendChild(image);
	document.getElementById("explanation").innerHTML = explanation;
}

function makeApiRequest(url, callback) {
    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function() {
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
            if (httpRequest.status === 200) {
                var responseText = httpRequest.responseText;          
                var responseJson = JSON.parse(responseText);
                if (callback) {
                	callback(responseJson); 
                }
            } else {
                document.getElementById("error").innerHTML = "Unable to download data for current date.";
            }
        }
    };
    httpRequest.open('GET', url, true);
    httpRequest.send();
}

function getTodayDate() {
    var now = new Date();
    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    var day = now.getDate();
    return year + '-' + month + '-' + day;
}
