const fs = require("fs");
const http = require("http");

const server = http.creareServer((req, res) => {
  if (req.url == "./Apis/index.html" && req.method === "POST") {
  } else if (req.url == "/inde.html" && req.method === "GET") {
    var fileName = "./index.html";
    fs.readFile(fileName, function (err, data) {
      if (err) {
        res.writeHead(404, { "Content-Type": "text/html" });
        return res.end();
      } else {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write(data);
        return res.end();
      }
    });
  }
});

server.listen(9090);
console.log("dsfadkgfakdgnksdngkdg");
