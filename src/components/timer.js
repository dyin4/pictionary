import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startTimer } from "../redux/actions";

const TIMER = 30;

const Timer = () => {
  const time = useSelector((state) => state.time);
  const start = useSelector((state) => state.start);
  const current_player = useSelector((state) => state.current_player);
  const dispatch = useDispatch();
  useEffect(() => {
    if (current_player !== null) dispatch(startTimer(TIMER));
  }, [dispatch, current_player]);

  return (
    <>
      <h1>Timer</h1>
      {start !== "end" && <p>{time}</p>}
    </>
  );
};

export default Timer;
