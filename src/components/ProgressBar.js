import PropTypes from "prop-types";

const ProgressBar = (props) => (
  <>
    <div className="bar-container">
      <div
        className="bar-background"
        style={{
          width: props.progress + "%",
          transition: "width 1s linear",
        }}
      ></div>
    </div>
    <p className="bar-container-text">
      A game is in progress now, please wait to join next game
    </p>
  </>
);

export default ProgressBar;

ProgressBar.propTypes = {
  progress: PropTypes.number,
};

ProgressBar.defaultProps = {
  progress: 0,
};
