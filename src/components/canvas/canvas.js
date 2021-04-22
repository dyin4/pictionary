import { useEffect, useState } from "react";
import sketch from "./sketch";
import P5Wrapper from "react-p5-wrapper";
import { useDispatch, useSelector } from "react-redux";
import { clearDraw } from "../../redux/actions";

const Canvas = () => {
  const data = useSelector((state) => state.sketch);
  const dispatch = useDispatch();
  const cleared = useSelector((state) => state.clear);
  const current_player = useSelector((state) => state.current_player);
  const user = useSelector((state) => state.user);
  const [clear, setClear] = useState(false);

  useEffect(() => {
    dispatch(clearDraw(clear));
  }, [clear]);

  useEffect(() => {
    setClear(true);
  }, [current_player]);
  console.log("clear", clear);
  return (
    <>
      <P5Wrapper
        sketch={sketch}
        clear={cleared}
        data={data}
        setClear={setClear}
        disable={user !== current_player}
      ></P5Wrapper>
      {user === current_player && (
        <button className="btn btn-danger" onClick={() => setClear(true)}>
          clear
        </button>
      )}
    </>
  );
};

export default Canvas;
