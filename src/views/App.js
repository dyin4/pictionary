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
import GameStatus from "../components/game-status";

const PLAYER_NUM = 2;

const App = () => {
  const isConnected = useSelector((state) => state.isConnected);
  const start = useSelector((state) => state.start);
  const [clickStart, setClick] = useState(false);
  const current_player = useSelector((state) => state.current_player);
  const clients = useSelector((state) => state.clients);
  const dispatch = useDispatch();

  /* The following is not needed after the extension activities. JoinChat now
   *  handles connecting to the chat.
   *  const dispatch = useDispatch();
   *  useEffect(() => dispatch(connectToChat()), [dispatch]);
   *
   */

  useEffect(() => {
    if (start == "start") {
      //dispatch(updateStart("wait"));
      setClick(false);
    }
  }, [start, dispatch]);
  console.log("connected", isConnected);
  console.log("start", start);
  console.log("current user", current_player);
  return (
    <div className="container">
      {isConnected ? (
        <>
          {clients.length < PLAYER_NUM && (
            <div>
              <Spinner />
              <h3>wait for other players to joining</h3>
            </div>
          )}
          {clickStart && (
            <div>
              <Spinner />
              <h3>wait for other players to click start</h3>
            </div>
          )}
          <GameStatus />
          <Timer />
          <Word />
          {clients.length >= PLAYER_NUM && start !== "start" && (
            <button
              //disabled={clickStart}
              onClick={() => {
                setClick(true);
                dispatch(startGame(0));
                // dispatch(startTheTimer(5));
                //dispatch(setStart(true));
              }}
            >
              start
            </button>
          )}
          <div className="row">
            <div className="col-sm-7">
              <Canvas />
            </div>
            {/*Chat window design*/}
            <div className="col-sm-5">
              <Messages />
              <Form />
            </div>
          </div>
          <PlayerList />
        </>
      ) : (
        <JoinChat />
      )}
    </div>
  );
};

export default App;
