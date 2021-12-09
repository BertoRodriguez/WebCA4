const express = require("express");
const socket = require("socket.io");

// App setup
const PORT = 5000;
const app = express();
const server = app.listen(PORT, function () {
  console.log(`Listening on port ${PORT}`);

});

// Static files
app.use(express.static("public"));

// Socket setup
const io = socket(server);

//we use a set to store users, sets objects are for unique values of any type
const activeUsers = new Set();

io.on("connection", function (socket) {
  console.log("Made socket connection");

  socket.on("new user", function (data) {
    socket.userId = data;
    activeUsers.add(data);
    //... is the the spread operator, adds to the set while retaining what was in there already
    io.emit("new user", [...activeUsers]);
    // tell all users apart from one that just joined to display a message
    socket.broadcast.emit("new user message", data);
  });

  socket.on("disconnect", function () {
      activeUsers.delete(socket.userId);
      io.emit("user disconnected", socket.userId);
      socket.broadcast.emit("user disconnect message", socket.userId);
    });

    socket.on("chat message", function (data) {
      io.emit("chat message", data);
  });
    
    /* taken and adapted from https://rsrohansingh10.medium.com/add-typing-in-your-chat-application-using-socket-io-421c12d8859e
       but doesn't work
    socket.on("typing", (data)=>{
      if(data.typing==true){
         io.emit("display", data);
      }
      else{
         io.emit("display", data);
      }
    });
    */

});