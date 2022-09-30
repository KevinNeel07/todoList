const http = require('http');
const fs = require('fs');
const bcrypt = require('bcryptjs')
const { parse } = require('querystring')

const login = fs.readFileSync('../frontend/index.html', 'utf-8');
const signUp = fs.readFileSync('../frontend/signUp/signUp.html', 'utf-8');
const todoList = fs.readFileSync('../frontend/todList/todolist.html', 'utf-8');

require('./db_Conn/db_conn');

const User = require('./model/User');

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    let url = req.url
    if(url == '/todolist.css'){ //req.url has the pathname, check if it conatins '.css'

        fs.readFile('../frontend/todList/todolist.css', function (err, data) {
          if (err) console.log(err);
          res.writeHead(200, {'Content-Type': 'text/css'});
          res.write(data);
          res.end();
        });
  
      }
    if (url == '/') {
        if (req.method === 'POST') {
            let body;
            req.on('data', chunk => {
                body = chunk.toString();
                console.log(body);
            })
            req.on('end', async () => {
                let data = parse(body);
                let user = await User.findOne({ email: data.email }).lean();
                if (!user) {
                    console.log('invalid');
                    return res.end("<h1>Invalid Credentials<h1/>")
                } else {
                    let comparePassword = await bcrypt.compare(data.password, user.password);
                    if (!comparePassword) {
                        console.log('wod');
                        res.statusCode = 409;
                        return res.end('<h1>Invalid Credentials</h1>')
                    }else{
                        return res.end(todoList)
                    }
                }
            })
        }else{
            res.end(login)
        }
    }
    else if (url == '/signUp') {
        if (req.method === 'POST') {
            let body; 
            req.on('data', chunk => {
                body = chunk.toString();
            })
            req.on('end', async () => {
                let data = parse(body)
                console.log(data.email);

                let user = await User.findOne({ email: data.email }).lean();
                if (user) {
                    console.log('user exist');
                    res.statusCode = 409;
                    return res.end('<h1>email already exist!</h1>')
                } else {
                    let hashedPassword = await bcrypt.hash(data.password, 10);
                    console.log(hashedPassword);
                    let saveUser = await User.create({ name: data.name, email: data.email, password: hashedPassword });
                    saveUser.save();
                    return res.writeHead(201, { Location: '/' }).end();
                }
            })
        } else {
            res.end(signUp)

        }
    }
});

server.listen(8000, () => {
    console.log('server is runnig');
})