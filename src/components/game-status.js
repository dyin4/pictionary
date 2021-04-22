import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import JoinChat from "../components/join-chat";
import Canvas from "../components/canvas/canvas";
import Messages from "../components/messages";
import Form from "../components/form";
import { startGame, setStart, updateStart } from "../redux/actions";
import PlayerList from "../components/player-list";
import Timer from "../components/timer";
import Spinner from "../components/spinner";
import Word from "../components/word";

const GameStatus = () => {
  const user = useSelector((state) => state.user);
  const start = useSelector((state) => state.start);
  const current_player = useSelector((state) => state.current_player);
  const clients = useSelector((state) => state.clients);
  const dispatch = useDispatch();

  return (
    <>
      <h1>Hi {user}</h1>
      {/*Current who is drawing, TODO: styling*/}
      <h1>
        Current Player:{" "}
        {current_player !== null && start === "start"
          ? `${current_player} is drawing`
          : ""}
      </h1>
      {/*Game over display*/}
      {start === "end" && <h1>Game Over</h1>}
    </>
  );
};

export default GameStatus;
