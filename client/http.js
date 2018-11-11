export class HttpClient {

	get(url, success, failure) {
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
			if (this.readyState == 4) {
				if (this.status == 200) {
					success(this.responseText);
				}
				else {
					failure(this);
				}
			}
		};
		xhttp.open("GET", url, true);
		xhttp.send();
	}

	post(url, body, success, failure) {
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
			if (this.readyState == 4) {
				if (this.status == 200) {
					success();
				}
				else {
					failure(this);
				}
			}
		};
		xhttp.open("POST", url, true);
		xhttp.send(body);
	}
}
