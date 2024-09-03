import "./Icons.css";
import PropTypes from "prop-types";

const Icons = ({ id, width = 24, height = 24, className = "" }) => {
  return (
    <svg
      className={`${className}`}
      width={width}
      height={height}
      aria-hidden="true"
    >
      <use href={`/src/images/icons.svg#icon-${id}`} />
    </svg>
  );
};

Icons.propTypes = {
  id: PropTypes.string.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  className: PropTypes.string,
};

export default Icons;
