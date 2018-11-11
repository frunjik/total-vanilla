const fs = require('fs');
const rootfolder = '../';

exports.install = function() {
	F.route('/api/folders', getFolders, ['get', 'cors']);
	F.route('/api/getfile', getFile, ['get', 'cors']);
	F.route('/api/putfile', putFile, ['post', 'cors', 'raw']);
};

function readFile(name, cb) {
	fs.readFile(name, 'utf8', cb);
}

function writeFile(name, data, cb) {
	fs.writeFile(name, data, 'utf8', cb);
}

function log(s) {
	console.log(s);
}

function getFolders() {
	var self = this;
	var pathname = self.req.query.name;

	U.ls(rootfolder, 
        // result
		function(files, folders) {
			self.res.json({
                files: files.map(name => name.replace(/\\/g, '/').replace(rootfolder, '')), 
                folders: folders.filter(f => f.indexOf(pathname) !== -1)
            });
		},
        // filter
		function(filename, isDirectory) {
			if(isDirectory) {
				return (!filename.endsWith('.git') && filename.indexOf('node_modules') === -1);
			}
            // return U.getName(filename).indexOf(pathname) !== -1;
            return filename.indexOf(pathname) !== -1;
		}
	);
}

function getFile() {
	var self = this;
	var filename = rootfolder + self.req.query.name;

	log('GET: ' + filename);
	
	readFile(filename, function(err, data) {
		if(err) {
			self.res.throw400(err);
			log(err.message);
		}
		else
			self.res.send(data);
	});
}

function putFile() {
	var self = this;
	var filename = rootfolder + self.req.query.name;
	
	log('PUT: ' + filename);

	writeFile(filename, self.req.body, function(err) {
		if(err) {
			self.res.throw400(err);
			log(err.message);
		}
		else
			self.res.send('');
	});
}
