const http = require('http')
const fs = require('fs')

http.createServer(function (req, res) {
	switch (req.url) {
		case '/':
			renderPath('index.html', 200)
		break;
		case '/about':
			renderPath('about.html', 200)
		break;
		case '/contact':
			renderPath('contact.html', 200)
		break;
		default:
			renderPath('404.html', 404)
		break;
	}

	function renderPath(file, status) {
		fs.readFile(file, function(err, data) {
			res.writeHead(status, {'Content-Type': 'text/html'});
			res.write(data);
			return res.end();
		})
	}
}).listen(8080)
