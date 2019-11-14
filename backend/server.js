const  http = require('http');
const app = require('./app');

// the following lines of code i don't understand fully however i got it from my teacher, the code makes the server better
const normalizePort = val =>{
    const port = parseInt(val, 10);//this line probably converts any given port to number

    if(isNaN(port)){//this line checks the port if its a number
        return val;
    }
    if(port >= 0){//this line checks the port if its greater than or equal to 0
        return port;
    }
    return false;
};

const port = normalizePort(process.env.PORT || 3000);// this line checks the validity of the port and sets the port if it passes
app.set('port',port); // this line sets the port after the checks by the function

const errorHandler = error =>{
    if(error.syscall !== 'listen'){
        throw error;
    }
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
    switch(error.code){
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE' :
            console.error(bind + ' is already in use.');
            process.exit(1);
            break;
        default:
            throw error;
    }
};

const server = http.createServer(app);

server.on('error',errorHandler);
server.on('listening',() =>{
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
    console.log('Listening on ' + bind);
});
app.set('port',process.env.PORT || 3000);


server.listen(process.env.PORT || 3000);