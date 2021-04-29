import { useSelector } from "react-redux";

const Messages = () => {
  const messages = useSelector((state) => state.messages);
  const word = useSelector((state) => state.word);


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
