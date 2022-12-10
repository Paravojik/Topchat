let app = require('express')();
let http = require('http').createServer(app);
let PORT = 80;
let io =  require('socket.io')(http);
let userCount=0
app.get('/', function(req, res){
    res.sendFile(__dirname+'/index.html')
})


io.on('connection', function(socket){
    console.log('new user connected');
    userCount++
    io.emit('getStatus',userCount)
    socket.on('chat message',function(msg){
        io.emit('chat message', msg)
    })
    socket.on('new user',function(user){
        io.emit('new user', user)
        console.log('Msg sended by: ',user)
    })
    socket.on('disconnect',function(){
        console.log('user disconect')
        userCount--
        io.emit('getStatus',userCount)
    })
})

http.listen(PORT, function(){
    console.log(`server listening on port: ${PORT}`);
});