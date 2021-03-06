import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProgressBar from "./ProgressBar";
let progressTimer = null;

const JoinChat = (props) => {
  const [username, setUsername] = useState("");
  const [isValid, setIsValid] = useState(null);
  const gameInProgress = useSelector((state) => state.start);
  const [progress, setProgress] = useState(0);

  const showProgress = () => {
    setProgress((prevProgress) => {
      if (prevProgress < 100) return prevProgress + 1;
      else {
        clearInterval(progressTimer);
        return 100;
      } 
    });
  };
  const startProcess = () => {
    setProgress(0);
    progressTimer = setInterval(showProgress, 1000);
  };

  const dispatch = useDispatch();

  const processInput = (event) => {
    if (event.keyCode !== 13) {
      if (event.target.value.length > 0) {
        setUsername(event.target.value);
        setIsValid(true);
      } else {
        setIsValid(false);
        setUsername(event.target.value);
      }
    }
  };

  const verifyUsername = () => {
    if (username.length > 0) {
      setIsValid(true);
      props.name(username)
      props.callback('over')
    } else {
      setIsValid(false);
    }
  };

  const onKeyUp = (event) => {
    if (event.keyCode === 13) verifyUsername();
  };

  useEffect(() => {
    if (gameInProgress === "start") {
      startProcess();
    }
  }, [gameInProgress]);

  console.log("job game status", gameInProgress);

  return (
    <form className="my-4" onSubmit={(e) => e.preventDefault()}>
      <div className="row"  id="joinchat-info">
        <h1>Welcome to Pictionary</h1>
        <h2>Please join to play :D</h2>
        <div className="col">
          <input
            aria-label="Your username"
            type="text"
            className="form-control has-validation"
            id="username-info"
            invalid={`${isValid === false}`}
            valid={`${isValid === true}`}
            placeholder="Username"
            value={username}
            onChange={processInput}
            onKeyUp={onKeyUp}
          />
          <div
            className="invalid-feedback"
            style={
              isValid === false ? { display: "block" } : { display: "none" }
            }
          >
            Username cannot be empty!
          </div>
        </div>
        <div className="col-auto">
          <button
            type="button"
            className="btn btn-primary float-right"
            id="join-button"
            onClick={verifyUsername}
            disabled={gameInProgress === "start"}
          >
            Join Chat
          </button>
        </div>
      </div>
      {gameInProgress === "start" && <ProgressBar progress={progress} />}
    </form>
  );
};

export default JoinChat;
