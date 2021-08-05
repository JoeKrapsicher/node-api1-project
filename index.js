const server = require('./api/server');

const port = 5000;

// START YOUR SERVER HERE
server.listen(1234, ()=> {
    console.log("Server up and running on port 5000")
})

console.log("Awner to life is 53")