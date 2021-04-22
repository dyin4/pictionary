import {
  NEW_MESSAGE,
  CONNECTED,
  CLEAR,
  USER,
  CLIENTS,
  CURRENT_PLAYER,
  NEW_TIME,
  GAME_START,
  SET_WORD,
  GAME_STATUS,
} from "./actionConstants";
import {
  clear,
  joinChat,
  sendMessage,
  startTheGame,
  startTheTimer,
  start,
  end,
  sendRightAnswerMsg,
} from "../client";

const TIMER = 30;

// Action creator functions - use async actions to communicate with server
// Replaces the direct call to joinChat in App
export const connectToChat = (username) => {
  return (dispatch) => joinChat(username);
};

// Replaces the direct call to sendMessage in Form
export const sendToChat = (msg) => {
  return (dispatch) => sendMessage(msg);
};

export const sendRightAnswer = (msg) => {
  return (dispatch) => sendRightAnswerMsg(msg);
};

export const isConnected = () => ({ type: CONNECTED });

export const clearDraw = (p) => {
  return (dispatch) => clear(p);
};

// export const getCurrentPlayer = () => {
//   return (dispatch) => getPlayer();
// };

export const clearSketch = (p) => ({
  type: CLEAR,
  payload: {
    p,
  },
});

// export const gameStatus = (status) => ({
//   type: GAME_STATUS,
//   payload: {
//     status,
//   },
// });

export const endGame = () => {
  return (dispatch) => end();
};

export const storeUser = (user) => ({
  type: USER,
  payload: {
    user,
  },
});

export const setCurrentPlayer = (user) => ({
  type: CURRENT_PLAYER,
  payload: {
    user,
  },
});

export const setWord = (word) => ({
  type: SET_WORD,
  payload: {
    word,
  },
});

export const newMessage = (messages) => ({
  type: NEW_MESSAGE,
  payload: {
    messages,
  },
});

export const getAllClients = (clients) => ({
  type: CLIENTS,
  payload: {
    clients,
  },
});

export const startGame = (index) => {
  console.log("clicked start", index);
  return (dispatch) => {
    startTheGame(index, (result) => {
      dispatch(setCurrentPlayer(result));
    });

    startTheTimer(TIMER, (result) => {
      dispatch(newTime(result));
    });
  };
};

const newTime = (time) => ({
  type: NEW_TIME,
  payload: {
    time,
  },
});

export const startTimer = (time) => {
  return (dispatch) => {
    startTheTimer(time, (result) => {
      dispatch(newTime(result));
    });
  };
};

// export const setStart = (status) => {
//   return (dispatch) => start(status);
// };

export const updateStart = (start) => ({
  type: GAME_START,
  payload: {
    start,
  },
});
