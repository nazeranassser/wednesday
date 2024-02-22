var express= require('express')
var app=express()

var fs= require('fs')

app.get('/', function(req,res)
{
    res.send("start my server")
})

app.get('/form', function(req,res)
{
    res.sendFile(__dirname+'/userform.html')
})

app.get('/listUsers', function(req,res)
{
    var data= fs.readFileSync(__dirname+"/user.json") //as byte
    res.send(String(data))
})

app.get('/user/:id', function(req,res)
{

    var arr =["1", "2 ", "3"]
    if (arr.includes(String(req.params.id)))
    {
    var data= fs.readFileSync(__dirname+"/user.json") //as byte
    data= JSON.parse(String(data))
    console.log(data)
    var user = data['user'+req.params.id]
    console.log(user)

    res.send(user)
    }
    else
    {
      res.send("user id error")
    }
   
})


const bodyParser = require('body-parser');

// Middleware for parsing url-encoded data
const urlEncoded = bodyParser.urlencoded({ extended: false });

// Delete User Endpoint
app.delete('/deleteUser/:id', function(req, res) {
    var data = fs.readFileSync(__dirname + '/user.json');
    data = JSON.parse(data);
    delete data['user' + req.params.id]
    res.send(data);
});

// Add User Endpoint
app.post('/addUser', urlEncoded, function(req, res) {
    var newUser = {
        name: req.body.name || '',
        password: req.body.password || '',
        profession: req.body.profession || ''
    };
    var data = fs.readFileSync(__dirname + '/user.json');
    data = JSON.parse(data);
    var userId = Object.keys(data).length + 1;
    data['user' + userId] = newUser;
    fs.writeFileSync(__dirname + '/user.json', JSON.stringify(data, null, 2));
    res.send(data);
});


var server= app.listen(7000, function()
{
    var host = server.address().address
    var port= server.address().port
})