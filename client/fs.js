import { HttpClient } from './http.js';

export class FileSystem {

	constructor() {
		//super();  ??
		this.http = new HttpClient();
	}

	search(filter, success, failure) {
		this.http.get('api/folders?name=' + filter, success, failure);
	}

	load(filename, success, failure) {
		this.http.get('api/getfile?name=' + filename, success, failure);
	}

	save(filename, contents, success, failure) {
		this.http.post('api/putfile?name=' + filename, contents, success, failure);
	}
}
