import { io } from "socket.io-client";

const Sketch = (p5) => {
  let data = {};
  let socket;
  let setClear;
  let disable;

  p5.myCustomRedrawAccordingToNewPropsHandler = (props) => {
    console.log("prop", props);
    if (props.clear) {
      p5.clear();
      p5.background(250);
      socket.emit("DRAWING", {});
    }

    if (props.data) {
      data = props.data;
      console.log("data", data);
    }

    setClear = props.setClear;
    disable = props.disable;
  };

  p5.setup = () => {
    socket = io.connect("reactpictionary.herokuapp.com" || "localhost:4002");
    p5.createCanvas(500,500);
    p5.background(250);
    socket.on("DRAWING", (data) => {
      p5.strokeWeight(10);
      p5.line(data.mouseX, data.mouseY, data.pmouseX, data.pmouseY);
    });
  };

  p5.draw = () => {
    p5.line(data.mouseX, data.mouseY, data.pmouseX, data.pmouseY);
  };

  p5.mouseDragged = () => {
    if (!disable) {
      p5.strokeWeight(10);

      p5.line(p5.mouseX, p5.mouseY, p5.pmouseX, p5.pmouseY);

      setClear(false);

      socket.emit("DRAWING", {
        mouseX: p5.mouseX,
        mouseY: p5.mouseY,
        pmouseX: p5.pmouseX,
        pmouseY: p5.pmouseY,
      });
    }
  };
};

export default Sketch;
