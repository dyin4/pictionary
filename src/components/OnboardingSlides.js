import { useDispatch } from "react-redux";
import { useState } from "react";
import Slide from "./Slide";
import SlideIndicator from "./SlideIndicator";
import JoinChat from "./join-chat";
import { connectToChat, gameStatus, storeUser } from "../redux/actions";

const TOTAL_SLIDES = 3;

const OnboardingSlides = () => {
  const [activeSlide, setActiveSlide] = useState(1);
  const [onBoardState, setOnBoardState] = useState(false);
  const [userName, setUserName] = useState("");

  const dispatch = useDispatch();

  const setSlideState = (id) => {
    if (id === activeSlide) return "active";
    return "inactive";
  };

  const nextSlide = () => {
    let id = activeSlide;
    id < TOTAL_SLIDES ? setActiveSlide(id + 1) : overBoarding();
  };

  function jcCallback(data) {
    if (data === "over") {
      setOnBoardState(true);
    }
  }

  function nameCallback(name) {
    setUserName(name);
  }

  function overBoarding() {
    dispatch(connectToChat(userName));
    dispatch(storeUser(userName));
  }

  const generateSlideIndicators = () => {
    let indicators = [];
    for (let i = 1; i <= TOTAL_SLIDES; i++) {
      indicators.push(
        <SlideIndicator
          slideStatus={setSlideState(i)}
          key={i}
          slideID={i}
          clickHandler={() => setActiveSlide(i)}
        />
      );
    }
    return indicators;
  };

  return (
    <div>
      {onBoardState ? (
        <>
          <label>
            You have played before?{" "}
            <button className="btn btn-success" onClick={() => overBoarding()}>
              Skip
            </button>
            the tutorial
          </label>

          <div className="slides-bg">
            <Slide slideStatus={setSlideState(1)} slideId={1}>
              <h1>Step 1. Wait other players</h1>
              <p className="slides-text">
                In the chat room, you will wait other players to join in to
                start play
                <br />
                At least 2 players are required to start a game
              </p>
              <div className="fit my-4">
                <img
                  src={process.env.PUBLIC_URL + "/111.gif"}
                  className="img-fluid my-4 float-right fit"
                  alt="The app on iPad and iPhone"
                />
              </div>
            </Slide>
            <Slide slideStatus={setSlideState(2)} slideId={2}>
              <h1>Step 2. Draw picture according to word</h1>
              <p className="slides-text">
                After the game start, host player can see the word given.
                <br />
                That player can start draw picture on canvas.
              </p>
              <div className="fit my-4">
                <img
                  src={process.env.PUBLIC_URL + "/222.gif"}
                  className="img-fluid my-4 float-right fit"
                  alt="The app on iPad and iPhone"
                />
              </div>
            </Slide>
            <Slide slideStatus={setSlideState(3)} slideId={3}>
              <h1>Step 3. Guess it!</h1>
              <p className="slides-text">
                Other players can answer the word they guess in chat box.
                <br />
                If someone answers correctly, the host will be passed to next player. If no answer is correctly, game ends.
              </p>
              <div className="fit my-4">
                <img
                  src={process.env.PUBLIC_URL + "/333.gif"}
                  className="img-fluid my-4 float-right fit"
                  alt="The app on iPad and iPhone"
                />
              </div>
            </Slide>
            <div className="slides-controls">
              <div className="align-center">{generateSlideIndicators()}</div>
              <button className="align-right control-btn" onClick={nextSlide}>
                {activeSlide < TOTAL_SLIDES ? "Next" : "Done"}
              </button>
            </div>
          </div>
        </>
      ) : (
        <>
          <JoinChat callback={jcCallback} name={nameCallback} />
        </>
      )}
    </div>
  );
};

export default OnboardingSlides;
