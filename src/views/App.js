import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import OnboardingSlides from "../components/OnboardingSlides";
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
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (start == "start") {
      setClick(false);
    }
  }, [start, dispatch]);
  console.log("connected", isConnected);
  console.log("start", start);
  console.log("current user", current_player);
  return (
    <div className="p-app">
      {isConnected ? (
        <>
          <header className="p-header">
            <div className="siteheader">CS7580 Final Porject - Pictionary</div>
          </header>

          {clients.length < PLAYER_NUM && (
            <div className="p-waiting">
              <Spinner />
              <div className="notice">
                Hi {user}, please wait for other players to join
              </div>
            </div>
          )}
          {clickStart && (
            <div className="p-waiting">
              <Spinner />
              <div className="notice">
                Hi {user}, please wait for other players to click start
              </div>
            </div>
          )}

          <div className="p-board">
            <div className="p-sidebar">
              <div className="p-start">
                {clients.length >= PLAYER_NUM && start !== "start" && (
                  <button
                    className="btn btn-primary float-right button-green"
                    onClick={() => {
                      setClick(true);
                      dispatch(startGame(0));
                    }}
                  >
                    START DRAWING!
                  </button>
                )}
              </div>

              <div className="p-status">
                <GameStatus />
                <Timer />
              </div>

              <div className="p-status">
                <Word />
              </div>
            </div>

            <div className="p-canvas">
              <Canvas />
            </div>

            <div className="p-chatbar">
              <div className="chat">
                <div className="notice">Chat Room</div>
                <Messages className="chat__buffer" />
                <Form className="chatbox" />
              </div>
              <div className="userlist">
                <PlayerList />
              </div>
            </div>
          </div>
        </>
      ) : (
        <OnboardingSlides />
      )}
    </div>
  );
};

export default App;
