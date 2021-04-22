import store from "./redux/store";
import {
  newMessage,
  isConnected,
  getAllClients,
  clearSketch,
  updateStart,
  setCurrentPlayer,
  gameStatus,
} from "./redux/actions";

/** CLIENT CONFIGURATION - connect to the server */
const socketIOClient = require("socket.io-client");

// When deployed, connect to the hosted server, otherwise connect to local server
// Localhost port must match server
let host =
  process.env.NODE_ENV === "production"
    ? "reactpictionary.herokuapp.com"
    : "localhost:4002";
let socket = socketIOClient.connect(host, { secure: true });
// Checks which host we're connected to (for troubleshooting);
console.log("connected to " + host);

socket.on("notification", (msg) => {
  console.log(msg);
});

socket.on("all messages", (msg) => {
  console.log(msg);
  store.dispatch(newMessage(msg));
});

socket.on("chat joined", () => {
  store.dispatch(isConnected());
});

// socket.on("game is in progress", (data) => {
//   console.log("game is in progress", data);
//   store.dispatch(gameStatus(data));
// });

socket.on("clients", (clients) => {
  store.dispatch(getAllClients(clients));
});

socket.on("game", (s) => {
  store.dispatch(updateStart(s));
});

socket.on("clear", (p) => {
  store.dispatch(clearSketch(p));
});

// This process will allow different clients to have duplicate usernames! A real
// application should first check with the server to make sure the client's
// username is unique.
export const joinChat = (username) => {
  socket.emit("join", username);
};

export const sendMessage = (msg) => {
  socket.emit("new message", msg);
};

export const sendRightAnswerMsg = (msg) => {
  socket.emit("right answer", msg);
};
// export const start = (status) => {
//   socket.emit("game", status);
// };

export const clear = (p) => {
  socket.emit("clear", p);
};

export const end = () => {
  socket.emit("game", "end");
};

export const startTheGame = (index, callbackFunc) => {
  console.log("client", index);
  socket.off("current player"); // Prevent duplicates
  socket.emit("start timer", index);
  socket.on("current player", (time) => {
    console.log("current player", time);
    callbackFunc(time);
  });
  // socket.on("time", (time) => {
  //   callbackFunc2(time);
  // });
};

export const startTheTimer = (time, callbackFunc) => {
  socket.off("time"); // Prevent duplicates
  socket.emit("start timer time", time);

  socket.on("time", (time) => {
    callbackFunc(time);
  });
};
