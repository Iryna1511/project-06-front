import "./Icons.css";
import icons from "../../images/icons.svg";

const Icons = ({ id, width, height, className = "" }) => {
  return (
    <svg
      className={`${className}`}
      width={width}
      height={height}
      aria-hidden="true"
    >
      <use href={`${icons}#icon-${id}`}></use>
    </svg>
  );
};

export default Icons;
