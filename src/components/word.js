import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { words } from "../data/words";
import { setWord } from "../redux/actions";
const Word = () => {
  const current_player = useSelector((state) => state.current_player);
  const clients = useSelector((state) => state.clients);
  const user = useSelector((state) => state.user);
  const start = useSelector((state) => state.start);
  const [word, setCurrentWord] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    console.log("current player", current_player);
    if (current_player !== null) {
      let index = clients.indexOf(current_player);
      console.log("index", index);
      let current_word = words[index];
      console.log("current_word", current_word);
      dispatch(setWord(current_word));
      setCurrentWord(current_word);
    }
  }, [dispatch, current_player]);

  return (
    <>
      {current_player === user && start !== "end" && (
        <h1>Current word: {word}</h1>
      )}
    </>
  );
};

export default Word;
