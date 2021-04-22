import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  startGame,
  sendToChat,
  endGame,
  sendRightAnswer,
} from "../redux/actions";

const Form = () => {
  const [messageTxt, setMessageTxt] = useState("");

  const dispatch = useDispatch();
  const word = useSelector((state) => state.word);
  const current_player = useSelector((state) => state.current_player);
  const clients = useSelector((state) => state.clients);
  const start = useSelector((state) => state.start);
  const handleRightAnswer = (messageTxt) => {
    console.log("inside");
    dispatch(sendRightAnswer(messageTxt));

    let index = clients.indexOf(current_player) + 1;
    //dispatch(startGame(index));
    if (index === clients.length) {
      dispatch(endGame());
    } else {
      dispatch(startGame(index));
    }
  };

  const onKeyUp = (event) => {
    if (event.keyCode === 13) {
      dispatch(sendToChat(messageTxt));
      if (messageTxt === word && start !== "end") {
        handleRightAnswer(messageTxt);
      }
      clearForm();
    }
  };
  const clearForm = () => {
    setMessageTxt("");
  };
  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div className="row">
        <div className="col">
          <input
            aria-label="Your message"
            type="text"
            className="form-control"
            id="messageTxt"
            placeholder="Enter your message"
            value={messageTxt}
            onChange={(e) => setMessageTxt(e.target.value)}
            onKeyUp={onKeyUp}
          />
        </div>
        <div className="col-auto">
          <button
            type="button"
            className="btn btn-primary float-right"
            onClick={() => {
              dispatch(sendToChat(messageTxt));
              console.log("word", word);
              console.log("messageTxt", messageTxt);
              if (messageTxt.toLowerCase() === word && start !== "end") {
                console.log("messageTxt is word");
                handleRightAnswer(messageTxt);
              }
              clearForm();
            }}
          >
            Send
          </button>
        </div>
      </div>
      <div className="row my-2"></div>
    </form>
  );
};

export default Form;
