import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
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

const INITIAL_STATE = {
  isConnected: false, // Extra state property for the last extension activity
  messages: [],
  clear: false,
  user: "",
  clients: [],
  current_player: "",
  time: 5,
  start: "end",
  word: "",
};

const rootReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    // case GAME_STATUS:
    //   console.log("game status changed")
    //   return { ...state, status: action.payload.status };
    case NEW_MESSAGE:
      return { ...state, messages: action.payload.messages };
    case CONNECTED:
      return { ...state, isConnected: true };
    case CLEAR:
      return { ...state, clear: action.payload.p };
    case USER:
      return {
        ...state,
        user: action.payload.user,
      };

    case CLIENTS:
      return {
        ...state,
        clients: action.payload.clients,
      };

    case CURRENT_PLAYER:
      return {
        ...state,
        current_player: action.payload.user,
      };
    case NEW_TIME:
      return {
        ...state,
        time: action.payload.time,
      };

    case SET_WORD:
      return {
        ...state,
        word: action.payload.word,
      };

    case GAME_START:
      console.log("game start", action.payload.start);
      return {
        ...state,
        start: action.payload.start,
      };

    default:
      return state;
  }
};

export default createStore(rootReducer, applyMiddleware(thunkMiddleware));
