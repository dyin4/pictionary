import { startGame, sendToChat } from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";

const Messages = () => {
  const messages = useSelector((state) => state.messages);
  const word = useSelector((state) => state.word);
  // const current_player = useSelector((state) => state.current_player);
  // const clients = useSelector((state) => state.clients);
  // const dispatch = useDispatch();
  // const handleRightAnswer = (username) => {
  //   console.log("right", username);
  //   //dispatch(sendToChat(username + "got the right answer"));
  //   let index = clients.indexOf(current_player) + 1;
  //   console.log("index", index);
  //   if (current_player !== null) {
  //     dispatch(startGame(index));
  //   }
  // };

  return (
    <div className="message-box">
      <table className="table table-striped table-bordered my-4">
        <tbody>
          {messages.map((message, index) => {
            console.log(message);
            console.log(message.indexOf("the right answer"));
            let arr = message.split(" ");
            let username = arr[0];
            let answer = arr[2];
            // console.log("answer", answer);
            // console.log("word", word);
            // if (answer === word) {
            //   handleRightAnswer(username);
            // }

            return (
              <tr ke={`msg-${index}`}>
                <td
                  className={`${
                    message.indexOf("the right answer") !== -1
                      ? "table-success"
                      : ""
                  }`}
                >
                  {message}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Messages;
