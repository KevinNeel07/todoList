const http = require('http');
const fs = require('fs');

let login = fs.readFileSync('../frontend/index.html', 'utf-8');
let signUp = fs.readFileSync('../frontend/signUp/signUp.html', 'utf-8');

const server = http.createServer((req,res)=>{
    res.writeHead(200, {'Content-type': 'text/html'});
    if(req.url == '/'){
        res.end(login)
    }
    if(req.url == '/signUp'){
        console.log('working');
        res.end(signUp)
    }
});

server.listen(8000, ()=>{
    console.log('server is runnig');
})