const http = require('http');
const fs = require('fs');
const {parse} = require('querystring')

let login = fs.readFileSync('../frontend/index.html', 'utf-8');
let signUp = fs.readFileSync('../frontend/signUp/signUp.html', 'utf-8');

const server = http.createServer((req,res)=>{
    res.writeHead(200, {'Content-type': 'text/html'});
    if(req.url == '/'){
        res.end(login)
        if(req.method === 'POST'){
            let body;
           req.on('data', chunk =>{
            body = chunk.toString();
            console.log(body);
        })
        req.on('end', ()=>{
            let data = parse(body)
            console.log(data.email);
           })
        }
    }
    if(req.url == '/signUp'){
        console.log('working');
        res.end(signUp)
    }
});

server.listen(8000, ()=>{
    console.log('server is runnig');
})