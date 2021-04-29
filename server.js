/** SERVER CONFIGURATION */
const { start } = require("@popperjs/core");
const express = require("express");
const app = express();
const server = require("http").Server(app);

const deploy = "reactpictionary.herokuapp.com";
// The origin is used by CORS
const origin =
  process.env.NODE_ENV === "production" ? deploy : "http://localhost:3000";
const io = require("socket.io")(server, {
  cors: {
    origin: origin,
    methods: ["GET", "POST"],
  },
});
const path = require("path");
const { GAME_STATUS } = require("./src/redux/stateConstants");

// Choose a port, default is 4002 (could be almost anything)
const PORT = process.env.PORT || 4002;

// When on Heroku, serve the UI from the build folder
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "build")));
  app.get("*", (req, res) => {
    res.sendfile(path.join((__dirname = "build/index.html")));
  });
}

// When on local host, server from the public folder.
// Rule will not be written if production conditional has executed
app.get("*", (req, res) => {
  app.sendFile(path.join(__dirname + "public/index.html"));
});

// Listen for client connections
server.listen(PORT, () => console.log(`Listening on ${PORT}`));

let messages = [];

// Object to map client ids to their usernames
const clients = {};

let players = [];
let starts = 0;
let status = "end";

const processMessage = (msg) => {
  messages.push(msg);
  io.sockets.emit("all messages", messages);
};

io.on("connection", (client) => {
  client.emit("notification", "Server says hello " + client.id);
  if (status === "start") {
    io.sockets.emit("game", "start");
  }

  client.on("join", (username) => {
    client.emit("chat joined");

    clients[client.id] = username;
    players.push(username);
    io.sockets.emit("clients", players);
    processMessage(username + " has joined the chat");
  });

  client.on("new message", (msg) => {
    processMessage(clients[client.id] + " says: " + msg);
  });

  client.on("right answer", (msg) => {
    processMessage(
      clients[client.id] + " got the right answer " + msg + " !!!!!!"
    );
  });

  client.on("disconnect", () => {
    if (clients.hasOwnProperty(client.id)) {
      processMessage(clients[client.id] + " has left the chat");
      console.log("Disconnected", clients[client.id]);
      var arr = players.filter((p) => {
        console.log(p);
        if (p.toString() !== clients[client.id].toString()) return true;
        else {
          return false;
        }
      });
      players = arr;

      io.sockets.emit("clients", players);
      if (players.length === 1) {
        io.sockets.emit("game", "end");
        starts = 0;
        clearInterval(interval);
        clearInterval(interval2);
      }
    }
  });
  client.on("DRAWING", (data) => {
    //Let every user know of the current drawing data, except current user who is drawing
    client.broadcast.emit("DRAWING", data);
  });

  client.on("clear", (p) => {
    //Let every user know of the current drawing data, except current user who is drawing
    io.sockets.emit("clear", p);
  });

  client.on("game", (p) => {
    //Let every user know of the current drawing data, except current user who is drawing
    if (p === "end") {
      starts = 0;
      clearInterval(interval);
      clearInterval(interval2);
    }
    status = p;
    io.sockets.emit("game", p);
  });

  // client.on("game", (p) => {
  //   //Let every user know of the current drawing data, except current user who is drawing
  //   io.sockets.emit("game", p);
  // });

  let interval;
  let interval2;

  client.on("start timer", (time) => {
    console.log("player list", players);
    if (time === 0) {
      starts++;
      console.log(starts);
    }
    //io.sockets.emit("game", "wait");
    //io.sockets.emit("game", "wait");
    if (starts === players.length || time > 0) {
      io.sockets.emit("game", "start");
      status = "start";
      console.log("current player", players[time]);
      console.log("current player time", time);

      io.sockets.emit("current player", players[time]);
      // Stop any timers that are currently running
      clearInterval(interval);
      interval = setInterval(() => {
        if (time >= players.length - 1) {
          starts = 0;
          clearInterval(interval);
          clearInterval(interval2);
          status = "end";
          io.sockets.emit("game", "end");
        }
        time++;
        io.sockets.emit("current player", players[time]);
      }, 30000);
    }

    // client.emit("time", time);
    // //Stop any timers that are currently running
    // clearInterval(interval2);
    // let t = 5;

    // interval2 = setInterval(() => {
    //   t--;
    //   client.emit("time", t);
    //   if (t === 0) {
    //     clearInterval(interval2);
    //   }
    // }, 1000);
  });

  client.on("start timer time", (time) => {
    if (starts === players.length) {
      io.sockets.emit("time", time);
      // Stop any timers that are currently running
      clearInterval(interval2);

      interval2 = setInterval(() => {
        time--;
        io.sockets.emit("time", time);
        if (time === 0) {
          clearInterval(interval2);
          time = 30;
        }
      }, 1000);
    }
  });
});
