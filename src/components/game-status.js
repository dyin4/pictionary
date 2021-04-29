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
      <div className="notice-user"> Hello, {user} </div>
      <div className="notice-player">
        {current_player !== null && start === "start"
          ? `Player ${current_player} is drawing`
          : ""}
      </div>
      {start === "end" && <div className="game-over">GAME OVER</div>}
    </>
  );
};

export default GameStatus;
