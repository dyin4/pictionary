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
    <p className="bar-container-text">Game is in progress now, please wait</p>
  </>
);

export default ProgressBar;

ProgressBar.propTypes = {
  progress: PropTypes.number,
};

ProgressBar.defaultProps = {
  progress: 0,
};
