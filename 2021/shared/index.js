const fs = require('fs');

module.exports = {
	getFileContents: (filePath) => {
		return fs.readFileSync(filePath, 'utf8');
	}
}
