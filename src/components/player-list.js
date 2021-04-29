import { useSelector } from "react-redux";

const PlayerList = () => {
  const clients = useSelector((state) => state.clients);

  return (
    <>
      <div className="notice">Player list</div>
      <table className="table table-striped table-bordered my-4">
        <tbody>
          {clients.map((message, index) => (
            <tr key={`msg-${index}`}>
              <td>{message}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default PlayerList;
